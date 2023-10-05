import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const getGeoAddress = async (latitude, longitude) => {
  const geoApiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;
  try {
    const response = await fetch(geoApiUrl);
    const data = await response.json();
    return data?.display_name;
  } catch (error) {
    return error;
  }
};

const setGeoLocation = (setAddress) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      toast.promise(
        getGeoAddress(latitude, longitude),
        {
          loading: "Loading",
          success: (data) => {
            setAddress(data);
            return `Geo loaction found! 
            ${data}`;
          },
          error: (err) => `Something went wrong.`,
        },
        {
          style: {
            minWidth: "250px",
          },
          success: {
            duration: 5000,
            icon: "✅",
          },
        }
      );
    });
  }
};

const useCurrentAddress = () => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const tid = setTimeout(() => {
      setGeoLocation(setAddress);
    }, 1000);
    return () => clearTimeout(tid);
  }, []);

  return address;
};

export default useCurrentAddress;
