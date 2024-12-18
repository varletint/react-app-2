import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function DashProfile() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleUploadImage = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downLoadUrl) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downLoadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(error);
        return;
      }
      if (data.success === false) {
        alert("success not");
      }
      if (res.ok) {
        // alert("good job");
        navigate("/questions");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className='max-w-lg mx-auto p-3   w-full
      min-h-screen '>
      <div className=' '>
        <h1
          className='text-center mt-20 font-semibold 
        text-2xl'>
          My Profile
        </h1>
        <div className=' flex flex-col items-center mt-5'>
          <img
            src=''
            alt=''
            className='w-[5rem] h-[5rem]
          bg-gray-100 rounded-[4rem]'
          />
          <div className=' flex flex-col gap-2 mt-2'>
            <label For='username' className=' '></label>
            <p className='font-semibold'>
              <span>Username</span>
            </p>
          </div>
          <div className='mt-10 border-b-2 w-full '>
            <p className='text-center font-semibold'>Info</p>
          </div>
          <div className='  w-full p-3'>
            <p className=' text-sm'>All of the wowwows coming soon...</p>
          </div>
          <div className='w-full flex justify-end mt-20'>
            <div className='relative'>
              <button className='btn' onClick={() => setIsOpen(true)}>
                Add pEq
              </button>

              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <form
                  className=' mt-6
        flex flex-col  gap-5'
                  onSubmit={handleSubmit}>
                  <div className=' flex flex-col  gap-5 justify-between'>
                    <input
                      type='text'
                      placeholder='Course title'
                      className='input-text'
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          courseTitle: e.target.value,
                        });
                      }}
                      required
                      id='courseTitle'
                    />
                    <input
                      type='text'
                      placeholder='Course code'
                      className='input-text'
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          courseCode: e.target.value,
                        });
                      }}
                      required
                      id='courseCode'
                    />
                    <input
                      type='text'
                      placeholder='Department'
                      className='input-text'
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          department: e.target.value,
                        });
                      }}
                      required
                      id='department'
                    />
                  </div>
                  <div className=' flex flex-col gap-5 w-full'>
                    <div className=' mt flex justify-end border-[2px] w-full'>
                      <input
                        type='file'
                        accept='image/*'
                        name=''
                        id=''
                        onChange={(e) => setFile(e.target.files[0])}
                        className=' input-file w-[10rem] '
                      />
                      <button
                        className='btn-inputFile'
                        onClick={handleUploadImage}>
                        Upload
                      </button>
                    </div>
                    <p className='text-center flex justify-center bg-slate-400'>
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt=''
                          className='w-[full] object-cover h-[10rem]'
                        />
                      )}
                    </p>
                  </div>

                  <div className=' flex justify-end'></div>
                  <button className=' btn'>Post</button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className='dash-profile'>
    //   <div className='dash-profile-card-div'>
    //     <div className='dash-profile-card'>
    //       <h1>Profile</h1>
    //       <div className='profile-details-container'>
    //         <div className='img-details'></div>
    //         <div className='profile-details'>
    //           <div className=' '>
    //             <form onSubmit className='search-form-div font-semibold'>
    //               <div className=' search-form-div-items'>
    //                 <label> Fullname/username: </label>
    //                 <input
    //                   type='text'
    //                   id='username'
    //                   placeholder='fullname/username'
    //                 />
    //               </div>

    //               {/* <button className='btn btn-search'>Search</button> */}
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
