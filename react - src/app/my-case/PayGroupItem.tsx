import { ReactNode } from "react";
import { Typography } from "@components";
import CurrencyFormat from "react-currency-format";

function PayGroupItem({
  label,
  payAmt,
  children,
  containerClassName,
}: {
  label: string;
  payAmt: number;
  containerClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-3 ${containerClassName}`}>
      <div className="flex justify-between items-center">
        <Typography
          type={Typography.TypographyType.H6}
          color="text-kos-gray-800"
        >
          {label}
        </Typography>
        <Typography
          type={Typography.TypographyType.H2}
          color="text-kos-gray-800"
        >
          <CurrencyFormat
            decimalSeparator={"false"}
            value={payAmt}
            thousandSeparator={true}
            displayType="text"
          />
          원
        </Typography>
      </div>
      {children}
    </div>
  );
}

export default PayGroupItem;
