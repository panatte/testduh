"use client";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { TextResource } from "../entity/TextResource";
import ColorPicker from "./colorpicker";
import FontSelect from "./fontText";
import { StoreContext } from "@/store";
import AlignText from "./alignText";
import StrokeColor from "./strokeColortext";
import { set } from "animejs";

const TEXT_RESOURCES = [
  {
    name: "Add a heading",
    fontSize: 28,
    fontWeight: 600,
  },
  {
    name: "Add a subheading",
    fontSize: 20,
    fontWeight: 600,
  },
  {
    name: "Add a body text",
    fontSize: 16,
    fontWeight: 600,
  },
];
export const TextResourcesPanel = observer(() => {
  const [textColor_, setTextColor_] = useState("#ffffff");
  const store = React.useContext(StoreContext);

  
  return (
    <div className="bg-gray-800 h-full">
      <div className=" px-[16px] pt-[16px] pb-[8px] font-semibold text-2xl text-white bg-gray-900">
        Text
      </div>
        <ul className="divide-y divide-gray-200">
          {TEXT_RESOURCES.map((resource) => {
            return (
              <li key={resource.name} className="cursor-pointer">
                <TextResource
                  sampleText={resource.name}
                  fontSize={resource.fontSize}
                  textColor={textColor_}
                  fontWeight={resource.fontWeight}
                />
              </li>
            );
          })}
        </ul>
    </div>
  );
});
