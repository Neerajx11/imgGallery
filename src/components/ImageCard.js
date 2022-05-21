const ImageCard = ({ el }) => {
  return (
    <div>
      <img
        className="relative h-[400px] relative min-w-max object-cover rounded-md my-6 snap-left bg-slate-300"
        src="https://images.unsplash.com/photo-1650698055751-664bb87c8639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNzkzOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTMwNjQzMzQ&ixlib=rb-1.2.1&q=80&w=400"
        alt=""
      />
    </div>
  );
};

export default ImageCard;
