import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errrorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  console.log(formData);

  const loadFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      setErrorMessage("Please fill out the field");
    }
    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 character");
    }
    try {
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {}
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
              <label>Username</label>
              <input
                type='text'
                placeholder='username'
                className='input-text'
                id='username'
                onChange={loadFormData}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label>Email</label>
              <input
                type='email'
                placeholder='email'
                className='input-text'
                id='email'
                onChange={loadFormData}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label>Password</label>
              <input
                type='text'
                placeholder='password'
                className='input-text'
                id='password'
                onChange={loadFormData}
              />
            </div>
            <button className='btn hover:bg-black'> Sign Up</button>
            <p className='text-center text-sm '>
              Already have an account, Sign in
              <span className=' text-blue-700'>
                <a href='/' className='  ml-1'>
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
