import React, { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleChangeWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleChangeWindowSize();
    window.addEventListener("resize", handleChangeWindowSize);
    return () => {
      window.removeEventListener("resize", handleChangeWindowSize);
    };
  }, [windowSize.width, windowSize.height]);

  return windowSize;
};

export default useWindowSize;