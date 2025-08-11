import { useEffect, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";

export default function App() {
  const [time, setTime] = useState<Date>(new Date());
  useEffect(() => {
    const currentTime = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(currentTime);
  }, []);
  return (
    <>
      <div className="relative justify-center items-center flex w-[100vw] h-[100vh] text-white">
        <div className="flex flex-col font-extrabold items-end">
          <p className="text-[100px]">
            {time.getHours().toString().padStart(2, "0")} :{" "}
            {time.getMinutes().toString().padStart(2, "0")}
          </p>
          <p className="text-[30px]">
            {(time.getMonth() + 1).toString().padStart(2, "0")}월{" "}
            {time.getDate().toString().padStart(2, "0")}일
          </p>
        </div>
        <button className="bg-gray-300/20 z-10 absolute right-[20px] top-[20px] size-[40px] flex justify-center items-center text-[50px] rounded-[5px] cursor-pointer shadow-2xl">
          <CgMenuGridR />
        </button>
        <img
          src="https://cdn.pixabay.com/photo/2022/10/07/09/06/bridge-7504605_960_720.jpg"
          alt="배경이미지"
          className="absolute w-full h-full z-[-10]"
        />
      </div>
    </>
  );
}
