"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PopUp from "./popup";
import ReloadImage from "./reloadImage";
import { set } from "animejs";
import { FcLike } from "react-icons/fc";

interface BoradProps {
  gridClass: string;
}

// const imgURLS: string[] = [];
const cols_one: string[] = [];
const cols_two: string[] = [];
const cols_three: string[] = [];
const cols_four: string[] = [];
const cols_five: string[] = [];
const cols_more: string[] = [];

interface BoradProps {
  gridClass: string;
  sort: string;
  search: string;
}

const Borad: React.FC<BoradProps> = ({ gridClass, sort, search }) => {

  function Reloadimg() {
    setCount((prevCount: number) => prevCount + 3);
    console.log("value Reloadimg : --------------------------------------------- ", count);
  }

  const [imgURLS, setImgURLS] = useState<string[]>([]);
  const [showPopUp, setShowPopUp] = useState("");
  const [count, setCount] = useState(3);
  const [likeImg, setLikeImg] = useState<string[]>([]);

  const handleClick = (url: string) => {
    console.log("Print url:", url);
    setShowPopUp(url);
  };

  const handleClose = () => {
    setShowPopUp("");
  };

  useEffect(() => {
    console.log("sort : --------------------------------------------- ", sort);
    cols_one.length = 0;
    cols_two.length = 0;
    cols_three.length = 0;
    cols_four.length = 0;
    cols_five.length = 0;
    cols_more.length = 0;

    axios.post("/api/sortImage", { sort }).then((response) => {
      if (response.data.status === 200) {
        for (let i = 0; i < response.data.img_url.length; i++) {
          setImgURLS(response.data.img_url);
        }


      } else {
        console.error("Error sorting images:", response.data.message);
      }
    });
  }, [count, sort]);

  useEffect(() => {
    cols_one.length = 0;
    cols_two.length = 0;
    cols_three.length = 0;
    cols_four.length = 0;
    cols_five.length = 0;
    cols_more.length = 0;


    axios.post("/api/search", { search }).then((response) => {
      if (response.data.status === 200) {
        for (let i = 0; i < response.data.img_url.length; i++) {
          console.log('data forloop search ---------->>>>> ', response.data.img_url[i]);
          // setImgURLS(response.data.img_url[i]);
        }
      } else {
        console.error("Error sorting images:", response.data.message);
      }
    });
  }, [count, search]);

  console.log('imgURLS all : ---------------------------------- || ', imgURLS);
  for (let i = 0; i < imgURLS.length; i++) {

    if (cols_one.length <= count) {
      const imgData = JSON.stringify(imgURLS[i]);
      const img_ = imgData.split("|");
      const imgUrlPart = img_[0].split('!')[1].split('Imgurl=').pop() ?? ""
      const userUrl = img_[1].split('"')[0] ?? ""
      const userUrlPart = userUrl.split('=') ?? ""
      const resultdata = imgUrlPart + "|" + userUrlPart
      cols_one.push(resultdata);
    } else if (cols_two.length <= count) {
      const imgData = JSON.stringify(imgURLS[i]);
      const img_ = imgData.split("|");
      const imgUrlPart = img_[0].split('!')[1].split('Imgurl=').pop() ?? ""
      const userUrl = img_[1].split('"')[0] ?? ""
      const userUrlPart = userUrl.split('=') ?? ""
      const resultdata = imgUrlPart + "|" + userUrlPart
      cols_two.push(resultdata);
    } else if (cols_three.length <= count) {
      const imgData = JSON.stringify(imgURLS[i]);
      const img_ = imgData.split("|");
      const imgUrlPart = img_[0].split('!')[1].split('Imgurl=').pop() ?? ""
      const userUrl = img_[1].split('"')[0] ?? ""
      const userUrlPart = userUrl.split('=') ?? ""
      const resultdata = imgUrlPart + "|" + userUrlPart
      cols_three.push(resultdata);
    } else if (cols_four.length <= count) {
      const imgData = JSON.stringify(imgURLS[i]);
      const img_ = imgData.split("|");
      const imgUrlPart = img_[0].split('!')[1].split('Imgurl=').pop() ?? ""
      const userUrl = img_[1].split('"')[0] ?? ""
      const userUrlPart = userUrl.split('=') ?? ""
      const resultdata = imgUrlPart + "|" + userUrlPart
      cols_four.push(resultdata);
    } else if (cols_five.length <= count) {
      const imgData = JSON.stringify(imgURLS[i]);
      const img_ = imgData.split("|");
      const imgUrlPart = img_[0].split('!')[1].split('Imgurl=').pop() ?? ""
      const userUrl = img_[1].split('"')[0] ?? ""
      const userUrlPart = userUrl.split('=') ?? ""
      const resultdata = imgUrlPart + "|" + userUrlPart
      cols_five.push(resultdata);
    } else {
      cols_more.push(imgURLS[i]);
    }
  }

  const imgURLS_tests = [
    "imgURLS_test : !Imgurl=https://gifmakerstorage.blob.core.windows.net/gifstorage/foldergif/giphy15.gif?id=44?like=9|path_profilee=https://gifmakerstorage.blob.core.windows.net/profilestores/vitor.png?name=0X1DC130C"
    // เพิ่มข้อมูล URL ที่ต้องการ
  ];

  for (let i = 0; i < cols_two.length; i++) {
    console.log('cols_two >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : ', cols_two[i].split("|")[0].split('?')[2].split('=')[1]);
    console.log('cols_two >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : ', cols_two[i].split("|")[1].split(',')[2]);
    console.log('cols_two >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> : ', cols_two[i].split("|")[1].split(',')[1].split('?')[0]);
  }

  for (let i = 0; i < imgURLS_tests.length; i++) {
    const img = JSON.stringify(imgURLS_tests[i]);
    const img_ = img.split("|");
    const imgUrlPart = img_[0].split("?")[2];

    // console.log('user DATA ----------------',user);
    // console.log("img- index 0 ------------------------", img_[0].split('!')[1].split('Imgurl=').pop() ?? "");
    console.log('img- index 0 ------------------------', img_[1].split('"') ?? "");
    const data = img_[1].split('=') ?? ""
    console.log("img-index 1 path :--------------------->", data[1])
    console.log('Img_ DATA name  ----------------', data[2]);
    // console.log('cols_one : ', cols_one[i].split('?'));
  }


  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className={gridClass}>
          {cols_one.map((url, index) => (
            
            <div key={index} className="w-full h-full flex relative">
              <img
                className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
                src={url}
                alt=""
              />
              <div
                className="text-white rounded-lg opacity-0 absolute top-0 left-0 right-0 bottom-0 flex items-end p-4 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 cursor-pointer"
                onClick={() => handleClick(url)}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <FcLike className="text-2xl mr-2" />
                    {typeof url === 'string' ? url.split("|")[0].split('?')[2].split('=')[1] ?? "" : ""}
                  </div>
                  <div className="flex items-center">
                    <img
                      src={typeof url === 'string' ? url.split("|")[1].split(',')[1].split('?')[0] ?? "" : ""}
                      className="w-8 h-8 rounded-full mr-4"
                      onError={(e) => { e.currentTarget.src = "/images/profile.png" }}
                    />
                    {typeof url === 'string' ? url.split("|")[1].split(',')[2] ?? "" : ""}
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div>

        <div className={gridClass}>
          {cols_two.map((url, index) => (
            // console.log('col 1', url),
            <div key={index} className="w-full h-full flex relative">
            <img
              className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
              src={url}
              alt=""
            />
            <div
              className="text-white rounded-lg opacity-0 absolute top-0 left-0 right-0 bottom-0 flex items-end p-4 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 cursor-pointer"
              onClick={() => handleClick(url)}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <FcLike className="text-2xl mr-2" />
                  {typeof url === 'string' ? url.split("|")[0].split('?')[2].split('=')[1] ?? "" : ""}
                </div>
                <div className="flex items-center">
                  <img
                    src={typeof url === 'string' ? url.split("|")[1].split(',')[1].split('?')[0] ?? "" : ""}
                    className="w-8 h-8 rounded-full mr-4"
                    onError={(e) => { e.currentTarget.src = "/images/profile.png" }}
                  />
                  {typeof url === 'string' ? url.split("|")[1].split(',')[2] ?? "" : ""}
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>

        <div className={gridClass}>
          {cols_three.map((url, index) => (
            // console.log('col 2', url),
            <div key={index} className="w-full h-full flex relative">
              <img
                className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
                src={url}
                alt=""
              />
              <div
                className="text-white rounded-lg opacity-0 absolute top-0 left-0 right-0 bottom-0 flex items-end p-4 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 cursor-pointer"
                onClick={() => handleClick(url)}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <FcLike className="text-2xl mr-2" />
                    {typeof url === 'string' ? url.split("|")[0].split('?')[2].split('=')[1] ?? "" : ""}
                  </div>
                  <div className="flex items-center">
                    <img
                      src={typeof url === 'string' ? url.split("|")[1].split(',')[1].split('?')[0] ?? "" : ""}
                      className="w-8 h-8 rounded-full mr-4"
                      onError={(e) => { e.currentTarget.src = "/images/profile.png" }}
                    />
                    {typeof url === 'string' ? url.split("|")[1].split(',')[2] ?? "" : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={gridClass}>
          {cols_four.map((url, index) => (
            // console.log('col 3', url),
            <div key={index} className="w-full h-full flex relative">
              <img
                className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
                src={url}
                alt=""
              />
              <div
                className="text-white rounded-lg opacity-0 absolute top-0 left-0 right-0 bottom-0 flex items-end p-4 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 cursor-pointer"
                onClick={() => handleClick(url)}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <FcLike className="text-2xl mr-2" />
                    {typeof url === 'string' ? url.split("|")[0].split('?')[2].split('=')[1] ?? "" : ""}
                  </div>
                  <div className="flex items-center">
                    <img
                      src={typeof url === 'string' ? url.split("|")[1].split(',')[1].split('?')[0] ?? "" : ""}
                      className="w-8 h-8 rounded-full mr-4"
                      onError={(e) => { e.currentTarget.src = "/images/profile.png" }}
                    />
                    {typeof url === 'string' ? url.split("|")[1].split(',')[2] ?? "" : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={gridClass}>
          {cols_five.map((url, index) => (
            // console.log('col 4', url),
            <div key={index} className="w-full h-full flex relative">
              <img
                className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
                src={url}
                alt=""
              />
              <div
                className="text-white rounded-lg opacity-0 absolute top-0 left-0 right-0 bottom-0 flex items-end p-4 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 cursor-pointer"
                onClick={() => handleClick(url)}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <FcLike className="text-2xl mr-2" />
                    {typeof url === 'string' ? url.split("|")[0].split('?')[2].split('=')[1] ?? "" : ""}
                  </div>
                  <div className="flex items-center">
                    <img
                      src={typeof url === 'string' ? url.split("|")[1].split(',')[1].split('?')[0] ?? "" : ""}
                      className="w-8 h-8 rounded-full mr-4"
                      onError={(e) => { e.currentTarget.src = "/images/profile.png" }}
                    />
                    {typeof url === 'string' ? url.split("|")[1].split(',')[2] ?? "" : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showPopUp && <PopUp imgUrl={showPopUp} onclose={handleClose} />}
      </div>
      <div className=" m-6 justify-center flex">
        <button type="button" className="cursor-pointer rounded-lg text-white text-3xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 "
          onClick={Reloadimg}
        >
          More</button>
      </div>
    </>
  );
};

export default Borad;

