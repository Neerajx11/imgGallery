import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DummyImgGroup from "./DummyImgGroup";

const GET_RANDOM_URL = "https://api.unsplash.com/photos/random";

// smaller screen will show one card at a time
const ImageGallery = () => {
  const [wArr, setWArr] = useState([]);
  const [imgs, setImgs] = useState([]);

  // req to get random images
  const getRandomImages = async () => {
    const res = await axios(GET_RANDOM_URL, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`,
      },
      params: {
        count: 30,
      },
    });
    setImgs(res.data);
  };

  // Finding width of each image
  useEffect(() => {
    setWArr(imgs.map((el) => Math.ceil((el.width / el.height) * 400) + 24));
  }, [imgs]);

  // initally fetch the images
  useEffect(() => {
    getRandomImages();
  }, []);

  // render all the images
  const list = imgs?.map((el, idx) => {
    return (
      <img
        key={el.id}
        className="h-[400px] relative min-w-max object-cover rounded-md my-6 snap-left bg-slate-300"
        src={window.innerWidth < 700 ? el.urls.small : el.urls.regular}
        alt={el.description}
      />
    );
  });

  // ref for carousel
  const ctr = useRef(null);

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
    ctr.current.scrollTo(foundNearestLower(), 0);
  };
  const nextHandler = () => {
    ctr.current.scrollTo(foundNearestGreater(), 0);
  };

  return (
    <div>
      <div className="flex justify-between mx-8 text-3xl my-14">
        <span>Gallery</span>
        <button onClick={getRandomImages}>Shuffle</button>
      </div>
      <div
        ref={ctr}
        className="flex gap-6 px-6 overflow-x-scroll scrollbar-hide scroll-smooth"
      >
        {list}
      </div>
      <div className="flex justify-center gap-6 mt-8">
        <span
          onClick={prevHandler}
          className="px-6 py-4 text-lg font-bold duration-200 bg-gray-200 cursor-pointer hover:bg-slate-500 linear hover:text-white"
        >{`<`}</span>
        <span
          onClick={nextHandler}
          className="px-6 py-4 text-lg font-bold duration-200 bg-gray-200 cursor-pointer hover:bg-slate-500 linear hover:text-white"
        >{`>`}</span>
      </div>

      {/* MOBILE */}
    </div>
  );
};

export default ImageGallery;
