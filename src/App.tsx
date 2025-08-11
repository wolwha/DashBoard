import { useEffect, useRef, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FcRemoveImage } from "react-icons/fc";
import { IoMdImages } from "react-icons/io";
import { RiGeminiFill } from "react-icons/ri";

export default function App() {
  const [time, setTime] = useState<Date>(new Date());
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [bg, setBg] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    photoRef.current?.click();
  };

  const setBGImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBg(URL.createObjectURL(e.target.files![0]));
    const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      const fileURL = e.target?.result;
      if (typeof fileURL === "string") {
        localStorage.setItem("fileURL", fileURL);
      } else {
        console.error("File URL is not string");
      }
    };
    reader.readAsDataURL(e.target.files![0]);
    setShowMenu(false);
  };

  const removeBgImg = () => {
    setBg(null);
    localStorage.clear();
    setShowMenu(false);
  };

  useEffect(() => {
    setBg(localStorage.getItem("fileURL"));
    const currentTime = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(currentTime);
  }, []);
  return (
    <>
      <div className="relative justify-center items-center flex w-[100vw] h-[100vh] text-white">
        <div className="flex flex-col font-extrabold items-end bg-white/20 backdrop-blur-xs px-[10px] rounded-[10px]">
          <p className="text-[100px]">
            {time.getHours().toString().padStart(2, "0")} :{" "}
            {time.getMinutes().toString().padStart(2, "0")}
          </p>
          <p className="text-[30px]">
            {(time.getMonth() + 1).toString().padStart(2, "0")}월{" "}
            {time.getDate().toString().padStart(2, "0")}일
          </p>
        </div>
        <div className="absolute right-[20px] top-[20px] flex flex-col gap-[10px]">
          <button
            className="bg-gray-300/20 z-10 size-[40px] flex justify-center items-center text-[50px] rounded-[5px] cursor-pointer shadow-2xl backdrop-blur-sm"
            onClick={() => setShowMenu(!showMenu)}
          >
            <CgMenuGridR />
          </button>
          {showMenu ? (
            <div className="flex flex-col gap-[10px]">
              <form>
                <button
                  className="bg-gray-300/20 z-10 size-[40px] flex justify-center items-center text-[50px] rounded-[5px] cursor-pointer shadow-2xl backdrop-blur-sm"
                  onClick={handleUpload}
                  type="button"
                >
                  <IoMdImages />
                </button>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={photoRef}
                  onChange={setBGImg}
                />
              </form>
              {bg !== null ? (
                <button
                  className="bg-gray-300/20 z-10 size-[40px] flex justify-center items-center text-[50px] rounded-[5px] cursor-pointer shadow-2xl backdrop-blur-sm"
                  onClick={removeBgImg}
                >
                  <FcRemoveImage />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
        <img
          src={
            bg ||
            "https://cdn.pixabay.com/photo/2022/10/07/09/06/bridge-7504605_960_720.jpg"
          }
          alt="배경이미지"
          className="absolute w-full h-full z-[-10]"
        />
        <button
          className="size-[40px] absolute right-[20px] rounded-[5px] bg-white/20 backdrop-blur-sm bottom-[20px] justify-center items-center flex text-[25px] cursor-pointer shadow-2xl"
          onClick={() => window.open("https://gemini.google.com/")}
        >
          <RiGeminiFill />
        </button>
      </div>
    </>
  );
}
