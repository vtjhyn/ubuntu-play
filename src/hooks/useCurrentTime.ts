import { useEffect, useState } from "react";

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 10 * 1000);
    return () => clearInterval(updateTime);
  }, []);

  return currentTime;
};

export default useCurrentTime;
