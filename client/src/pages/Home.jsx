import { useEffect, useState } from "react";
import { useSelector } from "react-redux";  // Added for getting current user
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux state
  const [userListings, setUserListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserListings = async () => {
      if (!currentUser) return; // If no user, do nothing

      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`); // Fetch user-related listings
        const data = await res.json();
        if (data.success === false) {
          console.log("Error fetching user listings");
          return;
        }
        setUserListings(data); // Set the user listings
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Stop loading once finished
      }
    };

    fetchUserListings(); // Call the function to fetch user listings
  }, [currentUser]);

  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Manage your dream <span className="text-slate-500">Cars</span>
          <br />
          With Us Easily
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Car management is the best website for managing cars collection 
        </div>
      </div>

      {/* User Listings Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {isLoading ? (
          <p>Loading ...</p> // Show loading state
        ) : (
          <>
            {userListings && userListings.length > 0 ? (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold text-slate-600">
                    Your Cars
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  {userListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            ) : (
              <p>No car collections found !</p> // Message when no cars found
            )}
          </>
        )}
      </div>
    </div>
  );
}
