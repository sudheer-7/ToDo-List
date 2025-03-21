import React, {useEffect, useState} from 'react';
import './App.css';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [isCompleteScreen, setIsComleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [ComplitedTodo, setComplitedTodo] = useState([]);

  const handleAddTodo = () =>{
    let newTodoItem = {
      title : newTitle,
      description : newDescription
    };

    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr))

  };

  const handleDeleteTodo = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index,1);

    localStorage.setItem('todolist', JSON.stringify(reduceTodo));
    setTodos(reduceTodo)
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ComplitedOn = dd + '-' + mm + '-' + yyyy + 'at' + h + ':' + m + ':' + s;
    
    let filteredItem = {
      ...allTodos[index],
      ComplitedOn:ComplitedOn
    }

    let updatedComplitedArr = [...ComplitedTodo];
    updatedComplitedArr.push(filteredItem);
    setComplitedTodo(updatedComplitedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedComplitedArr));
  };

  const handleDeleteCompletedTodo = (index) =>{
    let reduceTodo = [...ComplitedTodo];
    reduceTodo.splice(index,1);

    localStorage.setItem('completedTodos', JSON.stringify(reduceTodo));
    setComplitedTodo(reduceTodo)
  }



  useEffect(()=>{
    let saveTodo = JSON.parse(localStorage.getItem('todolist'));
    let saveCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(saveTodo){
      setTodos(saveTodo);
    }

    if(saveCompletedTodo){
      setComplitedTodo(saveCompletedTodo);
    }
  },[])
  return (
    
      <div className="App">
        <div className="container">
          <div className = "todo-wrapper">
            <div className="row">
              <div className="col-6">
                <div className='todo-body'>
              <div className='app-title'>
                <h1>TODO</h1>
              </div>
              <div className="todo-inputs mt-3">
                            <div className = "todo-input-items">
                                <label>Titel</label>
                                <input type = "text" placeholder = "" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} className="form-control mt-2"/>
                              </div>

                              <div className = "todo-input-items mt-3">
                                <label>Description</label>
                                <textarea type = "text" placeholder = "" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} className="form-control mt-2"></textarea>
                              </div>
                              <div className = "todo-input-items">
                                  <button type = "button" className = "btn btn-primary form-control my-3" onClick={handleAddTodo}>Add</button>
                              </div>
                              </div>

                              
                            
                </div>
              </div>
              <div className="col-6">
                <div className = "todo-completed">
                      <div className='app-title'>
                        <h1>LIST</h1>
                      </div>
                        <div>
                            <div className = "btn-area d-flex gap-3 mt-5">
                            
                                <button className = {`btn btn-danger form-control ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsComleteScreen(false)}>ToDo</button>
                                <button className = {`btn btn-success form-control ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsComleteScreen(true)}>Complited</button>
                            </div>

                            <div className = "todo-list mt-4">
                                
                                {isCompleteScreen=== false && allTodos.map((item, index)=>{
                                    return (
                                      <div className="todo-list-items d-flex justify-content-between mb-4" key={index}>
                                        <div className='list-items'>
                                          <h3>{item.title}</h3>
                                          <p>{item.description}</p>
                                        </div>
                                        <div className="list-icons d-flex gap-3">
                                        <span className="fa fa-trash" aria-hidden="true" onClick={()=>{
                                              handleDeleteTodo(index)
                                            }} ></span>
                                            {/* <button onClick={()=>{
                                              handleDeleteTodo(index)
                                            }} className="btn btn-danger form-control">Delete</button> */}

                                            <span className="fa fa-check-square-o" aria-hidden="true" onClick={()=>{
                                              handleComplete(index)
                                            }}></span>
                                            {/* <button onClick={()=>{
                                              handleComplete(index)
                                            }} className="btn btn-success form-control">Complited</button> */}
                                        </div>
                                      </div>
                                    )
                                })}

                                {isCompleteScreen=== true && ComplitedTodo.map((item, index)=>{
                                    return (
                                      <div className="todo-list-items mb-4 d-flex justify-content-between" key={index}>
                                        <div className='list-items mb-2'>
                                          <h3>{item.title}</h3>
                                          <p>{item.description}</p>
                                          <p>Complited on : {item.ComplitedOn}</p>
                                          
                                        </div>
                                        <div className="list-icons">
                                          <span className="fa fa-trash" aria-hidden="true" onClick={()=>{
                                                handleDeleteCompletedTodo(index)
                                              }} ></span>
                                        </div> 
                                      </div>
                                    )
                                })}
                            </div>
                          
                        </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;