import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCamera } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import postServices from "../../services/documentService";
import {FiEdit} from 'react-icons/fi'
import axios from "axios";

function EditProfile() {

  const navigate = useNavigate()
  const [profileImage, setprofileImage] = useState({});
  const [values, setValues] = useState({title: "",});
  const [data, setData] = useState({});
  const [message, setMessage] = useState('')
  const { state } = useLocation();
  const [boolean, setBoolean] = useState(false)
  

  useEffect(() => {  
    fetchDocument(state);
  },[boolean]);
  
  const fetchDocument = async (id) => {
     setData(await postServices.getPostForEdit(id)); 
  };

  

 const submitImage = async(e) =>{
    e.preventDefault()
    let fd = new FormData()
    fd.append("image",profileImage.image)
    const postId = data.data._id
    const response = await postServices.editImage(fd,postId)
    setBoolean(boolean ? false : true)
    setprofileImage({})
    
    if (response.data.statusText= "OK") {
      setMessage('Document updated successfully!')
      console.log(message)
  } else {
      setMessage('Document update failed!')
  }
  }

  const submitHandler = async(e) =>{
    const postId = data.data._id
   
    e.preventDefault()
    const response = await postServices.editData(values,postId)
    if (response.data.statusText= "OK") {
      setMessage('Details updated successfully!')
      console.log(message)
  } else {
      setMessage('Details update failed!')
  }
  }

 

  return (
   <div className="modalBackground">
      { data.data && <div className= "modalContainer" >
        <div className="titleCloseBtn">
           <p className='text-center text-green-600 text-xl font-semibold' >{message}</p>
        </div>
        <div className="title">
          <section className="w-64 mt-3 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
            <form onSubmit={submitImage}>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400">
                

                    
                    <label htmlFor="addImage" className='cursor-pointer'> <AiFillCamera size={25}/></label>
                     
                    
                
                  <input
                    type="file"
                    id="addImage"
                    name="image"
                    className="hidden"
                    onChange={(e) =>
                      setprofileImage({
                        ...profileImage,
                        [e.target.name]: e.target.files[0],
                      })
                    }
                  />
                </span>
                {profileImage.image && (
                  <button
                    className="bg-emerald-400 p-1 text-sm border rounded-lg"
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </div> 
              <div className="mt-2 w-fit mx-auto">
              <img src={data.data.fileExt == "pdf" ? "https://play-lh.googleusercontent.com/1EgLFchHT9oQb3KME8rzIab7LrOIBfC14DSfcK_Uzo4vuK-WYFs9dhI-1kDI7J0ZNTDr" : 
                        `http://localhost:4000/document/${data.data.image}`} className= "object-cover h-[130px] w-[130px]"  />
              </div>
              <div className="mt-8 ">
                { profileImage.image ? <h6 className="text-white text-center font-bold  tracking-wide">{profileImage.image.name}</h6> :
                 <h6 className="text-white text-center font-bold  tracking-wide">{data.data.image}</h6>}
              </div>
            </form>
          </section>
        </div>
        <div className="body">
          <form className="mt-6" onSubmit={submitHandler}>
            <div className="mb-2">
              <input
                type="text"
                defaultValue={data.data.title}
                placeholder="Title..."
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="title"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
          
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-30 px-4   tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="footer">
          <button id="cancelBtn" onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>}
    </div>

  );
}

export default EditProfile;
