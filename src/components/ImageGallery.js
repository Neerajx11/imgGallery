import { useEffect, useRef, useState } from "react";
import DummyImgGroup from "./DummyImgGroup";
import ImageCard from "./ImageCard";
import { SearchIcon } from "@heroicons/react/outline";
import getPhotosApi from "../utils/getPhotosApi";

import styles from "./Scrollbar.module.css";

const GET_RANDOM = "photos/random";
const GET_BY_SEARCH = "search/photos";

// smaller screen will show one card at a time
const ImageGallery = () => {
  const [wArr, setWArr] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [inp, setInp] = useState("");

  // ref for carousel
  const ctr = useRef(null);

  // req to get random images
  const getRandomImages = async () => {
    const res = await getPhotosApi(GET_RANDOM, {
      params: { count: 30 },
    });
    setImgs(res.data);
  };

  // req to get searched images
  const getSearchedImages = async () => {
    const res = await getPhotosApi(GET_BY_SEARCH, {
      params: { query: inp, per_page: 30 },
    });
    setImgs(res.data.results);
    setInp("");
  };

  // Finding width of each image
  useEffect(() => {
    setWArr(imgs.map((el) => Math.ceil((el.width / el.height) * 400) + 24));
    console.log("calculating width");
  }, [imgs]);

  // initally fetch the images
  useEffect(() => {
    getRandomImages();
    if (ctr.current) {
      console.log("scrolling");
      ctr.current.scrollTo(0, 0);
    }
  }, []);

  // render all the images
  const list = imgs?.map((el) => <ImageCard el={el} num={34} key={el.id} />);

  // for finding next elemet
  const foundNearestGreater = () => {
    let sum = 0,
      currPos = Math.ceil(ctr.current.scrollLeft);
    for (let i = 0; i <= wArr.length - 1; i++) {
      sum += wArr[i];
      if (sum > currPos) return sum;
    }
    return sum + 3;
  };

  // for finding prev elemet
  const foundNearestLower = () => {
    let sum = 0,
      currPos = Math.floor(ctr.current.scrollLeft);
    for (let i = wArr.length - 1; i >= 0; i--) {
      sum += wArr[i];
    }

    for (let i = wArr.length - 1; i >= 0; i--) {
      sum -= wArr[i];
      if (sum < currPos) return sum;
    }
    return sum - 3;
  };

  // control handlers
  const prevHandler = () => {
    if (!imgs.length) return;
    if (ctr.current.clientWidth < 786) {
      ctr.current.scrollTo(ctr.current.scrollLeft - ctr.current.clientWidth, 0);
    } else {
      ctr.current.scrollTo(foundNearestLower(), 0);
    }
  };

  const nextHandler = () => {
    if (!imgs.length) return;
    if (ctr.current.clientWidth < 786) {
      ctr.current.scrollTo(ctr.current.scrollLeft + ctr.current.clientWidth, 0);
    } else {
      ctr.current.scrollTo(foundNearestGreater(), 0);
    }
  };

  return (
    <div>
      <div className="flex justify-between mx-8 text-3xl my-14">
        <span>Gallery</span>
        <div className="flex items-center cursor-pointer">
          <input
            type="text"
            value={inp}
            placeholder="Search Images..."
            className="border-2 border-gray-300 rounded-lg placeholder:text-lg"
            onChange={(e) => setInp(e.target.value)}
          />
          <SearchIcon
            className="w-8 h-8 text-gray-400"
            onClick={getSearchedImages}
          />
        </div>
        <button onClick={() => getRandomImages("random")}>Shuffle</button>
      </div>
      <div
        ref={ctr}
        className={`flex gap-6 mx-4 bg-[#eee] rounded-md md:px-6 overflow-x-scroll scroll-smooth min-h-[400px] md:snap-none snap-x ${styles.scrollbar}`}
      >
        {imgs.length ? list : <DummyImgGroup />}
      </div>
      {/* Controls */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={prevHandler}
          disabled={!imgs.length}
          className="px-6 py-4 text-lg font-bold duration-200 bg-gray-200 cursor-pointer hover:bg-slate-500 linear hover:text-white"
        >{`<`}</button>
        <button
          onClick={nextHandler}
          disabled={!imgs.length}
          className="px-6 py-4 text-lg font-bold duration-200 bg-gray-200 cursor-pointer hover:bg-slate-500 linear hover:text-white"
        >{`>`}</button>
      </div>
    </div>
  );
};

export default ImageGallery;
