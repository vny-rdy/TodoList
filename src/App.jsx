import { useState,useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem(todos)
    if(todoString){
      let todos = JSON.parse(localStorage.getItem(todos))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    // console.log(`The id is ${id}`)
    // let index = todos.findIndex(item => {
    //   return item.id === id;
    // })
    // console.log(index)
  if(window.confirm("confirm to delete")){
    console.log("user clicked ok");
    let newTodos = todos.filter(item => {
      return item.id !== id;
    }
    );
    setTodos(newTodos)
    saveToLS()
  }
  else{
    console.log("user clicked Cancel")
  }
    

  };
  

  const handleAdd = () => {
    if (todo.trim() === "") {
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS()
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    console.log(`This is id ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='font-bold text-lg'>Add a Todo</h2>
          <div className='flex'>

          <input
            name={todo.id}
            onChange={handleChange}
            value={todo}
            type="text"
            className='w-2/5'
            onKeyPress={handleKeyPress}
            />
          <button
            onClick={handleAdd}
            className='Add bg-slate-600 hover:bg-slate-700 p-2 rounded-lg font-bold text-white mx-6 py-1 text-sm hover:tracking-wider'
            >
            Save
          </button>
            </div>
        </div>

        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length ==0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {
            return (
              <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
                <div className='flex align-middle gap-5'>
                <input
                  onChange={handleCheckBox}
                  type="checkbox"
                  checked={item.isCompleted}
                  name={item.id}
                  id={item.id}
                  />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                  </div>
                <div className="buttons flex">
                  <button
                    onClick={(e)=>handleEdit(e,item.id)}
                    className='hover:tracking-wider bg-slate-600 hover:bg-slate-700 p-2 rounded-lg font-bold text-white mx-6 py-1 text-sm'
                  >
                    Edit
                  </button>
                  <button
                  
                    onClick={(e) => {
                      handleDelete(e, item.id)

                    }
                    
                    }
                    className='hover:tracking-wider bg-slate-600 hover:bg-slate-700 p-2 rounded-lg font-bold text-white py-1 text-sm'
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
