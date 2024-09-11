import React, { useState, useEffect } from 'react'
import { firestore } from '../utils/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'


const Updater = () => {

    const navigate = useNavigate();
    const {updateID} = useParams();
    const [formData, setFormData] = useState({
        fname:'',
        dob:'',
        phone:'',
        email:'',
        message:''
    })
    const [datas, setDatas] = useState(null)

    const fetchData = async() =>{
        try{
            const docRef = doc(firestore, "users", updateID);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setDatas({
                    id:docSnap.id,
                    ...docSnap.data()
                });
                setFormData({
                    fname: docSnap.data().fname,
                    dob: docSnap.data().dob,
                    phone: docSnap.data().phone,
                    email: docSnap.data().email,
                    message: docSnap.data().message
                })
                
            }else{console.log("error occured")}
        }catch(err){console.log(err)}
    }

    useEffect(()=>{
        fetchData();
    },[])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const docRef = doc(firestore, "users", updateID)
            await updateDoc(docRef, formData);
            navigate('/profiles');
        }catch(err){console.log(err)}
    }

    const handleCancel = () =>{
        navigate(`/profiles/${updateID}`)
    }

  return (
    <div className='h-screen w-screen bg-cyan-200 flex flex-col gap-8 items-center'>
        <h2 className='font-extrabold text-5xl text-purple-900'>Updated Forms</h2>
        <div className=' bg-white w-[600px] p-5 rounded-xl'>
            {datas ? <div>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fname">Full-Name: </label>
                        <input 
                            type="text" 
                            name="fname" 
                            id="fname" 
                            value={formData.fname}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="fname">DOB: </label>
                        <input 
                            type="date" 
                            name="dob" 
                            id="dob" 
                            value={formData.dob}
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
                        <label htmlFor="message">Full-Name: </label>
                        <textarea  
                            name="message" 
                            id="message" 
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <button className='bg-blue-950 text-white p-2 w-full rounded-md font-bold' type="submit">UPDATE</button>
                        <button className='bg-red-950 text-white p-2 w-full rounded-md font-bold' onClick={handleCancel}>CANCEL</button>
                    </div>
                </form>
            </div> : <div>Loading.....</div>}
        </div>
    </div>
  )
}

export default Updater