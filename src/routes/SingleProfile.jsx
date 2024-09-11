import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { firestore } from '../utils/firebase'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { Link, useNavigate, useParams } from 'react-router-dom'


const SingleProfile = () => {

  const navigate = useNavigate();
  const {profileID} = useParams();
  const [datas, setDatas] = useState(null);

  const handleBack = () =>{
    navigate("/profiles");
  }

  const fetchSingleUser = async() =>{
    try{
      const docRef = doc(firestore, "users", profileID);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setDatas({
          id: docSnap.id,
          ...docSnap.data()
        })
      }else{console.log("no such document found!!!")}
    }catch(err){console.log(err)}
  }
  
  useEffect(()=>{
    fetchSingleUser();
  },[]);

  const handleDelete = async(id) =>{
    try{
      const docRef = doc(firestore, "users", id);
      await deleteDoc(docRef);
      navigate('/profiles')
    }catch(err){console.log(err)}
  }


  return (
    <>
      <Navbar/>
      <div>
        <button className='m-3' onClick={handleBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#006e21" className="bi    bi-arrow-left-square-fill" viewBox="0 0 16 16">
            <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"/>
          </svg>
        </button>
      </div>
      <div className='flex justify-center h-screen items-center'>
        {datas ? <div className='flex flex-col justify-center gap-5 w-[750px] border border-black rounded-lg text-center '>
          <div>
            <p className='text-red-600'> {datas.id}</p>
            <p>Name:- <span className='font-semibold text-lg'>{datas.fname}</span> </p>
            <p>DOB:- {datas.dob}</p>
            <p>EMAIL-ID:- {datas.email}</p>
            <p>PHONE:- {datas.phone}</p>
            <p>MESSAGE:- {datas.message}</p>
          </div>
          <div className='flex justify-between p-3 bg-gray-800 gap-3 mt-1 rounded-b-lg'>
            <Link to={`/profiles/update/${datas.id}`}>
              <button className='bg-gray-200 p-2 rounded-full hover:bg-blue-600'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
              </button>
            </Link>
            <button className='bg-gray-200 p-2 rounded-full hover:bg-[#c71010]' onClick={()=>handleDelete(datas.id)} >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
              </svg>
            </button>
          </div>
        </div> : <div> No data found </div>}
      </div>
    </>
  )
}

export default SingleProfile