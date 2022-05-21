import React from "react";
import DummyImgCard from "./DummyImgCard";

const DummyImgGroup = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <DummyImgCard />
      <DummyImgCard />
      <DummyImgCard />
      <DummyImgCard />
    </div>
  );
};

export default DummyImgGroup;
