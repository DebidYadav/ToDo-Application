import { useState } from 'react'
import './App.css'

interface ToDoItem{
  id : string;
  text : string;
  completed : boolean;
}

const ToDo = () => {
  const [toDo, setToDo] = useState<ToDoItem[]>([]);
  const [newToDo, setNewToDo] = useState('');

  const addToDo = () =>{
    if(newToDo !== ''){
      const generateId = crypto.randomUUID();
      const newToDoItem: ToDoItem = {
        id : generateId,
        text : newToDo,
        completed : false
      };
      setToDo([...toDo, newToDoItem]);
      setNewToDo('');
    }
  }

  const ToggleToDo = (id : string) =>{
    const updatedTodo = toDo.map((todo) => {
     if(todo.id === id){
      todo.completed = !todo.completed;
     }
     return todo;
    });
    setToDo(updatedTodo);
  }

  const RemoveToDo = (id : string) =>{
    const updatedTodo = toDo.filter((todo) => todo.id !== id)
    setToDo(updatedTodo);
  }

  return(
    <div>
      <h1>To Do App</h1>
      <input 
        type="text"
        value={newToDo} 
        onChange={(e) => setNewToDo(e.target.value)}
      />
      <button onClick={addToDo}>Add todo</button>
      <ul>
        {toDo.map((todo) => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked = {todo.completed}
              onChange={() => ToggleToDo(todo.id)}
            />
            <span style={{textDecoration : todo.completed ? 'line-through' : 'none'}}>{todo.text}</span>
            <button onClick={() => RemoveToDo(todo.id)}>Remove ToDo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDo;