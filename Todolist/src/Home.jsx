import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const Home = () => {
    const[todos,settodos]=useState([]);
    const [aedit,setEdit]=useState(null);
    useEffect(()=>{
      axios.get("http://localhost:8000")
      .then((result)=>settodos(result.data))
      .catch((err)=>console.log(err.message))

      

    },[todos,aedit])
    const handleDelete=(id)=>{
      axios.delete('http://localhost:8000/delete/'+id)
      .then((result)=> settodos(todos.filter(todo=>todo._id!=id)))
      .catch((err)=>console.log(err.message))

    }
   
    const handleEdit=(id,task)=>{
      setEdit({id:id,task:task})
     

    }
  return (
   <>
   
   <div className="w-2/4 m-auto">
  <div>
    <h2 className="w-full m-auto font-serif mt-8 py-4 text-center text-2xl font-semibold text-white bg-black">Todolist</h2>
    {<Create aedit={aedit} setEdit={setEdit}/>
      }
  </div>

  <div>
    {todos.length === 0 ? (
      <h2 className="text-center text-gray-500">No Data</h2>
    ) : (
      todos.map((todo, index) => ( 
        <div key={index} className="my-2 p-2 bg-gray-100 border mx-8 flex justify-between items-center  border-gray-300 rounded">
         <div>{todo.task} </div> <div className='flex justify-evenly m-4 gap-4 text-xl'><button className='p-2 w-auto  text-black hover:text-white hover:bg-red-500 text-2xl rounded-md'onClick={()=>handleDelete(todo._id)}><FaTrashAlt /></button> <button className='p-2 w-auto  text-black hover:text-white hover:bg-green-600 text-2xl rounded-md ' onClick={()=>handleEdit(todo._id,todo.task)}><FiEdit /></button></div>

         </div>
      ))
    )}
  </div>
</div>

   </>
  )
}

export default Home