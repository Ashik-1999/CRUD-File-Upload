import React, { useState } from 'react'
import postService from '../services/documentService'

function AddDocument() {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [boolean, setBoolean] = useState(false)
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        

        formData.append('title', title);
        formData.append('image', image);

        const response = await postService.create(formData);
        console.log(response);
        if (response.data.statusText= "OK") {
            setMessage('Document uploaded successfully!')
        } else {
            setMessage('Document upload failed!')
        }
        e.target.reset();
        setBoolean(true)
    }
    return (
        <>
            <form onSubmit={handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                        Title
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title" type="text" placeholder="Document title" name='title'
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                        Add document
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="image" type="file" name='image'
                        onChange={e => setImage(e.target.files[0])}
                    />
                    {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
                </div>
                <div class="flex items-center justify-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add
                    </button>
                </div>
            </form>
            <p className='text-center text-green-600 text-xl font-semibold' >{message}</p>
        </>
    )
}

export default AddDocument