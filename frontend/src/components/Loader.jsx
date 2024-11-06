import React from "react";

const Loader = () => {
  return (
    <div
      className="flex justify-center items-center "
      style={{ minHeight: `calc(100vh - 60px)` }}
    >
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
