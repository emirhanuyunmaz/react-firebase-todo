import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { IoTrashBin } from "react-icons/io5";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { updateContext } from '../context/updateContext';



function AllTodo() {
    const [todoList,setTodoList] = useState([])
    
    const getUpdateDate = useContext(updateContext)

    function handleClickDelete(todoID){
        //console.log("ID:",todoID)
        deleteTodo(todoID)
    }

    function handleClickUpdate (todoID){
        getUpdateDate.setUpdateData(todoID)
    }

    async function getData(){
        const querySnapshot = await getDocs(collection(db, "todos"));
        let todos = []
        querySnapshot.forEach((doc) => {
            todos.push(doc.data())
        })
        setTodoList(todos)
    }

    //Burada yapılan işlem sayesinde id si uyan veri bulunarak silinme işlemi yapılmaktadır.
     async function deleteTodo(todoID){
        const q = query(collection(db, "todos"), where("todoID", "==", todoID))
        let todoId=0
        const querySnapshot = await getDocs(q)
        //Veriyi bulma işlemi.
        querySnapshot.forEach((doc) => {
          todoId=doc.id
          console.log(doc.id, " => ", doc.data()) 
        });

        await deleteDoc(doc(db, "todos", todoId))//Veriyi silme işlemi
        
     }
    useEffect(() => {
        getData()
    },[todoList])


  return (
    <>{todoList.length !==0 ? <div className='mt-3'>
        <div className="card ">
            {todoList.map((item) => (
                (<div key={item.todoID} className="m-1 card-body d-flex justify-content-between">
                        {item.text}
                        <span>
                        <button  onClick={() => handleClickDelete(item.todoID)}><IoTrashBin/></button>
                        <button onClick={() => handleClickUpdate(item.todoID)}><MdOutlinePublishedWithChanges/></button>
                        </span>
                </div>)
                
            ))}
        </div>
    </div> : <></>}
    
    </>
  )
}

export default AllTodo
