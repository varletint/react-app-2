import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({});
  // const { error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(formData);

  // handle the user's inputs
  const loadFormaData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // handle the submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill out the fields");
    }

    try {
      dispatch(signInStart());
      // making a fetch request and waiting for response
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className=' min-h-screen flex justify-center mt-10 md:mt-0 md:items-center  '>
      <div
        className='  bg- p-3 max-w-3xl mx-auto  
        flex flex-col gap-7  rounded-lg
         w-full md:flex-row md:items-center '>
        <div
          className=' w-full flex flex-col md:flex-row md:items-center
           gap-4  
        '>
          <div className='flex-1'>
            <h1
              className=' text-center text-7xl md:text-[8rem]
             font-semibold sm:mb-[9rem] mb-[5rem]'>
              pEq
            </h1>
          </div>
          <form
            className=' flex-1 flex flex-col gap-7 '
            onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <label>Email</label>
              <input
                type='email'
                placeholder='email'
                className='input-text'
                id='email'
                onChange={loadFormaData}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label>Password</label>
              <input
                type='text'
                placeholder='password'
                className='input-text'
                id='password'
                onChange={loadFormaData}
              />
            </div>
            <button className='btn hover:bg-black'> Sign In</button>
            <p className='text-center text-sm '>
              Want to become a Peqie, Sign up
              <span className=' text-blue-700'>
                <a href='/sign-up' className='  ml-1'>
                  here
                </a>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
