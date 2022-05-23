import React from "react";
import DummyImgCard from "./DummyImgCard";

import { v4 } from "uuid";

const DummyImgGroup = () => {
  const list = [];
  list.length = 8;
  list.fill(0, 0, 8);
  return (
    <div className="flex gap-4 mx-4 md:mx-0">
      {list.map((el) => (
        <DummyImgCard key={v4()} />
      ))}
    </div>
  );
};

export default DummyImgGroup;
