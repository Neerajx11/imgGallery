import React from "react";

const DummyImgCard = () => {
  return (
    <div className="min-w-[300px] h-[400px] rounded-lg bg-slate-200 p-8 relative object-cover ">
      <div className="w-full h-24 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full h-4 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full h-4 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full h-4 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-full h-24 my-5 rounded-lg bg-slate-300 animate-pulse"></div>
    </div>
  );
};

export default DummyImgCard;
