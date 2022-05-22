import React from "react";
import DummyImgCard from "./DummyImgCard";

import { v4 } from "uuid";

const DummyImgGroup = () => {
  const list = [];
  list.length = 4;
  list.fill(0, 0, 4);
  return (
    <>
      {list.map((el) => (
        <DummyImgCard key={v4()} />
      ))}
    </>
  );
};

export default DummyImgGroup;
