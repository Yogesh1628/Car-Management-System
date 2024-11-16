import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [localError, setLocalError] = useState(null);  // Local error state
  const [loading, setLoading] = useState(false); // Local loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset the error and set loading to false whenever the component is mounted
    setLocalError(null);
    setLoading(false); // Set loading to false on every component mount
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true when submitting
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLocalError(data.message); // Set the local error state
        dispatch(signInFailure(data.message));
        setLoading(false); // Reset loading state
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      setLocalError(error.message); // Set the local error state
      dispatch(signInFailure(error.message));
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <div className="pb-2 text-center text-gray-600">
        Testing Email : jk9815742@gmail.com and Password : jatin2001
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {localError && <p className="text-red-500 mt-5">{localError}</p>} {/* Display local error */}
    </div>
  );
}
