import { useState, useEffect, memo } from "react";
import { DeviceType } from "../../types/device";
import { useTheme } from "vcc-ui";



export const useDeviceDetection = (): DeviceType => {

  const [width, setWidth] = useState<number>(1000);


  useEffect(() => {
    setWidth(window.innerWidth);

    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  if (width < 480) {
    return "mobile"
  } else if (width > 1024) {
    return "desktop"
  } else {
    return "tablet"
  }
}