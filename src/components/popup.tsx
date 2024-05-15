import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AiFillLike } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Share() {
  const img = document.getElementById("popup") as HTMLImageElement;
  const imgUrl = img?.getAttribute("src");
  navigator.clipboard.writeText(
    window.location.origin + "/?share=" + imgUrl || ""
  );
  Swal.fire({
    title: "คัดลอกลิงค์สำเร็จ",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}

const PopUp = ({
  imgUrl,
  onclose,
}: {
  imgUrl: string;
  onclose: () => void;
}) => {
  const [like, setLike] = useState(0);
  const [title, setTitle] = useState(
    <div className="max-w-sm w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-[20px] bg-slate-300 rounded col-span-1"></div>
        </div>
      </div>
    </div>
  );
  const [Description, setDescription] = useState(
    <div className="w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-[60px] bg-slate-300 rounded col-span-1"></div>
        </div>
      </div>
    </div>
  );
  const [date, setDate] = useState();
  const [tag, setTag] = useState([]);

  function userlike() {
    Swal.fire({
      title: "Loading...",
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const img = document.getElementById("popup") as HTMLImageElement;
    const imgUrl = img?.getAttribute("src");
    const img_id = imgUrl?.split("?id=")[1];
    fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: img_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.like){
          setLike(like+1)
          Swal.fire({
            title: "Like Success",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          })
        } else {
          Swal.fire({
            title: "Error",
            text: data.message,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          })
        }
      });
  }

  useEffect(() => {
    const img = document.getElementById("popup") as HTMLImageElement;
    const imgUrl = img?.getAttribute("src");
    const img_id = imgUrl?.split("?id=")[1];
    fetch("/api/getimgdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: img_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLike(data.data.user_like);
          setTitle(data.data.imgName);
          setDescription(data.data.description);
          setDate(new Date(Number(data.data.timestamp)).toLocaleString() as any);
          setTag(data.data.TagNames.split(","));
        }
      });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-[865px]">
        <div className="text-2xl font-bold mb-[10px] flex items-center justify-center">
          {title}
        </div>
        <hr className="mb-[10px]" />
        <img id="popup" src={imgUrl} alt="" className="w-full h-auto rounded" />
        <div className="w-full">
          <p className="mt-4">Description</p>
          <p className="text-gray-500 text-wrap">{Description}</p>
          {tag.length > 0 && (
            <div className="bg-slate-300 px-[10px] py-[10px] mt-[10px] rounded">
              {tag.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white p-[5px] px-[8px] rounded-md border m-[3px] shadow-inner"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-[3px]">
            <span className="text-sm">{date}</span>
          </div>
        </div>
        <hr />
        <div className="flex justify-between w-full mt-4">
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={()=>userlike()}>
              <div className="flex items-center">
                <AiFillLike className="mr-[4px]" /> Like{" "}
                <span className="ml-2">{like}</span>
              </div>
            </button>
            <button
              onClick={Share}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-3"
            >
              <div className="flex items-center">
                <FaShareAlt className="mr-[4px]" /> Share
              </div>
            </button>
          </div>
          <button
            onClick={onclose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            <div className="flex items-center">
              <IoClose className="mr-[4px]" /> Close
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
