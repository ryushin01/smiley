"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Size } from "@components/Constants";
import { Alert, Button, Typography } from "@components";
import { useCheckBox, useDisclosure, useFetchApi } from "@hooks";
import { usePayInfoData } from "@libs";
import { caseDetailAtom, routerAtom } from "@stores";
import { phoneInquiry } from "@utils/flutterUtil";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import CurrencyFormat from "react-currency-format";

/**
 * 매도인 전문 요청 API 호출 필요!
 */

export default function MY_PR_002M() {
  const router = useRouter();
  // const { kndCd, loanNo, resLndAmtPay } = useAtomValue(caseDetailAtom);
  const { loanNo, rgstrGbCd, progGbInfo, kndCd, resLndAmtPay } =
    useAtomValue(caseDetailAtom);
  const [isCheck, check] = useCheckBox();
  const { seller, buyer, repayList } = usePayInfoData({ loanNo });
  const { isOpen: isOpen, open: open } = useDisclosure();
  const { isOpen: isOpenErr, open: openErr, close: closeErr } = useDisclosure();
  const pageRouter = useAtomValue(routerAtom);
  const [isError, setIsError] = useState(false);
  const [authNum, setAuthNum] = useState("123");
  const [payTp, setpayTp] = useState("");
  const { refetch } = usePayInfoData({ loanNo });

  useEffect(() => {
    console.log(`kndCd after fetching data >> ${kndCd}`);
  }, [kndCd]);

  useEffect(() => {
    // Update the payTp state based on progGbInfo.nextProgNm
    if (
      progGbInfo.currProgNm === "2.상환말소" ||
      progGbInfo.currProgNm === "1.상환말소"
    ) {
      setpayTp("N");
    } else {
      setpayTp("Y");
    }
  }, [progGbInfo.currProgNm]);

  const handleLoanRequestClick = () => {
    if (isSellerExist) {
      if (isEmptySellerAndBuyerPayAmt) {
        // 대출금이 없을 때 인증 절차 없이 진행
        skipCheck();
      } else {
        open();
      }
    } else if (isBuyerExist) {
      // 자담/전세일 때 인증 절차 진행
      checkSkip();
    } else {
      // 기본 동작, 다른 조건에 해당하지 않으면 modal 오픈
      open();
    }
  };

  const { fetchApi } = useFetchApi();
  const { mutate } = useMutation({
    mutationKey: ["send-sms-auth"],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/owshcnfmpprog/${loanNo}`,
        method: "post",
      }).then((res) => res.json()),
    onSuccess: (res) => {
      if (res.code === "00") router.push("/my-case/loan-cert/confirm");
    },
  });

  // 자담/전세일때 대출금이 있을때 인증절차 skip
  const { mutate: checkSkip } = useMutation({
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
        requestAllPayment();
        // router.push(`/my-case/pay-request/loan-info`);
        // router.push(`/my-case/cntr/${loanNo}?regType=${regType}`);
      } else {
        setIsError(true);
      }
    },
  });

  const {
    mutate: requestAllPayment,
    data,
    isPending,
  } = useMutation({
    mutationKey: ["request-all-payment", loanNo],
    mutationFn: () =>
      fetchApi({
        url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/SlrDbtrPayReq?loanNo=${loanNo}`,
        method: "post",
      }).then((res) => res.json()),
    gcTime: Infinity,
    onSuccess: (res) => {
      refetch();

      if (res.code === "00") {
        router.push(`/my-case/pay-request/loan-info`);
      } else {
        openErr();
      }
      refetch();
    },
    onError: (error) => {
      console.log("error", error);
      openErr();
    },
  });
  // const { mutate: checkSmsAuthNum } = useMutation({
  //     mutationKey: ["check-sms-auth"],
  //   mutationFn: () =>
  //     fetchApi({
  //       url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/owshcnfmcmpl/${loanNo}/${authNum}`,
  //       method: "post",
  //     }).then((res) => res.json()),
  //   onSuccess: (res) => {
  //     console.log(res);
  //     if (res.code === "00") {
  //       router.push(`/my-case/pay-request/loan-info`);
  //       // router.push(`/my-case/cntr/${loanNo}?regType=${regType}`);
  //     } else {
  //       setIsError(true);
  //     }
  //   },
  // });

  // 전세일때 대출금이 없을때 인증절차 skip
  const { mutate: skipCheck } = useMutation({
    mutationKey: ["check-sms-auth"],
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
      console.log(res);
      if (res.code === "00") {
        router.push(`/my-case/rpycncl`);
        refetch();
        // router.push(`/my-case/cntr/${loanNo}?regType=${regType}`);
      } else {
        setIsError(true);
      }
    },
  });

  const isEmptySellerAndBuyerPayAmt =
    seller?.payAmt === 0 && buyer?.payAmt === 0;
  // const isSellerExist = kndCd === "1" ||  kndCd === "6";
  const isSellerExist = kndCd === "1" || kndCd === "2" || kndCd === "6";
  const isBuyerExist =
    kndCd === "1" || kndCd === "3" || kndCd === "4" || kndCd === "5";

  return (
    <div className="flex flex-col justify-between grow w-full h-full">
      <div>
        <Typography
          type={Typography.TypographyType.H1}
          color="text-kos-gray-800"
          className="pb-3"
        >
          지급정보 확인 후<br />
          대출금을 요청해주세요
        </Typography>

        {/* TODO: SR */}
        {/*<Typography*/}
        {/*  type={Typography.TypographyType.H1}*/}
        {/*  color="text-kos-gray-800"*/}
        {/*  className="pb-3"*/}
        {/*>*/}
        {/*  대출금 요청을 위해 해당하는*/}
        {/*  <br />*/}
        {/*  서류를 제출해 주세요.*/}
        {/*</Typography>*/}

        {isEmptySellerAndBuyerPayAmt && (
          <Typography
            type={Typography.TypographyType.B1}
            color="text-kos-gray-700"
            className="mt-4"
          >
            다음버튼을 누른 이후에는 지급 정보 수정이 불가하오니 이점 반드시
            숙지하여 주시기 바랍니다.
          </Typography>
        )}
        <section className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <Typography
              type={Typography.TypographyType.H3}
              color="text-kos-gray-800"
            >
              지급정보
            </Typography>
            {!resLndAmtPay.resData && (
              <Button.TextButton
                size={Size.Medium}
                state={true}
                onClick={() =>
                  router.push("/my-case/pay-info?previousState=true")
                }
              >
                수정
              </Button.TextButton>
            )}
          </div>
          <ul className="rounded-2xl bg-kos-gray-100 p-5 flex flex-col gap-y-2">
            {/* TODO: SR */}
            {/*<li className="flex items-center justify-between">*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-600"*/}
            {/*  >*/}
            {/*    조건부 취급*/}
            {/*  </Typography>*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-800"*/}
            {/*  >*/}
            {/*    소유권 이전&후순위 설정*/}
            {/*  </Typography>*/}
            {/*</li>*/}

            {/*/!* TODO: 소유권 이전 *!/*/}
            {/*<li className="flex items-center justify-between">*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-600"*/}
            {/*  >*/}
            {/*    매도인*/}
            {/*  </Typography>*/}

            {/*  /!* TODO: 중도금 *!/*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-600"*/}
            {/*  >*/}
            {/*    매도인(담보제공자)*/}
            {/*  </Typography>*/}

            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-800"*/}
            {/*  >*/}
            {/*    류창선*/}
            {/*  </Typography>*/}

            {/*  /!* TODO: 소유권 이전(공동매도인) *!/*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-800"*/}
            {/*  >*/}
            {/*    류창선/유창선*/}
            {/*  </Typography>*/}
            {/*</li>*/}

            {/*<li className="flex items-center justify-between">*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-600"*/}
            {/*  >*/}
            {/*    매도인 생년월일*/}
            {/*  </Typography>*/}

            {/*  /!* TODO: 중도금 *!/*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-600"*/}
            {/*  >*/}
            {/*    매도인(담보제공자) 생년월일*/}
            {/*  </Typography>*/}

            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-800"*/}
            {/*  >*/}
            {/*    870819*/}
            {/*  </Typography>*/}

            {/*  /!* TODO: 소유권 이전(공동매도인) *!/*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-800"*/}
            {/*  >*/}
            {/*    870819/870819*/}
            {/*  </Typography>*/}
            {/*</li>*/}

            {/*/!* TODO: 신탁등기 말소 *!/*/}
            {/*<li className="flex items-center justify-between">*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-600"*/}
            {/*  >*/}
            {/*    수탁자명(신탁사)*/}
            {/*  </Typography>*/}

            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-800"*/}
            {/*  >*/}
            {/*    OO신탁주식회사*/}
            {/*  </Typography>*/}
            {/*</li>*/}
            {/*<li className="flex items-center justify-between">*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-600"*/}
            {/*  >*/}
            {/*    위탁자명(부동산소유자)*/}
            {/*  </Typography>*/}

            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-800"*/}
            {/*  >*/}
            {/*    류창선*/}
            {/*  </Typography>*/}
            {/*</li>*/}
            {/*<li className="flex items-center justify-between">*/}
            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-600"*/}
            {/*  >*/}
            {/*    우선수익자*/}
            {/*  </Typography>*/}

            {/*  <Typography*/}
            {/*    type={Typography.TypographyType.B2}*/}
            {/*    color="text-kos-gray-800"*/}
            {/*  >*/}
            {/*    주식회사 우리은행*/}
            {/*  </Typography>*/}
            {/*</li>*/}

            {isSellerExist && (
              <li className="flex items-center justify-between">
                <Typography
                  type={Typography.TypographyType.B2}
                  color="text-kos-gray-600"
                >
                  {kndCd === "1" && "매도인"}
                  {kndCd === "2" && "임대인"}
                  {kndCd === "6" && "신탁사"}
                </Typography>
                <Typography
                  type={Typography.TypographyType.B2}
                  color="text-kos-gray-800"
                >
                  <CurrencyFormat
                    value={seller?.payAmt ?? 0}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  원
                </Typography>
              </li>
            )}

            {isBuyerExist && (
              <li className="flex items-center justify-between">
                <Typography
                  type={Typography.TypographyType.B2}
                  color="text-kos-gray-600"
                >
                  차주
                </Typography>
                <Typography
                  type={Typography.TypographyType.B2}
                  color="text-kos-gray-800"
                >
                  <CurrencyFormat
                    value={buyer?.payAmt ?? 0}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  원
                </Typography>
              </li>
            )}
            {isEmptySellerAndBuyerPayAmt && (
              <div className="flex items-start justify-between">
                <Typography
                  type={Typography.TypographyType.B2}
                  color="text-kos-gray-600"
                >
                  상환금
                </Typography>
                <div className="flex flex-col items-end gap-y-1">
                  {repayList.map((el: any) => (
                    <div key={el.bankCd} className="flex gap-1">
                      <Typography
                        type={Typography.TypographyType.B1}
                        color="text-kos-gray-800"
                      >
                        {el.bankNm}&nbsp;
                        <CurrencyFormat
                          value={el.payAmt ?? 0}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        원
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ul>
        </section>

        {/* TODO: SR */}
        {/*<section className="mt-6">*/}
        {/*  <div className="flex justify-between items-center mb-3">*/}
        {/*    <Typography*/}
        {/*      type={Typography.TypographyType.H3}*/}
        {/*      color="text-kos-gray-800"*/}
        {/*    >*/}
        {/*      제출서류*/}
        {/*    </Typography>*/}
        {/*  </div>*/}
        {/*  <ul className="flex flex-col gap-y-2">*/}
        {/*    <li className="p-5 rounded-2xl bg-kos-gray-100">*/}
        {/*      <div className="flex items-center justify-between">*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-600"*/}
        {/*        >*/}
        {/*          일반 매매*/}
        {/*        </Typography>*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-800"*/}
        {/*        >*/}
        {/*          매도인 개인 혹은 법인 인감증명서*/}
        {/*        </Typography>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="p-5 rounded-2xl bg-kos-gray-100">*/}
        {/*      <div className="flex items-center justify-between">*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-600"*/}
        {/*        >*/}
        {/*          분양*/}
        {/*        </Typography>*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-800"*/}
        {/*        >*/}
        {/*          분양계약서 혹은 공급계약서*/}
        {/*        </Typography>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="p-5 rounded-2xl bg-kos-gray-100">*/}
        {/*      <div className="flex items-center justify-between">*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-600"*/}
        {/*        >*/}
        {/*          경매*/}
        {/*        </Typography>*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-800"*/}
        {/*        >*/}
        {/*          매각허가결정문/등기부등본*/}
        {/*        </Typography>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="p-5 rounded-2xl bg-kos-gray-100">*/}
        {/*      <div className="flex items-center justify-between">*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-600"*/}
        {/*        >*/}
        {/*          신탁등기*/}
        {/*        </Typography>*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-800"*/}
        {/*        >*/}
        {/*          위임장(신탁등기변경)*/}
        {/*        </Typography>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="p-5 rounded-2xl bg-kos-gray-100">*/}
        {/*      <div className="flex items-center justify-between">*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-600"*/}
        {/*        >*/}
        {/*          임차권 명령 및 가압류 말소*/}
        {/*        </Typography>*/}
        {/*        <Typography*/}
        {/*          type={Typography.TypographyType.B2}*/}
        {/*          color="text-kos-gray-800"*/}
        {/*        >*/}
        {/*          가압류집행 해제신청서*/}
        {/*        </Typography>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</section>*/}

        <Alert
          isOpen={isOpenErr}
          title={"지급 실패건이 있습니다"}
          confirmText={"문의하기"}
          confirmCallBack={() => phoneInquiry()}
          cancelText={"닫기"}
          cancelCallBack={closeErr}
          bodyText={
            data?.msg ??
            "대출금을 다시 요청하기 위해 고객센터(1877-2945)로 문의해주세요."
          }
        />
        <Alert
          isOpen={isOpen}
          title={"안전한 대출금 지급을 위해\n인증 절차를 진행합니다."}
          confirmText={"확인"}
          confirmCallBack={() => mutate()}
          bodyText={"차주에게 승인번호가 알림톡으로 전송됩니다."}
        />
      </div>
      <footer className="flex flex-col gap-y-6 mt-6">
        {isEmptySellerAndBuyerPayAmt && (
          <Button.Checkbox
            size="Big"
            id="check"
            label="위 내용을 확인했습니다."
            onChange={check}
            fontSize="H3"
          />
        )}
        {isEmptySellerAndBuyerPayAmt ? (
          <Button.CtaButton
            size={Size.XLarge}
            state="On"
            disabled={!isCheck}
            onClick={handleLoanRequestClick}
            // onClick={() => router.back()}
          >
            다음
          </Button.CtaButton>
        ) : (
          <Button.CtaButton
            size={Size.XLarge}
            state="On"
            onClick={handleLoanRequestClick}
            // onClick={() => router.push("/my-case/pay-request/loan-info")}
          >
            대출금 요청하기
          </Button.CtaButton>
        )}
      </footer>
    </div>
  );
}
