import { useState } from "react"
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { todos , displaySelecctor , filterValue } from './store/atom/todos';

function App() {
  return (
    <>
    <RecoilRoot>
    <AddTodo />
    <Filter />
    <DisplayTodo />
    </RecoilRoot>
    </>
  )
}

function AddTodo(){
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  const setTodos = useSetRecoilState(todos);

  return(
    <div>
      <input type="text" placeholder="Title" onChange={(e)=> setTitle(e.target.value)} />
      <input type="text" placeholder="description" onChange={(e)=> setDescription(e.target.value)} />
      <button onClick={()=>{
        setTodos(todos => [...todos,{
          "title":title,
          "description":description
        }])
      }}>Submit</button>
    </div>
  )
}

function DisplayTodo(){
  const todoList = useRecoilValue(displaySelecctor);

  return(
    <div>
      {
        todoList.map((todo)=>{
          return(
            <div>
              <span>{todo.title}</span>
              <span>{todo.description}</span>
            </div>
          )
        })
      }
    </div>
  )
}

function Filter(){
  const setFilterValue = useSetRecoilState(filterValue);
  return(
    <div>
      <input type="text"  placeholder="Filter value" onChange={e => setFilterValue(e.target.value)}/>
    </div>
  )
}
export default App
