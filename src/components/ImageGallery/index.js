import { useEffect, useRef, useState } from "react";

import DummyGroup from "../DummyGroup";
import ImageCard from "./ImageCard";
import Logo from "../../assets/logo.svg";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LightningBoltIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import styles from "../Scrollbar.module.css";

import getPhotosApi from "../../utils/getPhotosApi";
import { Link } from "react-router-dom";

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
    if (inp === "") return;
    const res = await getPhotosApi(GET_BY_SEARCH, {
      params: { query: inp, per_page: 30 },
    });
    setImgs(res.data.results);
    setInp("");
  };

  // Finding width of each image
  useEffect(() => {
    setWArr(imgs.map((el) => Math.ceil((el.width / el.height) * 400) + 24));
  }, [imgs]);

  // initally fetch the images
  useEffect(() => {
    // getRandomImages();
    if (ctr.current) {
      ctr.current.scrollTo(0, 0);
    }
  }, []);

  // render all the images
  const list = imgs?.map((el) => <ImageCard el={el} key={el.id} />);

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
      <div className="flex justify-between px-8 py-4 mb-2 text-xl font-bold text-white bg-purple-600">
        <Link to="/" className="flex items-center">
          <img className="w-6 mr-3" src={Logo} alt="logo" />
          <span className="hidden md:block">ImgGallery</span>
        </Link>
        <div className="flex items-center cursor-pointer">
          <input
            type="text"
            value={inp}
            placeholder="Search Images..."
            className="px-4 py-2 text-base text-purple-600 rounded-lg placeholder:text-purple-600 placeholder:text-base focus:outline-none"
            onChange={(e) => setInp(e.target.value)}
          />
          <SearchIcon
            className="w-10 h-10 p-2 -mx-2 text-purple-600 bg-white rounded-tr-lg rounded-br-lg"
            onClick={getSearchedImages}
          />
        </div>
      </div>
      <div className="flex justify-center my-2 mr-2 md:justify-end">
        <button
          className="flex items-center px-6 mx-2 my-6 font-semibold tracking-wide text-white duration-200 ease-linear bg-purple-600 border-2 border-purple-600 rounded-lg cursor-pointer disabled:opacity-80 disabled:hover:text-white disabled:cursor-not-allowed disabled:bg-slate-500 disabled:border-gray-600 hover:bg-white hover:text-purple-600"
          onClick={() => getRandomImages("random")}
        >
          Shuffle
          <LightningBoltIcon className="w-10 h-10 p-2" />
        </button>
      </div>
      <div
        ref={ctr}
        className={`flex gap-6 mx-4 bg-[#eee] rounded-md md:px-6 overflow-x-scroll scroll-smooth min-h-[400px] scrollbar-hide md:scrollbar-default md:snap-none snap-x ${styles.scrollbar}`}
      >
        {imgs.length ? list : <DummyGroup />}
      </div>
      {/* Controls */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={prevHandler}
          disabled={!imgs.length}
          className="mx-2 my-4 text-white duration-200 ease-linear bg-purple-600 border-2 border-purple-600 rounded-lg cursor-pointer disabled:opacity-80 disabled:hover:text-white disabled:cursor-not-allowed disabled:bg-slate-500 disabled:border-gray-600 hover:bg-white hover:text-purple-600"
        >
          <ChevronLeftIcon className="w-10 h-10 p-2" />
        </button>
        <button
          onClick={nextHandler}
          disabled={!imgs.length}
          className="mx-2 my-4 text-white duration-200 ease-linear bg-purple-600 border-2 border-purple-600 rounded-lg cursor-pointer disabled:opacity-80 disabled:hover:text-white disabled:cursor-not-allowed disabled:bg-slate-500 disabled:border-gray-600 hover:bg-white hover:text-purple-600"
        >
          <ChevronRightIcon className="w-10 h-10 p-2" />
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
