"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow, Telephone } from "@icons";
import { TStringKeyObj } from "@app/global";
import { RGSTR_GB_CD } from "@constants";
import { Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import CurrencyFormat from "react-currency-format";

type TProps = {
  isOpenAccordion: boolean;
  detailInfo?: TDetailInfo;
  toggleAccordion: () => void;
};

const keyKorean: TStringKeyObj = {
  dbtrNm: "차주",
  loanNo: "여신번호",
  lndThngAddr: "주소",
};

export default function CaseDetailAccordion({
  detailInfo,
  toggleAccordion,
  isOpenAccordion,
}: TProps) {
  const ref = useRef<HTMLUListElement>(null);
  // const [clientHeight, setClientHeight] = useState(0);

  // const execTodayDateDifference = Math.ceil(
  //   (stringToDate(detailInfo?.execDt ?? "").getTime() - new Date().getTime()) /
  //     (1000 * 60 * 60 * 24)
  // );

  // useEffect(() => {
  //   setClientHeight(ref.current?.offsetHeight ?? 0);
  // }, [detailInfo]);

  //차주 전화연결
  const phoneClick = () => {
    //@ts-ignore
    window.flutter_inappwebview.callHandler("flutterFunc", {
      // @ts-ignore
      mode: "PHONE_CALL",
      data: {
        phoneNo: detailInfo?.dbtrHpno,
      },
    });
  };

  //대출기관 전화연결
  const phoneClick2 = () => {
    //@ts-ignore
    window.flutter_inappwebview.callHandler("flutterFunc", {
      // @ts-ignore
      mode: "PHONE_CALL",
      data: {
        phoneNo: detailInfo?.bnkBrnchPhno,
      },
    });
  };

  //전자등기사무소 전화연결
  const phoneClick3 = () => {
    //@ts-ignore
    window.flutter_inappwebview.callHandler("flutterFunc", {
      // @ts-ignore
      mode: "PHONE_CALL",
      data: {
        phoneNo: detailInfo?.elregOfficeTelNo,
      },
    });
  };

  return (
    <div className="w-full">
      <div className={`bg-kos-white relative h-fit content-box`}>
        <ul ref={ref} className="pt-4 h-fit">
          {detailInfo &&
            Object.entries(detailInfo).map(
              ([key, value]) =>
                keyKorean[key] && (
                  <li
                    key={`${key}`}
                    className={`flex justify-between items-start transition-all ease-in-out py-1 px-4 `}
                  >
                    <Typography
                      color={"text-kos-gray-600"}
                      type={TypographyType.B2}
                    >
                      {keyKorean[key]}
                    </Typography>
                    <div className="basis-2/3 flex justify-end text-end items-center gap-2">
                      <Typography
                        color={"text-kos-gray-800"}
                        type={TypographyType.B1}
                        className="break-keep"
                      >
                        {(typeof value === "string" ||
                          typeof value === "number") &&
                          value}
                      </Typography>
                      {key === "dbtrNm" && (
                        <button type="button" onClick={phoneClick}>
                          <Image src={Telephone} alt="전화 아이콘" />
                        </button>
                      )}
                    </div>
                  </li>
                )
            )}
        </ul>
        <div
          className="absolute w-full"
          // style={{
          //   top: clientHeight - 1
          // }}
        >
          {!!detailInfo && isOpenAccordion && (
            <>
              <ul className="bg-kos-white w-full pt-px pb-5">
                <li
                  className={`flex justify-between items-start transition-all ease-in-out py-1 px-4`}
                >
                  <Typography
                    color={"text-kos-gray-600"}
                    type={TypographyType.B2}
                  >
                    실행일
                  </Typography>
                  <div className="basis-2/3 flex justify-end items-center gap-2">
                    <Typography
                      color={"text-kos-gray-800"}
                      type={TypographyType.B1}
                    >
                      {`${detailInfo["execDt"].slice(0, 4)}. ${detailInfo[
                        "execDt"
                      ].slice(4, 6)}. ${detailInfo["execDt"].slice(6, 8)}`}
                    </Typography>
                  </div>
                </li>
                <li
                  className={`flex justify-between items-start transition-all ease-in-out py-1 px-4`}
                >
                  <Typography
                    color={"text-kos-gray-600"}
                    type={TypographyType.B2}
                  >
                    실행금액
                  </Typography>
                  <div className="basis-2/3 flex justify-end items-center gap-2">
                    <Typography
                      color={"text-kos-gray-800"}
                      type={TypographyType.B1}
                    >
                      <CurrencyFormat
                        decimalSeparator={"false"}
                        value={detailInfo.execAmt}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </Typography>
                  </div>
                </li>
                <li
                  className={`flex justify-between items-start transition-all ease-in-out py-1 px-4`}
                >
                  <Typography
                    color={"text-kos-gray-600"}
                    type={TypographyType.B2}
                  >
                    대출기관
                  </Typography>
                  <div className="basis-2/3 flex justify-end items-center gap-2">
                    <Typography
                      color={"text-kos-gray-800"}
                      type={TypographyType.B1}
                    >
                      {detailInfo.bnkBranchNm}
                    </Typography>
                    {!!detailInfo.bnkBrnchPhno && (
                      <button onClick={phoneClick2}>
                        <Image src={Telephone} alt="전화 아이콘" />
                      </button>
                    )}
                  </div>
                </li>
                {detailInfo.orgBrnchNm && (
                  <li
                    className={`flex justify-between items-start transition-all ease-in-out py-1 px-4`}
                  >
                    <Typography
                      color={"text-kos-gray-600"}
                      type={TypographyType.B2}
                    >
                      대출관리점
                    </Typography>
                    <div className="basis-2/3 flex justify-end items-center gap-2 text-right">
                      <Typography
                        color={"text-kos-gray-800"}
                        type={TypographyType.B1}
                      >
                        {detailInfo.orgBrnchNm}
                      </Typography>
                    </div>
                  </li>
                )}
                <li
                  className={`flex justify-between items-start transition-all ease-in-out py-1 px-4`}
                >
                  <Typography
                    color={"text-kos-gray-600"}
                    type={TypographyType.B2}
                  >
                    대출상품
                  </Typography>
                  <div className="basis-2/3 flex justify-end items-center gap-2 text-right">
                    <Typography
                      color={"text-kos-gray-800"}
                      type={TypographyType.B1}
                      className="ios-break-word"
                    >
                      {detailInfo.lndPrdtNm}
                    </Typography>
                  </div>
                </li>
                {detailInfo?.rgstrGbCd === RGSTR_GB_CD["01"] && ( //이전등기
                  <>
                    <li
                      className={`flex justify-between items-start transition-all ease-in-out py-1 px-4`}
                    >
                      <Typography
                        color={"text-kos-gray-600"}
                        type={TypographyType.B2}
                      >
                        매매금액
                      </Typography>
                      <div className="basis-2/3 flex justify-end items-center gap-2">
                        <Typography
                          color={"text-kos-gray-800"}
                          type={TypographyType.B1}
                        >
                          <CurrencyFormat
                            decimalSeparator={"false"}
                            value={detailInfo.slPrc}
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                        </Typography>
                      </div>
                    </li>
                    <li
                      className={`flex justify-between items-start transition-all ease-in-out py-1 px-4`}
                    >
                      <Typography
                        color={"text-kos-gray-600"}
                        type={TypographyType.B2}
                      >
                        전자등기사무소
                      </Typography>
                      <div className="basis-2/3 flex justify-end items-center gap-2">
                        <Typography
                          color={"text-kos-gray-800"}
                          type={TypographyType.B1}
                        >
                          {detailInfo.elregReptOfficeNm}
                        </Typography>
                        {!!detailInfo.elregOfficeTelNo && (
                          <button onClick={phoneClick3}>
                            <Image src={Telephone} alt="전화 아이콘" />
                          </button>
                        )}
                      </div>
                    </li>
                  </>
                )}
                {isOpenAccordion && detailInfo?.clsBtnYn === "Y" && (
                  <li>
                    <Link
                      href={{
                        pathname: "/acceptance/match/accept-fail",
                        query: { loanNo: detailInfo?.loanNo },
                      }}
                      className="flex align-center justify-center ml-auto mr-4 border border-kos-gray-400 py-1 w-[61px] rounded-lg"
                    >
                      <Typography
                        color={"text-kos-gray-700"}
                        type={TypographyType.B5}
                      >
                        수임철회
                      </Typography>
                    </Link>
                  </li>
                )}
              </ul>
            </>
          )}

          <div
            className={`w-full bg-kos-white box-border ${
              isOpenAccordion && "px-4 -mt-px rounded-b-2xl"
            }`}
          >
            <button
              type="button"
              onClick={toggleAccordion}
              className={`_flex-center relative border-t border-t-1 border-kos-gray-200 gap-1 w-full py-4`}
            >
              <Typography color={"text-kos-gray-700"} type={TypographyType.B4}>
                상세정보 {isOpenAccordion && "접기"}
              </Typography>
              <Image
                src={Arrow}
                alt="상세정보 토글 아이콘"
                className={`transition-all ${
                  isOpenAccordion ? "-rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
