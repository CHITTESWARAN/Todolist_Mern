import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'

const Create = ({aedit,setEdit}) => {
    const [task,settask]=useState("")
      useEffect(()=>{
        if(aedit) 
          {
            settask(aedit.task)
          }
          else{
            settask("") 
          }
      },[aedit])
   
   
    const handleAdd = ()=>{
         if(aedit)
         {
           
          axios.put("http://localhost:8000/update/"+aedit.id,{task:task})
          .then((result)=>console.log(result))
          .catch((err)=>console.log(err));
          settask("")
           setEdit(null);
         }
         else
         {
          
          axios.post("http://localhost:8000/add",{task:task})
          .then((result)=>console.log(result))
          .catch((err)=>console.log(err));
          settask("")
         }
    }
  return (
    <div className="flex justify-between gap-2 text-center p-8 m-10">
    <input type="text"  className="border p-4 m-2 w-full" value={task} placeholder='Enter the Value' onChange={(e)=>settask(e.target.value)}/>
    <button className="bg-green-700 text-white text-lg  rounded-md px-4 m-2" type="button" onClick={handleAdd}>{aedit?"Update":"Add"}</button>
</div>

  )
}

export default Create