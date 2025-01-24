import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DownArrow } from "@icons";
import { RGSTR_GB_CD } from "@constants";
import { Typography } from "@components";
import { useFetchApi } from "@hooks";
import { usePayInfoData } from "@libs";
import { caseDetailAtom, toastState } from "@stores";
import { getCompareWithToday } from "@utils/dateUtil";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import ActivateHeader from "@app/my-case/cntr/[loanNo]/ActivateHeader";

interface IProps {
  currProgGbNm?: string | null;
  resRgstrRegd?: TCaseDetailResData;
  resPayRegd?: TCaseDetailResData;
  resEstmCnfm?: TCaseDetailResData;
  resEstmRegd?: TCaseDetailResData;
  resLndAmtPay?: TCaseDetailResData;
  currProgDesc?: string | null;
  statCd?: string;
  execDt?: string;
  rgstrGbCd?: string | null;
  loanNo?: string;
}

type TDDayProps = Omit<IProps, "isDDay">;

/** product 단계에서는 onClick props 필요 X */
const NotDDay = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    className="bg-kos-white relative rounded-[20px] px-5 py-4 w-full"
    onClick={onClick}
  >
    <Typography type={Typography.TypographyType.H5} color="text-kos-gray-800">
      사건 진행
    </Typography>
    <p className="text-kos-brown-100 text-xs font-semibold">
      사건 진행은 대출 실행 후 활성화됩니다.
    </p>
  </button>
);

const DDay = ({ currProgGbNm, currProgDesc, ...props }: TDDayProps) => {
  const { loanNo, rgstrGbCd, progGbInfo, kndCd, resLndAmtPay } =
    useAtomValue(caseDetailAtom);
  const callToast = useSetAtom(toastState);

  const body = () => {
    return currProgGbNm;
  };

  const bodyDesc = function () {
    return currProgDesc;
  };

  // ------------------------------------------------------------ //
  const [payTp, setpayTp] = useState("");

  const router = useRouter();
  const [authNum, setAuthNum] = useState("123");
  const [href, setHref] = useState("");
  const { seller, buyer, repayList } = usePayInfoData({ loanNo });

  const payStatList = repayList?.[0];
  const payStatCd = payStatList?.statCd;
  const sellerStatCd = seller?.statCd;
  const buyerStatCd = buyer?.statCd;

  const isPayAll = sellerStatCd === "02" && buyerStatCd === "02";
  console.log("대출금 지급여부 >>", isPayAll);

  const { fetchApi } = useFetchApi();
  const { data, mutate: checkSkip } = useMutation({
    mutationKey: ["board-list"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/owshcnfmcmpl`,
        method: "post",
        body: {
          loanNo: loanNo,
          authNum: authNum,
          payTp: payTp,
          kndCd: kndCd, // 1:매매,2:설정,3.말소
        },
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log("res", res);
      if (res.code === "00") {
        router.push(`/my-case/rpycncl`);
      } else {
        callToast({
          msg: "다시 시도해주세요.",
          status: "error",
        });
        return;
      }
    },
  });

  useEffect(() => {
    // Update the payTp state based on progGbInfo.nextProgNm
    if (progGbInfo.currProgCd === "05") {
      //상환말소
      setpayTp("N");
    } else {
      setpayTp("Y");
    }
  }, [progGbInfo.currProgNm]);

  const statCd = props?.statCd ?? "";

  const hrefExtractor = () => {
    console.log("progGbInfo", progGbInfo);
    // 대출 실행이 안된 경우
    if (progGbInfo?.currProgCd === "02") return "";

    // 견적서 확정이 안된 경우 - 견적서 확정으로 이동
    if (progGbInfo.currProgCd === "01") {
      return `/my-case/estm/info?loanNo=${loanNo}&isDDay=true`;
    }

    // 대출 실행 됐는데 상환금만 존재하는경우 (checkSkip api호출 후 페이지 이동!)
    if (
      statCd === "10" &&
      progGbInfo.currProgCd === "05" &&
      (rgstrGbCd === RGSTR_GB_CD["02"] || rgstrGbCd === RGSTR_GB_CD["03"])
    ) {
      return "";
    }

    // 이전인데 상환금만 존재하는경우 인증 skip API 호출
    if (
      rgstrGbCd === RGSTR_GB_CD["01"] &&
      progGbInfo.currProgCd === "05" &&
      props.resEstmCnfm?.resData &&
      props.resPayRegd?.resData &&
      props.resRgstrRegd?.resData
    ) {
      return "";
    }

    // 자담, 상환금이 있을때 && 지급정보가 완료일때
    if (
      (statCd === "12" || statCd === "13" || statCd === "14") &&
      progGbInfo.nextProgCd === "05" &&
      rgstrGbCd === RGSTR_GB_CD["02"] &&
      isPayAll
    ) {
      return "/my-case/rpycncl";
    }
    // 자담, 상환금이 있을때 && 지급정보가 완료가 아닐때
    if (
      (statCd === "12" || statCd === "13" || statCd === "14") &&
      progGbInfo.nextProgCd === "05" &&
      rgstrGbCd === RGSTR_GB_CD["02"]
    ) {
      return "/my-case/pay-request/loan-info";
    }

    // 자담,전세 상환금이 없을때 && 지급정보가 완료일때
    if (
      (statCd === "12" || statCd === "13" || statCd === "14") &&
      progGbInfo.nextProgCd != "05" &&
      rgstrGbCd === RGSTR_GB_CD["02"] &&
      rgstrGbCd === RGSTR_GB_CD["03"] &&
      isPayAll
    ) {
      return "/my-case/trreg";
    }
    // 자담,전세 상환금이 없을때 && 지급정보가 완료가 아닐때
    if (
      (statCd === "12" || statCd === "13" || statCd === "14") &&
      progGbInfo.nextProgCd != "05" &&
      rgstrGbCd === RGSTR_GB_CD["02"] &&
      rgstrGbCd === RGSTR_GB_CD["03"]
    ) {
      return "/my-case/pay-request/loan-info";
    }

    // 대출금 처리
    if (statCd === "10" || statCd === "11")
      return "/my-case/pay-request/loan-pay";
    //인증확인 완료 후
    if (statCd === "12" || statCd === "13")
      return "/my-case/pay-request/loan-info";
    // 상환금 처리
    if (statCd === "14") return "/my-case/rpycncl";
    // 접수번호 등록
    if (statCd === "20" || statCd === "30") return "/my-case/trreg";
    // 설정서류
    if ((statCd === "40" || statCd === "50") && rgstrGbCd !== RGSTR_GB_CD["01"])
      return "/my-case/image";

    return "";
  };

  const caseProgress = () => {
    // 대출실행 대기중
    if (progGbInfo?.currProgCd === "02") {
      callToast({
        msg: "아직 대출이 실행되지 않았습니다.",
        status: "notice",
      });
      return;
    }

    // 이전인데 대출금이 없는경우 인증 skip API 호출
    if (
      rgstrGbCd === RGSTR_GB_CD["01"] &&
      progGbInfo.currProgCd === "05" &&
      props.resEstmCnfm?.resData &&
      props.resPayRegd?.resData &&
      props.resRgstrRegd?.resData
    ) {
      checkSkip();
    }

    // 설정.말소인데 대출금이 없는경우 인증 skip API 호출
    if (
      statCd === "10" &&
      progGbInfo.currProgCd === "05" &&
      (rgstrGbCd === RGSTR_GB_CD["02"] || rgstrGbCd === RGSTR_GB_CD["03"])
    ) {
      checkSkip();
    }
  };

  const moveToRouter = () => {
    router.push(href!);
  };

  useEffect(() => {
    const hrefExtractorValue = hrefExtractor();
    setHref(hrefExtractorValue);
  }, [progGbInfo]);

  return (
    progGbInfo?.currProgCd !== "99" && ( //사건 종결일 경우 hidden
      <div className="bg-kos-white relative rounded-t-lg rounded-b-[20px]">
        <ActivateHeader>사건 진행</ActivateHeader>
        <button
          type="button"
          className="w-full text-left"
          onClick={!!href ? moveToRouter : caseProgress}
        >
          <div className="pt-15 pb-5 px-5 relative ">
            <div className="flex justify-between mb-2">
              <p className="text-lg font-bold text-kos-gray-800">{body()}</p>
              {
                /*대출실행 대기중일 경우 > 이미지 히든 */
                !(
                  progGbInfo?.currProgCd === "00" ||
                  progGbInfo?.currProgCd === "02"
                ) && (
                  <Image
                    src={DownArrow}
                    alt="링크 화살표 아이콘"
                    className="-rotate-90"
                  />
                )
              }
            </div>
            <Typography
              type={Typography.TypographyType.H5}
              color="text-kos-gray-600"
            >
              {bodyDesc()}
            </Typography>
          </div>
        </button>
      </div>
    )
  );
};

export default function CurrentStep({
  currProgGbNm,
  currProgDesc,
  ...props
}: IProps) {
  /** test 시 사용 */
  const router = useRouter();
  const callToast = useSetAtom(toastState);

  //이전등기 정보등록 여부
  const isBfInfoRegd =
    props.rgstrGbCd === RGSTR_GB_CD["01"] &&
    props.resEstmRegd?.resData &&
    props.resPayRegd?.resData &&
    props.resRgstrRegd?.resData;

  //설정 또는 말소 정보등록 여부
  const isInfoRegd =
    (props.rgstrGbCd === RGSTR_GB_CD["02"] ||
      props.rgstrGbCd === RGSTR_GB_CD["03"]) &&
    props.resPayRegd?.resData;

  return (
    <>
      {
        //todo : 설정은 6200 설정등기 확인결과서 발송된 후 강제 미노출 - 관리자 개발 완료후 수정 필요!!
        //1. 이전/말소는 실행일 D+1 이후 강제 미노출
        (props.rgstrGbCd === RGSTR_GB_CD["01"] ||
          props.rgstrGbCd === RGSTR_GB_CD["03"]) &&
        getCompareWithToday(props.execDt) ===
          "past" ? null : getCompareWithToday(props.execDt) !== "future" && //2. 실행일 부터 지급정보 완료 시 노출
          (isBfInfoRegd || isInfoRegd) ? (
          <DDay
            currProgGbNm={currProgGbNm}
            currProgDesc={currProgDesc}
            {...props}
          />
        ) : (
          //3. ~ 실행일 이전 또는 지급정보 미등록 시
          <NotDDay
            onClick={() => {
              if (!isBfInfoRegd && !isInfoRegd) {
                callToast({
                  msg: "정보등록을 먼저 진행해주세요.",
                  status: "notice",
                });
                return;
              }
            }}
          />
        )
      }
    </>
  );
}
