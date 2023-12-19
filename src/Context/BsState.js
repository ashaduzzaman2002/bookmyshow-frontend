import React, { useState, useEffect } from "react";
import BsContext from "./BsContext";
import { toast } from "react-toastify";

const otption = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const BsState = (props) => {
  //error popup
  const [errorPopup, setErrorPopup] = useState(false);

  //error message
  const [errorMessage, setErrorMessage] = useState("");

  // time slot which the user selects.
  const [time, changeTime] = useState("");

  // Movie which the user selects.
  const [movie, changeMovie] = useState("");

  // No of seats which the user selects.
  const [noOfSeat, changeNoOfSeats] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    D1: "",
    D2: "",
  });

  const [activeTab, setActiveTab] = useState(0)

  // Last movie booking details.
  const [lastBookingDetails, setLastBookingDetails] = useState(null);

  // handling post request to save booking details on the backend
  const handlePostBooking = async () => {
    // Sending api request to backend with user selected movie, slot and seats to book movie.
    const response = await fetch(
      `http://localhost:8080/api/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie: movie, slot: time, seats: noOfSeat }),
      }
    );

    const data = await response.json();

    //showing message from backend on popup to user whether success or error
    setErrorPopup(true);
    setErrorMessage(data.message);

    if (response.status === 200) {
      //reset the state on success
      changeTime("");
      changeMovie("");
      changeNoOfSeats({
        A1: "",
        A2: "",
        A3: "",
        A4: "",
        D1: "",
        D2: "",
      });
      setLastBookingDetails(data.data);

      //clearing the local storage when booking is successfull
      window.localStorage.clear();
      setActiveTab(0)
      toast.success("Movie Booked successfully", otption);
    }
  };

  //handle get request to get the last booking details from backend
  const handleGetLastBooking = async () => {
    const response = await fetch(
      `http://localhost:8080/api/booking`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    // Setting last booking details recieved from the backend.
    setLastBookingDetails(data.data);
  };

  useEffect(() => {
    //getting movies, slot and seats from localstorage and updating state (useful when page refreshes)
    const movie = window.localStorage.getItem("movie");
    const slot = window.localStorage.getItem("slot");
    const seats = JSON.parse(window.localStorage.getItem("seats"));
    const active = JSON.parse(window.localStorage.getItem("active"));

    if(movie){
      changeMovie(movie);
    }
    if(slot){
      changeTime(slot);
    }
    if(seats){
      changeNoOfSeats(seats);
    }

    if(active) {
      setActiveTab(active)
    }
  }, []);

  return (
    // providing all the required data to app
    <BsContext.Provider
      value={{
        handlePostBooking,
        handleGetLastBooking,
        movie,
        
        changeMovie,
        time,
        changeTime,
        noOfSeat,
        activeTab,
        setActiveTab,
        changeNoOfSeats,
        lastBookingDetails,
        errorPopup,
        setErrorPopup,
        errorMessage,
        setErrorMessage,
      }}>
      {props.children}
    </BsContext.Provider>
  );
};

export default BsState;
