import { useEffect, useState } from "React";

export const useViewport = () => {
  const [isRunningOnClient, setIsRunningOnClient] = useState(false);
  const [width, setWidth] = useState(
    isRunningOnClient ? window.innerWidth : NaN
  );
  // Add a second state variable "height" and default it to the current window height
  const [height, setHeight] = useState(
    isRunningOnClient ? window.innerHeight : NaN
  );

  useEffect(() => {
    setIsRunningOnClient(true);
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    if (isRunningOnClient) {
      window.addEventListener("resize", handleWindowResize);
    }
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [isRunningOnClient]);

  useEffect(() => {
    setIsRunningOnClient(true);
  }, []);
  // Return both the height and width
  return { width, height };
};
