import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import postService from '../services/documentService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Signup() {


    const navigate = useNavigate();

    const [boolean, setBoolean] = useState(false)
    const passwordView = () => {
      boolean ? setBoolean(false) : setBoolean(true)
    }
  
    const [values, setValues] = useState({
      fullname: '',
      email: '',
      password: '',
  
    })
    const [formErrors,setFormErrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    const id = 'secret'
    const id2 = 'secret'
  
  
  
  
    const submitHandler = async (e) => {
      e.preventDefault()
     setFormErrors( validate(values));
     setIsSubmit(true)  
    }
  
    useEffect(()=>{
     
      if(Object.keys(formErrors).length === 0 && isSubmit){
        try {

         postService.userSignUp(values).then(({data})=>{
            if (data) {
              if (data.userExist) {
                toast.error(`user already exists `, {
                  toastId: id,
                  theme: "light"
                });
              } else {
      
                toast.success(`Successfully registered. Please login `, {
                  toastId: id2,
                  theme: "light"
                });
      
                function myFunction() {
                  const timeout = setTimeout(alertFunc, 5000);
                }
                function alertFunc() {
                  navigate('/')
                }
                myFunction();
      
              }
            }
         })
           
            
      
        } catch (err) {
          console.log(err);
        }
        console.log("entered")
      }
    },[formErrors])
  
  
    const validate = (fromValues) =>{
      const errors = {}
      const Nameregex = /^[a-zA-Z0-9 ]*$/
      
      const emailregex =   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      
  
      
  
      if(!fromValues.fullname){
        errors.fullname = "Full name is required"
      } else if(!Nameregex.test(fromValues.fullname)){
        errors.fullname = "Enter a valid name"
      }
  
      if(!fromValues.email){
        errors.email = "Email  is required"
      }else if(!emailregex.test(fromValues.email)){
        errors.fullname = "Enter a valid email"
      }
  
    
      if(!fromValues.password){
        errors.password = "password is required"
      }
  
      return errors
    }
  
  
    return (
      <div>
       
  
         <section className="bg-gray-50 min-h-screen flex items-center justify-center">
          {/* login container */}
          <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
            {/* form */}
            <div className="md:w-1/2 px-8 md:px-16">
              <h2 className="font-bold text-2xl text-[#002D74] text-center">User Sign up</h2>
              <p className="text-xs mt-4 text-[#002D74] text-center">, Don't have an account, signup here</p>
              <form onSubmit={(e) => { submitHandler(e) }} className="flex flex-col gap-5 mt-4">
                <div>
                  <input className="  rounded-xl border w-full" type="text" name="fullname" placeholder="Full name" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                  <p className='text-red-600'>{ formErrors.fullname }</p>
                </div>
                
                <div>
                  <input className=" rounded-xl border w-full" type="email" name="email" placeholder="Email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                  <p className='text-red-600'>{ formErrors.email }</p>
                </div>
                
               
                
                <div className="relative">
                  <input className=" rounded-xl border w-full" type={boolean ? "text" : "password"} name="password" placeholder="Password" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                  {!boolean && <svg onClick={passwordView} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>}
                  {boolean && <svg onClick={passwordView} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>}
                  <p className='text-red-600'>{ formErrors.password }</p>
                </div>
                
                <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Sign up</button>
              </form>
  
  
              <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                <p>Already have an account?</p>
                <button onClick={() => navigate('/login')} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button>
              </div>
            </div>
            {/* image */}
            <div className="md:block hidden w-1/2">
              <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />
            </div>
          </div>
        <ToastContainer />
         
  
        </section>
      </div>
  )
}

export default Signup
