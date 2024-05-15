import { observer } from 'mobx-react';
import React, { useState, useEffect, useRef } from 'react';
import { StoreContext } from '@/store';
import { Stickerentity } from '../entity/stickerEntity';
export const StickerPanel = observer(() => {
    const store = React.useContext(StoreContext);
    const stickerImages = ['giphy6.gif'];
    if(store.sticker.length === 0) {
        stickerImages.forEach((image, index) => {
            store.addStickerResource('/stickers/'+image);
            // store.addSticker(index);
            // store.addImage(index); // เรียกใช้งาน store.addImage(index) ที่นี่หรือในที่อื่นที่เหมาะสม
        });
    }

    return (
        <div>
            <div className="px-[16px] pt-[16px] pb-[8px] font-semibold text-xl text-white bg-gray-900">
                Stickers
            </div>
            <div>
                {store.sticker && store.sticker.map((sticker: any, index: any) => {
                    return <Stickerentity key={sticker} sticker={sticker} index={index} />;
                })}
            </div>
        </div>
    );
});