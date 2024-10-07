const WhatUserCanDo = () => {
  const data = [
    {
      text: "User Can Post Travel Tips",
    },
    {
      text: "User Can Upvote Downvote",
    },
    {
      text: "User Can Comment on Post",
    },
  ];
  return (
    <div className="my-20">
      <h3 className="text-4xl font-bold capitalize text-sky-400 mb-10 text-center">
        what user can do
      </h3>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {data?.map((item) => (
          <div className="border border-sky-400 rounded-lg py-10 px-5 text-center font-bold text-xl">
            {item?.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatUserCanDo;
