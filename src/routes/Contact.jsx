import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../utils/firebase'
import { v4 as uuidv4 } from 'uuid'
import './styles/stylesContact.css'

const Contact = () => {

  const initialData = {
    fname:'',
    dob:'',
    email:'',
    phone:'',
    message:''
  }

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({ ...formData, [name]:value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const newId = uuidv4()
    try{
      const docRef = doc(firestore, "users", newId);
      await setDoc(docRef, {
        id: newId,
        ...formData
      });
      setFormData(initialData);
      
    }catch(err){console.log(err)}
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-col gap-8 items-center mt-24'>
        <h2 className='text-6xl text-purple-700 font-extrabold'>Fill Your Details: </h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 border-[5px] border-black p-5 rounded-xl w-[490px]'>
          <div>
            <label htmlFor="fname">Full Name</label>
            <input 
              type="text"   
              name="fname" 
              id="fname"
              value={formData.fname}
              onChange={handleChange} 
            />
          </div>
          <div>
            <label htmlFor="dob">D.O.B: </label>
            <input 
              type="date"   
              name="dob" 
              id="dob"
              value={formData.dob}
              onChange={handleChange} 
            />
          </div>
          <div>
            <label htmlFor="email">Email-ID: </label>
            <input 
              type="email"   
              name="email" 
              id="email"
              value={formData.email}
              onChange={handleChange} 
            />
          </div>
          <div>
            <label htmlFor="phone">Phone-Number: </label>
            <input 
              type="tel"   
              name="phone" 
              id="phone"
              value={formData.phone}
              onChange={handleChange} 
            />
          </div>
          <div>
            <label htmlFor="message">Message: </label>
            <textarea   
              name="message" 
              id="message"
              value={formData.message}
              onChange={handleChange} 
              className='h-[52px]'
            />
          </div>
          <div>
            <button type='submit' className='bg-purple-700 text-white font-semibold p-2 w-full rounded-lg mt-3'>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Contact