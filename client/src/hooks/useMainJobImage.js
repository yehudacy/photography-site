import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const MainJobImageContext = createContext();

export const MainJobImageProvider = ({ children }) => {
  const [mainJobImageIds, setMainJobImageIds] = useState({});

  useEffect(() => {
    const fetchInitialMainImageIds = async () => {
        try {
            const {data} = await axiosInstance.get('/jobs/mainimgIds');
            // console.log(data);
            setMainJobImageIds(data);
        } catch (error) {
            console.error("Error fetching initial main image ids:", error);
            
        }
    }
    fetchInitialMainImageIds();
  }, [])

  return (
    <MainJobImageContext.Provider value={{ mainJobImageIds, setMainJobImageIds }}>
      {children}
    </MainJobImageContext.Provider>
  );
};

export const useMainJobImage = () => {
    return useContext(MainJobImageContext);
}
