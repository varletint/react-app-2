import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreatePeqie() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const navigate = useNavigate();

  console.log(formData);

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

  // const handleChange = (e) => {
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // };

  return (
    <div
      className='
     p-7 min-h-screen   max-w-[32rem] mx-auto'>
      <h1
        className='
      text-center text-3xl font-semibold uppercase mt-5'>
        Create A <span className=' text-green-500'>Peq</span>
      </h1>
      <div className=''>
        <form
          className=' mt-20
        flex flex-col  gap-5'
          onSubmit={handleSubmit}>
          <div className=' flex flex-col  gap-5 justify-between'>
            <input
              type='text'
              placeholder='Course title'
              className='input-text'
              onChange={(e) => {
                setFormData({ ...formData, courseTitle: e.target.value });
              }}
              required
              id='courseTitle'
            />
            <input
              type='text'
              placeholder='Course code'
              className='input-text'
              onChange={(e) => {
                setFormData({ ...formData, courseCode: e.target.value });
              }}
              required
              id='courseCode'
            />
            <input
              type='text'
              placeholder='Department'
              className='input-text'
              onChange={(e) => {
                setFormData({ ...formData, department: e.target.value });
              }}
              required
              id='department'
            />
          </div>
          <div className=' flex flex-col gap-5 w-fit'>
            <div className=' mt flex border-[2px] w-fit'>
              <input
                type='file'
                accept='image/*'
                name=''
                id=''
                onChange={(e) => setFile(e.target.files[0])}
                className=' input-file w-[10rem] '
              />
              <button className='btn-inputFile' onClick={handleUploadImage}>
                Upload
              </button>
            </div>
            <p className='text-center'>
              {formData.image && (
                <img src={formData.image} alt='' className=' ' />
              )}
            </p>
          </div>

          <div className=' flex justify-end mt-10'></div>
          <button className=' btn'>Post</button>
        </form>
      </div>
    </div>
  );
}
