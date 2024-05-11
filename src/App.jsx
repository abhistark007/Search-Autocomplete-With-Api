
import { useEffect, useState } from 'react'
import './App.css'
import Suggestions from './components/Suggestions';

function App() {
  const [loading,setLoading]=useState(false);
  const [userData,setUserData]=useState([]);
  const [searchParams,setSearchParams]=useState("");
  const [filteredUsers,setFilteredUsers]=useState([]);
  const [showDropdown,setShowDropdown]=useState(false);


  function handleChange(e){
    const query=e.target.value.toLowerCase();
    setSearchParams(query);

    if(query.length>1){
      const filteredData=userData && userData.length? 
      userData.filter(item=>item.toLowerCase().indexOf(query)>-1)
      :[];
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    }else{

      setShowDropdown(false);
    }
  }


  async function fetchUserData(){
    try{
      setLoading(true);
      const response=await fetch('https://dummyjson.com/users');
      const data=await response.json();
      if(data && data.users && data.users.length){
        setUserData(data.users.map(item=>item.firstName));
        setLoading(false);
      }
      // console.log(data);
    }catch(e){
      setLoading(false);
      console.log("Error Occured Oops!!");
    }
    
  }

  useEffect(()=>{
    fetchUserData()
  },[])

  console.log(userData,filteredUsers);

  return (
   <div className='flex flex-col w-full items-center m-3'>
    <input value={searchParams} onChange={handleChange} type="text" placeholder='search'
    className=''/>
    {
      showDropdown && <Suggestions data={filteredUsers}/>
    }
   </div>
  )
}

export default App
