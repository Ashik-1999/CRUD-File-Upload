import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import postServices from '../services/documentService';
import {saveAs} from 'file-saver'
import axios from 'axios';
import {RiDeleteBin6Line} from 'react-icons/ri'



function GetDocument(props) {
 

    const [documents, setDocuments] = useState([]);
    const [boolean,setBoolean] = useState(false)
    const [imageView,setImageView] = useState()

    const navigate = useNavigate()


    const fetchDocuments = async() => {
         setDocuments(await postServices.getPost());
    }

    useEffect(() => {
        fetchDocuments();
    },[props.data,boolean])

   const deleteFile = async(id) =>{
    
    const {data} =   await postServices.deletePost(id)
    setBoolean(!boolean ? true : false)
   }

   const viewImage = (filename) =>{
    setImageView(filename)
  }



   
  return (
    
     
      <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        {documents.data != undefined && documents.data.length > 0 && (
              
           <div className="overflow-hidden">
            <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                  SI No. 
                </th>
                <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                  Document 
                </th>
                <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                  Document title
                </th>
                <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                   Date
                </th>
                <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                   Time
                </th>
                <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                   Last Update
                </th>
                <th scope="col" className="text-md text-center font-medium text-gray-600 px-6 py-4 text-left">
                   Handle
                </th>
              </tr>
            </thead>
            <tbody>
                  {
                    documents.data.map((element,i) => (
                        <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>
                    <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-nowrap ">
                     { 
                     
                      
                      <a href={`http://localhost:4000/document/${element.image}`} target = '_blank'>
                        <img src={element.fileExt == "pdf" ? "https://play-lh.googleusercontent.com/1EgLFchHT9oQb3KME8rzIab7LrOIBfC14DSfcK_Uzo4vuK-WYFs9dhI-1kDI7J0ZNTDr" : 
                        `http://localhost:4000/document/${element.image}`} className= "object-cover h-[100px] w-[100px]"  />
                      </a> 
                     
                     }

                    </td>
                    {imageView != element.image && <> <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                       {element.title}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {element.date}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {element.time}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                      {element.lastUpdate ? element.lastUpdate : "No recent updates"}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                    {/* <button onClick={() => handleDownload(element.image)} download class="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button> */}
                    <button class="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={()=>deleteFile(element._id)}>Delete</button>
                    
                    <button
                      className="bg-blue-800 hover:bg-blue-600 ml-4 text-white font-bold py-2 px-4 rounded"
                      onClick={()=>navigate('/edit-post',
                      {state:element._id}
                      )}
                      >
                       Update
                    </button>
                    
                    </td> </>}
                    </tr>
                    ))
                  }
            </tbody>
          </table>
        </div>

        )}
      </div>
    </div>
  </div> 

   

  )
}

export default GetDocument