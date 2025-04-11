import React, { useState, useRef, useEffect } from "react";
import "./to_do.css";
import { IoMdDoneAll } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function To_do() {

    const [input, setInput] = useState("");
    const [addInput, setaddInput] = useState([]);
    const [editId ,setEditId] =useState(0)
    const [dupli, setDuplicate]=useState("")

    const addTodo = () => {
      const isEmptyOrSpaces = /^\s*$/.test(input)
      if (!isEmptyOrSpaces){

        if ( !addInput.find((x)=> x.list === input )){
            setaddInput([...addInput, {list:input,id:Date.now(),status:false}]);
            setInput("");
        }else{
            
          setDuplicate("duplicate")

        }
      }
      if(editId && !isEmptyOrSpaces && !addInput.find((x)=> x.list === input )){
          const editTodo=addInput.find((x)=> x.id ===editId)
          const updateTodo=addInput.map((x)=>x.id === editTodo.id ?(x={id:x.id,list:input}):(x={id:x.id,list:x.list}))
          setaddInput(updateTodo)
          setEditId(0)
          setInput("")
      }
    };

    const handleSubmin = (e) => {
          e.preventDefault();
        };
        const inputRef = useRef("null");

        useEffect(() => {
          inputRef.current.focus();
    });

    const onDelete=(id)=>{

      setaddInput(addInput.filter((x) => x.id !==id))

      }
  
    const onComplete=(id)=>{
      
      let complete= addInput.map((x)=>{
          if (id===x.id){

              return ({...x,status : !x.status})

          }
          return x
      })
      setaddInput(complete)

    }

    const onEdit=(id)=>{
      const editTodo=addInput.find((to)=>to.id===id)
      setInput(editTodo.list)
      setEditId(editTodo.id)

    }

    const duplicate=()=>{

      setaddInput([...addInput, {list:input,id:Date.now(),status:false}]);
      setInput("");
      setDuplicate("");

    }
  return (
    
    <div className="container">
      <h2>To Do App</h2>
      <form className="form_group" onSubmit={handleSubmin}>
        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter Your Todo..."
          className="form-control"
        />

        <button onClick={dupli ? duplicate: addTodo}>{editId ? "Edit":dupli? "Duplicate ":"Add"}</button>

      </form>

      <div className="list">
        <ul>
          {addInput.map((x,index) => (
            <li className="list-items">
              <div key={index} className="list-item-list" id={x.status ? "items" : ""}>{x.list}</div>
              <span>
                <IoMdDoneAll
                  className="list-item-icon"
                  id="complete"
                  title="Complte"
                  onClick={()=>onComplete(x.id)}
                />
                <FaEdit className="list-item-icon" id="edit" title="Edit" onClick={()=>onEdit(x.id)} />
                <MdDeleteForever
                  className="list-item-icon"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(x.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default To_do;
