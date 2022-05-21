import React from "react";

const DummyImgCard = () => {
  return (
    <div className="w-[300px] h-[400px] rounded-lg bg-slate-200 m-4 p-8">
      <div className="w-full h-24 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full h-4 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full h-4 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full h-4 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full h-24 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
    </div>
  );
};

export default DummyImgCard;
