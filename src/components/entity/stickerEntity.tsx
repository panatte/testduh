'use client';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { StoreContext } from '@/store';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
 // Add missing import statement
type StickerPanelProps = {
    sticker: string;
    index: number;
};


const funcconvert = async (sticker : any) => {
    const formData = new FormData();
    formData.append('image', sticker);
    if (!formData.has('image')) {
        console.log('No image selected');
    } else {
        console.log('image for formData : ', formData.get('image'));
    }
    try {
        const { data } = await axios.post('/api/convertgif', formData);
        console.log('Response from server:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}
export const Stickerentity = observer(


    ({ sticker, index }: StickerPanelProps) => {
        const ref = React.useRef<HTMLImageElement>(null);
        const store = React.useContext(StoreContext);
        const [resolution, setResolution] = useState({ w: 0, h: 0 });
        console.log('sticker ----------------------------->>>', sticker)
        funcconvert(sticker)
        return (
            <div className="rounded-lg overflow-hidden items-center m-[15px] flex flex-col relative cursor-pointer bg-gray-700 p-4" onClick={() => store.addStickers(index)}>
                <div className="bg-[rgba(0,0,0,.25)] text-white py-1 absolute text-base top-2 right-2">
                    {resolution.w}x{resolution.h}
                </div>
                <img
                    onLoad={() => {
                        setResolution({
                            w: ref.current?.naturalWidth ?? 0,
                            h: ref.current?.naturalHeight ?? 0,
                        });
                    }}
                    ref={ref}
                    className="max-h-[100px] max-w-[150px]"
                    src={sticker}
                    height={200}
                    width={200}
                    id={`image-${index}`}
                ></img>
            </div>
        );
    }
);