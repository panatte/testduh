// FillPanel.js
'use client';
import React from 'react';
import { observer } from 'mobx-react';
import { StoreContext} from "@/store";
import { FillResource } from "../entity/FilterResource";
import { isEditorImageElement, isEditorVideoElement } from "@/store/Store";
// import { FillPanelProps } from '../../types';
import { VideoEditorElement, ImageEditorElement, EffecType } from "@/types";
export const FillPanel = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedElement = store.selectedElement;

  const handleBrightnessChange = (value: string) => {
    console.log('brightness =================== ', value);
    // handle brightness change

  };

  const handleContrastChange = (value: string) => {
    console.log('contrast ==================== ', value);
    // handle contrast change
  };

  return (
    <>
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold text-xl">
        Filters
      </div>
      {selectedElement && (isEditorImageElement(selectedElement) || 
        isEditorVideoElement(selectedElement)) ? (
          <FillResource editorElement={selectedElement} />
        ) : null}
    </>
  
  );
});
