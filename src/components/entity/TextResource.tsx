"use client";
import React, { useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";

type TextResourceProps = {
  fontSize: number;
  fontWeight: number;
  textColor: string;
  sampleText: string;
};
export const TextResource = observer(
  ({ fontSize, fontWeight, sampleText }: TextResourceProps) => {
    const store = React.useContext(StoreContext);

    return (
      <div className="items-center m-[5px] flex flex-row">
        <div
          className="flex text-black px-2 py-1"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: `${fontWeight}`,
          }}
        >
          <div
            className="bg-rose-500 hover:bg-gray-400 text-white font-bold text-center mx-2 py-2 px-4 rounded cursor-pointer"
            onClick={() =>
              store.addText({
                text: sampleText,
                fontSize: fontSize,
                fontWeight: fontWeight,
                textColor: store.textColor,
                fontFamily: store.fontFamily,
                textalign: store.textAlign,
                strokeColor: store.strokeColor,
                strokeSzie: store.strokeSzie,
              })
            }
          >
            {sampleText}
          </div>
        </div>
      </div>
    );
  }
);
