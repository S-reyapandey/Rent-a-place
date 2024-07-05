import React, { useEffect } from "react";
import { useValue } from "../context/ContextProvider";
import { jwtDecode } from 'jwt-decode';


const useCheckToken = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (currentUser && currentUser.token) {
        try {
          const decodedToken = jwtDecode(currentUser.token);
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch({
              type: "UPDATE_USER",
              payload: null,
            });
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          
        }
      }
    };

    checkTokenValidity();

  }, []); 
  return null; 
};

export default useCheckToken;
