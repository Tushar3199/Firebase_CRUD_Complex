import React,{useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../utils/firebase";
import Navbar from '../components/Navbar';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


const RegisterSocial = () => {

    const initialData = {
        fname:'',
        email:'',
        file:null
    }

    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) =>{
        const {name, value, files} = e.target;
        setFormData({
            ...formData,
            [name] : files ? files[0] : value
        });
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const newId = uuidv4();
        try{
            const storageRef = ref(storage, `images/${formData.file.name}`);
            await uploadBytes(storageRef, formData.file);
            const fileUrl = await getDownloadURL(storageRef);

            const docRef = doc(firestore, "userSocial", newId);
            await setDoc(docRef,{
                id: newId,
                fname: formData.fname,
                email: formData.email,
                file: fileUrl
            })
            // await addDoc(collection(firestore, "userSocial"),{
            //     fname:formData.fname,
            //     email:formData.email,
            //     file: fileUrl
            // })
        }catch(err){console.log(err)}
    }

  return (
    <>
        <Navbar />
        <div className='flex flex-col items-center mt-5'>
            <h2 className='text-purple-900 font-extrabold text-5xl m-4'>Welcome to Social Media !</h2>
            <form onSubmit={handleSubmit} className='w-[600px] border border-black rounded-xl p-4 flex flex-col gap-3'>
                <div>
                    <label htmlFor="fname">Name</label>
                    <input 
                        type="text" 
                        name="fname" 
                        value={formData.fname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="file">Image</label>
                    <input 
                        type="file" 
                        name="file" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button className='p-2 bg-purple-900 text-white font-bold text-lg rounded-md w-full mt-3' type="submit">SUBMIT DETAILS</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default RegisterSocial