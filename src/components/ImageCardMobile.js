const URL =
  "https://images.unsplash.com/photo-1650573038286-250fa8e1b49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNzkzOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTMxMTYyNjU&ixlib=rb-1.2.1&q=80&w=1080";

const ImageCardMobile = ({
  el = { description: "Hello", urls: { small: URL, regular: URL } },
}) => {
  return (
    <div className="h-[400px] relative md:w-full rounded-md my-6 overflow-hidden">
      <img
        className="object-cover h-full rounded-md bg-gradient-to-br from-slate-300 to-slate-200"
        src={window.innerWidth < 700 ? el.urls.small : el.urls.regular}
        alt={el.description}
      />
    </div>
  );
};

export default ImageCardMobile;
