'use client';
import React, { useState, useEffect } from "react";
import FontSelect from "./fontText";
import AlignText from "./alignText";
import StrokeColor from "./strokeColortext";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import ColorPicker from "./colorpicker";

export const Toolsobject = observer(((_props: {}) => {
  const store = React.useContext(StoreContext);
  const [hidden_, setHidden] = useState("");
  const [textColor_, setTextColor_] = useState("#ffffff");

  const handleChange = (newColor: string) => {
    setTextColor_(newColor);
    store.setTextColorStore(newColor);
  }
  useEffect(() => {
    if (store.selectedElement?.type !== "text") {
      setHidden("hidden");
    } else {
      setHidden("");
    }


  }, [store.selectedElement]); // เรียกใช้ useEffect เมื่อ store.selectedElement เปลี่ยนแปลง

  return (
    <div className="m-2 h-full">
    <div className={hidden_}>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md m-2">
          <h1 className="text-2xl text-gray-800 font-semibold mb-4">Color</h1>
          <div className="flex flex-wrap gap-2">
            <button className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" style={{ backgroundColor: "#000000" }} onClick={() => handleChange("#000000")}>Black</button>
            <button className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" style={{ backgroundColor: "#0000FF" }} onClick={() => handleChange("#0000FF")}>Blue</button>
            <button className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" style={{ backgroundColor: "#FF0000" }} onClick={() => handleChange("#FF0000")}>Red</button>
            <button className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" style={{ backgroundColor: "#008000" }} onClick={() => handleChange("#008000")}>Green</button>
          </div>
          <ColorPicker />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md m-2">
          <h1 className="text-2xl text-gray-800 font-semibold mb-4">Font</h1>
          <FontSelect />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md m-2">
          <h1 className="text-2xl text-gray-800 font-semibold mb-4">Align</h1>
          <AlignText />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md m-2">
          <h1 className="text-2xl text-gray-800 font-semibold mb-4">Stroke Color</h1>
          <StrokeColor />
        </div>
      </div>
    </div>
  );
}));