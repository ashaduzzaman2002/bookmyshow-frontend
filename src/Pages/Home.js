import LastBookingDetails from "../Components/LastBookingDetails";
import SelectMovie from "../Components/SelectMovie";
import SelectSeats from "../Components/SelectSeats";
import TimeShedule from "../Components/TimeShedule";
import "../Css/Home.css";
import BsContext from "../Context/BsContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const context = useContext(BsContext);
  const { movie, time, noOfSeat, handlePostBooking, activeTab, setActiveTab } =
    context;

  const checkNegativeSeatsValidity = (seats) => {
    for (let seat in seats) {
      if (Number(seats[seat]) < 0) {
        return true;
      }
    }

    return false;
  };

  const checkZeroSeatsValidity = (seats) => {
    for (let seat in seats) {
      if (Number(seats[seat]) > 0) {
        return false;
      }
    }
    return true;
  };

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

  console.log(movie);

  const handleBookNow = () => {
    if (!movie) {
      toast.error("Please select  a movie!", otption);
    } else if (!time) {
      toast.error("Please select a time slot!", otption);
    } else if (
      checkNegativeSeatsValidity(noOfSeat) ||
      checkZeroSeatsValidity(noOfSeat)
    ) {
      toast.error("Invalid Seats!", otption);
    } else {
      handlePostBooking();
    }
  };

  return (
    <>
      {/* <Modal /> */}
      <ToastContainer />
      {/* Same as */}
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            {activeTab === 0 ? (
              <SelectMovie />
            ) : activeTab === 1 ? (
              <TimeShedule />
            ) : (
              <>
                <SelectSeats />
              </>
            )}

            <div className="gap-5 d-flex">
              {activeTab !== 0 && (
                <button
                  onClick={() => setActiveTab(activeTab - 1)}
                  class="glow-on-hover"
                  type="button"
                >
                  Back
                </button>
              )}
              {activeTab === 2 && (
                <button
                  onClick={() => {
                    handleBookNow();
                  }}
                  class="glow-on-hover"
                  type="button"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>

          <div className="col-12 col-md-4 mt-5 mt-md-0">
            <div className="last_booking_details_container">
              <LastBookingDetails />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
