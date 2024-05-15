'use client';
import React, { FunctionComponent, useState, useEffect } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import { VideoEditorElement, ImageEditorElement, EditorElement } from "@/types";

export type FillResourceProps = {
    editorElement: EditorElement;
};
export const FillResource: FunctionComponent<FillResourceProps> = observer(({ editorElement }) => {
    const [brightness, setBrightness] = useState<number>(0);
    const [contrast, setContrast] = useState<number>(0);
    const store = React.useContext(StoreContext);

    useEffect(() => {
        setBrightness(store.brightness);
        setContrast(store.contrast);
    }, [store.brightness, store.contrast]);

    const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setBrightness(value);
        store.setBrightness(value);
    };

    const handleContrastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setContrast(value);
        store.setContrast(value);
    };

    return (
        <>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md m-2">
                <div className="text-sm mb-2 font-semibold text-black">Brightness</div>
                <div className="flex items-center mb-6">
                    <input
                        id="small-range"
                        type="range"
                        min="-100"
                        max="100"
                        value={brightness}
                        onChange={handleBrightnessChange}
                        className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer range-sm"
                    />
                    <span className="ml-2 text-black">{brightness}</span>
                </div>

                <div className="text-sm mb-2 font-semibold text-black">Contrast</div>
                <div className="flex items-center">
                    <input
                        id="small-range"
                        type="range"
                        min="0"
                        max="100"
                        value={contrast}
                        onChange={handleContrastChange}
                        className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer range-sm"
                    />
                    <span className="ml-2 text-black">{store.contrast}</span>
                </div>
            </div>

        </>
    );
});

// export const FillResource: FunctionComponent<FillResourceProps> = observer(({ editorElement }) => {
//      // State to store the contrast value
//     const store = React.useContext(StoreContext);

//     const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = parseInt(e.target.value); // Parse the input value to a number
//         setBrightness(value); // Update the brightness state
//         store.setBrightness(value);
//     }; // <--- ปิดวงเล็บของ handleBrightnessChange

//     const handleContrastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = parseInt(e.target.value); // Parse the input value to a number
//         setContrast(value); // Update the contrast state
//         store.setContrast(value);
//     }; // <--- ปิดวงเล็บของ handleContrastChange

//     return (
//         <>
//             <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
//                 Brightness
//                 <input type="range" min="-100" max="100" value={brightness} onChange={handleBrightnessChange} />
//                 <span>{brightness}</span> {/* Display current brightness value */}
//             </div>

//             <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
//                 Contrast
//                 <input type="range" min="0" max="100" value={contrast} onChange={handleContrastChange} />
//                 <span>{contrast}</span>
//             </div>
//         </>
//     );
// });
// export const FillResource: FunctionComponent<FillResourceProps> = observer((props) => {
//     const [brightness, setBrightness] = useState<number>(0); // State to store the brightness value
//     const store = React.useContext(StoreContext);
//     const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = parseInt(e.target.value); // Parse the input value to a number
//         setBrightness(value); // Update the brightness state
//         // update brightness
//         console.log('props.editorElement.id ------------------- ', props.editorElement.id)
//         // store.updateEffect(props.editorElement.id, { brightness: value });
//         const updateElement = {
//             ...props.editorElement,
//             properties: {
//                 ...props.editorElement.properties,
//                 effect: {
//                     ...props.editorElement.properties.effect,
//                     brightness: value
//                 }
//             }
//         };
//     }
// };

// return (
//     <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
//         Brightness
//         <input type="range" min="-100" max="100" value={brightness} onChange={handleBrightnessChange} />
//         <span>{brightness}</span> {/* Display current brightness value */}
//     </div>
// );
// });
