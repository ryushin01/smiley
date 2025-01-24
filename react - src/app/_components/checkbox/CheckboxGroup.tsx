"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { CheckBoxBigOff, WooriCheckBoxBigOn } from "@icons";

type CheckboxProps = {
  id: string;
  label: string;
};

type CheckboxGroupProps = {
  dataSet: CheckboxProps[];
};

export default function CheckboxGroup({
  id,
  label,
  dataSet,
}: CheckboxProps & CheckboxGroupProps) {
  const [checkList, setCheckList] = useState<string[]>([]);
  // const [isAllCheck, setIsAllCheck] = useState(false);
  const valueArray: string[] = [];

  for (let object of dataSet) {
    valueArray.push(object.id);
  }

  const checkAll = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setCheckList(valueArray) : setCheckList([]);
  };

  const check = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setCheckList([...checkList, event.target.id])
      : setCheckList(
          checkList.filter((checkListItem) => checkListItem !== event.target.id)
        );
  };

  return (
    <>
      <div className="relative flex gap-x-2 items-center">
        <input
          type="checkbox"
          name={id}
          id={id}
          onChange={checkAll}
          checked={checkList.length === dataSet.length}
          className="peer appearance-none relative shrink-0 w-6 h-6 mb-1.5 focus:outline-none"
        />
        <Image
          className="absolute top-0 w-6 h-6 pointer-events-none peer-checked:hidden mt-1"
          src={CheckBoxBigOff}
          alt="미선택 표시 아이콘"
        />
        <Image
          className="absolute top-0 hidden w-6 h-6 pointer-events-none peer-checked:block mt-1"
          src={WooriCheckBoxBigOn}
          alt="선택 표시 아이콘"
        />
        <label htmlFor={id}>{label}</label>
      </div>
      <div>
        {dataSet?.map((data) => {
          const { id, label } = data;

          return (
            <div className="relative flex gap-x-2 items-center" key={id}>
              <input
                type="checkbox"
                name={id}
                id={id}
                onChange={check}
                checked={checkList.includes(id!)}
                className="peer appearance-none relative shrink-0 w-6 h-6 mb-1.5 focus:outline-none"
              />
              <Image
                className="absolute top-0 w-6 h-6 pointer-events-none peer-checked:hidden mt-1"
                src={CheckBoxBigOff}
                alt="미선택 표시 아이콘"
              />
              <Image
                className="absolute top-0 hidden w-6 h-6 pointer-events-none peer-checked:block mt-1"
                src={WooriCheckBoxBigOn}
                alt="선택 표시 아이콘"
              />
              <label htmlFor={id}>{label}</label>
            </div>
          );
        })}
      </div>
    </>
  );
}
