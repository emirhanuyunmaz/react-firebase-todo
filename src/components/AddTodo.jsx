import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { updateContext } from '../context/updateContext';

function AddTodo() {

    const [todoText,setTodoText] = useState("")
    const getUpdateData = useContext(updateContext)
    console.log(getUpdateData.updateData !== "")

    useEffect(() => {
        getData()
    },[getUpdateData])

    async function getData(){
        if(getUpdateData.updateData !== ""){
            const q = query(collection(db, "todos"), where("todoID", "==", getUpdateData.updateData))
            let todoId=-1
            const querySnapshot = await getDocs(q)
            //Veriyi bulma işlemi.
            await querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              todoId=doc.id
              setTodoText(doc.data().text)
            });
        }
    }


    //Veri ekleme işlemi için yapılacak işlemler.
    async function onSubmit(event){
        event.preventDefault()

        try {
            const docRef = await addDoc(collection(db, "todos"), {
                text:todoText,
                todoID: uuidv4(),
                completed : false 
            });
            console.log("Document written with ID: ", docRef.id);
            } catch (e) {
            console.error("Error adding document: ", e);
            }
            finally{
                setTodoText("")
            }
    }

    async function onUpdate(event) {
        event.preventDefault()

        console.log(getUpdateData.updateData)
        const q = query(collection(db, "todos"), where("todoID", "==", getUpdateData.updateData))
        let todoId=-1
        const querySnapshot = await getDocs(q)
       
        //Veriyi bulma işlemi.
        await querySnapshot.forEach((doc) => {
          todoId=doc.id
          console.log(doc.id, " => ", doc.data()) 
        });
        //******* */
        //Veriye ait referans bulunması işlemi
        const cityRef = doc(db, 'todos', todoId)
        //bulunan veriyi değiştirme işlemi.
        await updateDoc(cityRef, {
            text: todoText
        });
        getUpdateData.setUpdateData("")
        setTodoText("")

    }


  return (
    <div>
        <form >
            <div className="mb-3">
                <input type="text" value={todoText} onChange={(event) => setTodoText(event.target.value)} placeholder='Todo' className="form-control" id="todoInput" />
            </div>
            {getUpdateData.updateData === "" ? <button type="submit" onClick={onSubmit} className="btn btn-primary col-sm-12">Submit</button> : <button type="submit" onClick={onUpdate} className="btn btn-primary col-sm-12">Update</button>
}
        </form>
    </div>
  )
}

export default AddTodo
