import React from 'react'
import Cookies  from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate  = useNavigate()
    const logout = () =>{
        Cookies.remove('jwt')  
        navigate('/')

    }
    return (
        <div>
            <header>
                <nav className="
                    flex flex-wrap
                    items-center
                    justify-between
                    w-full
                    mt-6
                    py-4
                    md:py-0
                    px-4
                    text-lg text-gray-700
                    bg-blue-500
                    ">


                    <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
                        <div className="
                            pt-4
                            text-base text-gray-700
                            md:flex
                            md:justify-between 
                            md:pt-0">

                           
                                <button className="md:p-4 py-2 block hover:text-black text-white" onClick={logout}>Logout</button>
                            
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
