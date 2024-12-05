import { useEffect, useState } from "react";
import { fetchBooking } from "../util/api";
import { Link } from "react-router-dom";

const Bookings = () => {

    const [bookingList, setBookingList ] = useState();
    const getBookings = async()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        let response = await fetchBooking(user.id)
        setBookingList(response.bookings)
        console.log(response)
    }

    useEffect(()=>{
       getBookings();

    },[])

return(
    <>
        <div>
        <ul>
        {bookingList?.map((booking) => (
            <li key={booking.id} className="flex justify-between items-center bg-[#f9f9f9] my-2 p-3 shadow-lg rounded-lg text-lg">
              <div className="w-1/5">{booking.vehicle_type.toUpperCase()}</div>
              <div className="w-1/5">{booking.vehicle_id}</div>
              <div className="w-1/5">{booking.from_date}</div>
              <div className="w-1/5">{booking.to_date}</div>
              <button className='rounded-full text-white'>
    
              <Link className='rounded-full text-white' to={`/${booking.vehicle_type}s/${booking.vehicle_id}`}>View Details</Link>
              </button>

            </li>
          ))}
        </ul>
        </div>
    
    </>
)
}

export default Bookings;