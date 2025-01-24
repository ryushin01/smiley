"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Typography } from "@components";
import { CheckboxGroup } from "@components/checkbox";
import { TypographyType } from "@components/typography/Constant";
import { WooriHeader } from "@components/woori-layout";

const CHECK_LIST_DATA = [
  {
    id: "terms-of-uses",
    label: "[필수] 서비스 이용약관",
  },
  {
    id: "privacy-policy",
    label: "[필수] 개인정보 처리방침",
  },
  {
    id: "opt-in",
    label: "[선택] 수신 동의",
  },
];

export default function Agreement() {
  const loanNoParams = useParams();
  const router = useRouter();

  return (
    <>
      <WooriHeader />

      <main className="flex flex-1 flex-col justify-between w-full pb-8 px-4">
        <div>
          <Typography
            className="py-6"
            color="text-kos-gray-800"
            type={TypographyType.H2}
          >
            본인 확인이 필요합니다.
          </Typography>

          <CheckboxGroup id="all" label="전체 동의" dataSet={CHECK_LIST_DATA} />
        </div>

        <div className="w-full">
          <Button.CtaButton
            size="XLarge"
            state="Woori"
            onClick={() =>
              router.push(`/view/searchcntr/${loanNoParams.loanNo}`)
            }
          >
            동의하고 계속하기
          </Button.CtaButton>
        </div>
      </main>
    </>
  );
}
