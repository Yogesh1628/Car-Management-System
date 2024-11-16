import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';

const UserListings = () => {
  const { currentUser } = useSelector((state) => state.user); 
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    const handleShowListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      } finally {
        setIsLoading(false);  
      }
    };

    if (currentUser) {
      handleShowListings(); 
    } else {
      setIsLoading(false); 
    }
  }, [currentUser]); 

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
}

  return (
    <div className="user-listings-container">
      {isLoading ? (
        <p>Loading your Cars...</p> 
      ) : (
        <>
          <p className="text-red-700 mt-5">
            {showListingsError ? 'Error showing listings' : ''}
          </p>

          {userListings && userListings.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-center mt-7 text-2xl font-semibold">
                Your Cars List
              </h1>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-lg p-3 flex justify-between items-center gap-4"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-contain"
                    />
                  </Link>
                  <Link
                    className="text-slate-700 font-semibold hover:underline truncate flex-1"
                    to={`/listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>

                  <div className="flex flex-col item-center">
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="text-red-700 uppercase"
                    >
                      Delete
                    </button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="text-green-700 uppercase">Update</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No Cars found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserListings;
