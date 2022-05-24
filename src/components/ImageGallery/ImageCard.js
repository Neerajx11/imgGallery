import { DownloadIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { saveAs } from "file-saver";
import { sampleImageData } from "../../assets/data";

const ImageCard = ({ el = sampleImageData }) => {
  const onDownload = () => {
    saveAs(el.urls.full, `${el.alt_description ?? el.description ?? "image"}`);
  };

  return (
    <div className="h-[400px] relative min-w-full md:min-w-max md:my-6 rounded-md overflow-hidden snap-center md:snap-none">
      <img
        className={`object-contain hover:scale-105 duration-200 ease-linear w-full h-full mx-auto rounded-md md:w-auto md:mx-0`}
        style={{ background: `${el.color ?? "rgb(209 213 219)"}` }}
        src={window.clientWidth < 768 ? el.urls.small : el.urls.regular}
        srcSet={`${el.urls.small} 1x, ${el.urls.regular} 2x, ${el.urls.full} 3x`}
        alt={el.alt_description}
      />
      <div className="absolute bottom-0 left-0 flex items-center justify-between w-full p-3 text-white bg-gradient-to-b from-[rgba(0,0,0,0.01)] to-[rgba(0,0,0,0.6)]">
        {/* photographer detail */}
        <a
          href={`https://unsplash.com/@${el.user.username}`}
          className="flex items-center"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={el.user.profile_image.medium}
            className="w-12 mr-4 bg-white rounded-full"
            alt=""
          />
          <div className="">
            <p className="text-sm font-semibold">{el.user.name}</p>
            <p className="flex items-center text-sm font-semibold">
              {el.user.total_likes}{" "}
              <span className="hidden ml-[3px] md:inline-block">
                likes recieved
              </span>
              <span className="inline-block md:hidden">
                <HeartIcon className="w-4 h-4 ml-[5px] text-white" />
              </span>
            </p>
          </div>
        </a>
        {/* download btn */}
        <div onClick={onDownload} className="cursor-pointer">
          <DownloadIcon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
