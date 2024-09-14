import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, getDocs } from 'firebase/firestore'
import { firestore, storage } from '../utils/firebase'
import { ref } from 'firebase/storage'


const SocialProfiles = () => {
  
    const[datas, setDatas] = useState([]);

    const fetchSocial = async() =>{
        try{
            const docRef = collection(firestore, "userSocial");
            const querySnapshot = await getDocs(docRef);
            const dataList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDatas(dataList)
        }catch(err){console.log(err)}
    }
  
    useEffect(()=>{
        fetchSocial();
    },[])

    return (
    <>
        <Navbar />
        <div>
            { datas.map((val) => {
                return ( <div key={val.id}>
                    <img src={val.file} alt="" className='w-[150px] h-[150px] rounded-full'/>
                    <p>{val.fname}</p>
                    <p>{val.email}</p>
                </div>);
            })}
        </div>
    </>
  )
}

export default SocialProfiles