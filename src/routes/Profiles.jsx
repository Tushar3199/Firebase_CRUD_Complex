import React,{ useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { firestore } from '../utils/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'


const Profiles = () => {

  
  const[datas, setDatas] = useState([]);
  const fetchUsers = async() =>{
    try{
      const docRef = collection(firestore, "users");
      const querySnapshot = await getDocs(docRef);
      const dataList = querySnapshot.docs.map(doc=>({
        id: doc.id,
        ...doc.data()
      }))
      setDatas(dataList)
    }catch(err){console.log(err)}
  };

  useEffect(()=>{
    fetchUsers();
  },[]);


  return (
    <>
      <Navbar/>
      <div className='flex flex-wrap p-5 gap-12 justify-around'>
        {datas.map((val) => {
          return <div key={val.id}>
                  <Link to={`/profiles/${val.id}`}>
                    <div className='flex border-[2px] border-black p-3 rounded-md w-[350px] h-[100px] gap-6 text-center'>
                      <p className='text-red-700 border-r-2'>{val.id}</p>
                      <p className='font-semibold text-lg'>{val.fname}</p>
                    </div>    
                  </Link>
                  
            </div>
          
        })}
      </div>
    </>
  )
}

export default Profiles