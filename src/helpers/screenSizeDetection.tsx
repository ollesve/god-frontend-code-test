import { useState, useEffect, memo } from "react";
import { ScreenSizeType } from "../../types/screenSize";



export const useScreenSizeDetection = (): ScreenSizeType => {

  const [width, setWidth] = useState<number>(1000);


  useEffect(() => {
    setWidth(window.innerWidth);

    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  if (width < 480) {
    return "S"
  } else if (width >= 480 && width < 1024) {
    return "M"
  } else if (width >= 1024 && width < 1600) {
    return "L"
  } else {
    return "XL"
  }
}