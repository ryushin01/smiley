"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ExclamationMarkBlue } from "@icons";
import { Divider, Input, Loading, Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";
import { useFetchApi } from "@hooks";
import { caseDetailAtom } from "@stores";
import { useAtomValue } from "jotai";
import { Controller, useForm } from "react-hook-form";
import CurrencyFormat from "react-currency-format";
/* TODO : 아래 목업 데이터 호출 삭제 */
import payInfolData from "@data/cntr-searchpayinfolist/07/cntr-searchpayinfolist.json";

/**
 * slmnLndProc [모집인(SR) 대출프로세스]
 * 01 : 조건부 취급대상 아님
 * 02 : 소유권이전
 * 03 : 소유권이전 & 후순위설정
 * 04 : 선순위말소/감액
 * 05 : 신탁등기 말소
 * 06 : 임차인 퇴거
 * 07 : 중도금
 * 08 : 임차권 및 전세권 말소
 * 09 : 임차권 명령 및 압류/가압류 말소
 */

export default function MY_PI_002M() {
  const searchParmas = useSearchParams();
  const isModify = searchParmas.get("previousState") ?? false;
  const { fetchApi } = useFetchApi();
  const [isLoading, setIsLoading] = useState(false);
  const { loanNo, regType } = useAtomValue(caseDetailAtom);
  const [procCd, setProcCd] = useState("");
  const [findloanNo, setFindLoanNo] = useState("");
  const [payInfo, setpayInfo] = useState<TSrSvo>({
    slmnLndProc: "",
    sellerNm1: "",
    sellerBirthDt1: "",
    sellerNm2: "",
    sellerBirthDt2: "",
    trstNm: "",
    cnsgnNm: "",
    bnfrNm: "",
    pwpsNm: "",
    pwpsBirthDt: "",
    bnkGbCd: "020",
    bankNm: "우리은행",
    execAmt: 0,
  });

  const router = useRouter();

  const {
    control,
    setValue,
    getValues,
    clearErrors,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<TSrSvo>({
    defaultValues: {
      slmnLndProc: "",
      sellerNm1: "",
      sellerBirthDt1: "",
      sellerNm2: "",
      sellerBirthDt2: "",
      trstNm: "",
      cnsgnNm: "",
      bnfrNm: "",
      pwpsNm: "",
      pwpsBirthDt: "",
      bnkGbCd: "020",
      bankNm: "우리은행",
      execAmt: 0,
    },
  });

  function moneyStringToNumber(money: string | number) {
    if (money === "") return 0;
    if (typeof money === "number") return money;
    return parseInt(money.replaceAll(",", ""));
  }

  /* TODO : api 호출 주석 해제 및 loanNo 들어오는지 체크*/
  // const { mutate: getPayInfoList } = useMutation({
  //   mutationKey: ["pay-info-list"],
  //   mutationFn: async () => {
  //     setIsLoading(true);

  //     const response = await fetchApi({
  //       url: `${process.env.NEXT_PUBLIC_APP_WOORI_API_URL}/api/cntr/searchpayinfolist/${loanNo}`,
  //       method: "post",
  //     });

  //     setIsLoading(false);

  //     return response.json();
  //   },
  //   onSuccess: (res) => {
  //     console.log("지급정보등록 조회", res);
  //     if (res.code === "00" && res?.data?.srCvo) {
  //       setProcCd(res?.data?.srCvo.slmnLndProc);
  //       setpayInfo(res?.data?.srCvo);
  // setFindLoanNo(res?.data?.loanNo);

  // if (!procCd) return;
  //       // 02 : 소유권이전 / 03 : 소유권이전&후순위설정 / 09 : 임차권 명령 및 가압류 말소
  //       if (procCd === "02" || procCd === "03") {
  //         setValue("sellerNm1", res?.data?.srCvo.sellerNm1); //매도인명
  //         setValue("sellerBirthDt1", res?.data?.srCvo.sellerBirthDt1); //매도인 생년월일
  //         setValue("sellerNm2", res?.data?.srCvo.sellerNm2); //(공동)매도인명
  //         setValue("sellerBirthDt2", res?.data?.srCvo.sellerBirthDt2); //(공동)매도인 생년월일
  //         setValue("bnkGbCd", res?.data?.srCvo.bnkGbCd);  //은행코드
  //         setValue("bankNm", res?.data?.srCvo.bankNm); //은행명
  //         setValue("execAmt", res?.data?.srCvo.execAmt); //상환금
  //       }
  //       // 05 : 중도금
  //       else if (procCd === "05") {
  //         setValue("trstNm", res?.data?.srCvo.trstNm); //수탁자명(신탁사)
  //         setValue("cnsgnNm", res?.data?.srCvo.cnsgnNm); //위탁자명(부동산소유자)
  //         setValue("bnfrNm", res?.data?.srCvo.bnfrNm); //우선 수익자명
  //         setValue("bnkGbCd", res?.data?.srCvo.bnkGbCd); //은행코드
  //         setValue("bankNm", res?.data?.srCvo.bankNm); //은행명
  //         setValue("execAmt", res?.data?.srCvo.execAmt); //상환금
  //       }
  //       // 07 : 신탁등기 말소
  //       else if (procCd === "07") {
  //         setValue("pwpsNm", res?.data?.srCvo.pwpsNm); //매도인명(담보제공자)
  //         setValue("pwpsBirthDt", res?.data?.srCvo.pwpsBirthDt); //매도인(담보제공자)생년월일
  //         setValue("bnkGbCd", res?.data?.srCvo.bnkGbCd); //은행코드
  //         setValue("bankNm", res?.data?.srCvo.bankNm); //은행명
  //         setValue("execAmt", res?.data?.srCvo.execAmt); //상환금
  //       }
  //       // 그외 : 01 / 04 / 06 / 08
  //       else {
  //         setValue("bnkGbCd", res?.data?.srCvo.bnkGbCd); //은행코드
  //         setValue("bankNm", res?.data?.srCvo.bankNm); //은행명
  //         setValue("execAmt", res?.data?.srCvo.execAmt); //상환금
  //       }
  //     }
  //   },
  // });

  // useEffect(() => {
  //   getPayInfoList();
  // }, [getPayInfoList]);

  /* TODO : 아래 useEffect 삭제 */
  useEffect(() => {
    setProcCd(payInfolData?.data?.srCvo.slmnLndProc);
    setpayInfo(payInfolData?.data?.srCvo);
    setFindLoanNo(payInfolData?.data.loanNo);

    if (!procCd) return;
    // 02 : 소유권이전 / 03 : 소유권이전&후순위설정
    if (procCd === "02" || procCd === "03" || procCd === "09") {
      setValue("sellerNm1", payInfolData?.data?.srCvo.sellerNm1); //매도인명
      setValue("sellerBirthDt1", payInfolData?.data?.srCvo.sellerBirthDt1); //매도인 생년월일
      setValue("sellerNm2", payInfolData?.data?.srCvo.sellerNm2); //(공동)매도인명
      setValue("sellerBirthDt2", payInfolData?.data?.srCvo.sellerBirthDt2); //(공동)매도인 생년월일
      setValue("bnkGbCd", "020"); // 은행코드
      setValue("bankNm", "우리은행"); // 은행명
      setValue("execAmt", payInfolData?.data?.srCvo.execAmt); //상환금
    }
    // 05 : 중도금
    else if (procCd === "05") {
      setValue("trstNm", payInfolData?.data?.srCvo.trstNm);
      setValue("cnsgnNm", payInfolData?.data?.srCvo.cnsgnNm);
      setValue("bnfrNm", payInfolData?.data?.srCvo.bnfrNm);
      setValue("bnkGbCd", "020");
      setValue("bankNm", "우리은행");
      setValue("execAmt", payInfolData?.data?.srCvo.execAmt);
    }
    // 07 : 신탁등기 말소
    else if (procCd === "07") {
      setValue("pwpsNm", payInfolData?.data?.srCvo.pwpsNm);
      setValue("pwpsBirthDt", payInfolData?.data?.srCvo.pwpsBirthDt);
      setValue("bnkGbCd", "020");
      setValue("bankNm", "우리은행");
      setValue("execAmt", payInfolData?.data?.srCvo.execAmt);
    }
    // 그외 : 01 / 04 / 06 / 08 / 09
    else {
      setValue("bnkGbCd", "020");
      setValue("bankNm", "우리은행");
      setValue("execAmt", payInfolData?.data?.srCvo.execAmt);
    }

    console.log(procCd);
    console.log("payInfo", payInfo);
    console.log("findloanNo", findloanNo);
  }, [procCd]);
  console.log("loanNo", loanNo);

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col grow w-full h-full relative">
        <div className="flex flex-col grow h-full w-full">
          <section className="relative grow">
            <section className="px-4 mt-6">
              <Typography color={"text-kos-gray-800"} type={TypographyType.H1}>
                대출금&nbsp;
                <CurrencyFormat
                  decimalSeparator={"false"}
                  value={payInfo.execAmt ?? 0}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                원의
                <br />
                지급정보를 입력해주세요
              </Typography>
              <p className="text-kos-blue-500 text-sm flex items-start font-semibold gap-x-2 mt-4 pr-16">
                <Image src={ExclamationMarkBlue} alt="exclamation mark" />
                대출모집인 취급건으로 지급정보 수정이 불가합니다. &#40;우리은행
                입금 지정 계좌로 대출금 지급&#41;
              </p>
            </section>
            {(procCd === "02" || procCd === "03" || procCd === "09") && (
              <>
                <section className="px-4 py-6 flex flex-col gap-y-5">
                  <Typography
                    color={"text-kos-gray-800"}
                    type={TypographyType.H2}
                  >
                    매도인
                  </Typography>
                  <Input.InputContainer>
                    <Input.Label htmlFor={"sellerNm1"}>{"이름"}</Input.Label>
                    <Controller
                      control={control}
                      name="sellerNm1"
                      render={({ field: { value } }) => (
                        <Input.TextInput
                          autoFocus={true}
                          value={value}
                          onClick={() => null}
                          disabled={true} // 비활성화
                          readOnly={true} // 수정불가
                        />
                      )}
                    />
                    <Input.Label htmlFor={"sellerBirthDt1"}>
                      {"생년월일"}
                    </Input.Label>
                    <Controller
                      control={control}
                      name="sellerBirthDt1"
                      render={({ field: { value } }) => (
                        <Input.TextInput
                          autoFocus={true}
                          value={value}
                          onClick={() => null}
                          disabled={true} // 비활성화
                          readOnly={true} // 수정불가
                        />
                      )}
                    />
                  </Input.InputContainer>
                </section>
                <div className="border-t border-t-1 border-kos-gray-200 mt-4"></div>
                {payInfo.sellerNm2 && (
                  <section className="px-4 py-6 flex flex-col gap-y-5">
                    <Typography
                      color={"text-kos-gray-800"}
                      type={TypographyType.H2}
                    >
                      &#40;공동&#41; 매도인
                    </Typography>
                    <Input.InputContainer>
                      <Input.Label htmlFor={"sellerNm2"}>{"이름"}</Input.Label>
                      <Controller
                        control={control}
                        name="sellerNm2"
                        render={({ field: { value } }) => (
                          <Input.TextInput
                            autoFocus={true}
                            value={value}
                            onClick={() => null}
                            disabled={true} // 비활성화
                            readOnly={true} // 수정불가
                          />
                        )}
                      />
                      <Input.Label htmlFor={"sellerBirthDt2"}>
                        {"생년월일"}
                      </Input.Label>
                      <Controller
                        control={control}
                        name="sellerBirthDt2"
                        render={({ field: { value } }) => (
                          <Input.TextInput
                            autoFocus={true}
                            value={value}
                            onClick={() => null}
                            disabled={true} // 비활성화
                            readOnly={true} // 수정불가
                          />
                        )}
                      />
                    </Input.InputContainer>
                  </section>
                )}
              </>
            )}
            {procCd === "05" && (
              <section className="px-4 py-6 flex flex-col gap-y-5">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  신탁사
                </Typography>
                <Input.InputContainer>
                  <Input.Label htmlFor={"trstNm"}>
                    {"수탁자명(신탁사)"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="trstNm"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                  <Input.Label htmlFor={"cnsgnNm"}>
                    {"위탁자명(부동산소유자)"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="cnsgnNm"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                  <Input.Label htmlFor={"bnfrNm"}>{"우선 수익자"}</Input.Label>
                  <Controller
                    control={control}
                    name="bnfrNm"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                </Input.InputContainer>
              </section>
            )}
            {procCd === "07" && (
              <section className="px-4 py-6 flex flex-col gap-y-5">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  매도인&#40;담보제공자&#41;
                </Typography>
                <Input.InputContainer>
                  <Input.Label htmlFor={"pwpsNm"}>{"이름"}</Input.Label>
                  <Controller
                    control={control}
                    name="pwpsNm"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                  <Input.Label htmlFor={"pwpsBirthDt"}>
                    {"생년월일"}
                  </Input.Label>
                  <Controller
                    control={control}
                    name="pwpsBirthDt"
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        autoFocus={true}
                        value={value}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                </Input.InputContainer>
              </section>
            )}
            {(procCd === "02" ||
              procCd === "03" ||
              procCd === "05" ||
              procCd === "07" ||
              procCd === "09") && <Divider />}
            <section className="py-3 px-4">
              <div className="py-3">
                <Typography
                  color={"text-kos-gray-800"}
                  type={TypographyType.H2}
                >
                  상환금{" "}
                </Typography>
              </div>
              <Input.InputContainer key="bankGbCd" className={`pb-5`}>
                <Input.Label htmlFor="test">상환정보</Input.Label>
                <Input.InputGroup>
                  <Controller
                    control={control}
                    name={`bankNm`}
                    render={({ field: { onBlur, value } }) => (
                      <Input.Dropdown
                        value={value ?? ""}
                        onClick={() => null}
                        placeholder={"우리은행"}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`execAmt`}
                    render={({ field: { value } }) => (
                      <Input.TextInput
                        value={moneyStringToNumber(value)}
                        isCurrency={true}
                        onClick={() => null}
                        disabled={true} // 비활성화
                        readOnly={true} // 수정불가
                      />
                    )}
                  />
                </Input.InputGroup>
              </Input.InputContainer>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
