import './App.css'
import addLogo from './assets/plus.png'
import deleteLogo from './assets/bin.png'
import completeLogo from './assets/check.png'

const todos = [{
  "id":1,
  "title":"Go to Gym",
  "description" : "Go to gym by sunday",
  "completed":true
},{
  "id":2,
  "title":"Go to Gym",
  "description" : "Go to gym by sunday",
  "completed":true
},{
  "id":3,
  "title":"Go to Gym",
  "description" : "Go to gym by sunday",
  "completed":false
},{
  "id":4,
  "title":"Go to Gym",
  "description" : "Go to gym by sunday",
  "completed":true
},{
  "id":5,
  "title":"Go to Gym",
  "description" : "Go to gym by sunday",
  "completed":false
}]

function App() {
  return (
    <>
      <h1>Todo App</h1>
      <InputTodo />
      <DisplayTodo />
    </>
  )
}

function InputTodo(){
  return(
    <div className='input-todo'>
      <input type="text" placeholder='Title' />
      <input type="text" placeholder='Description' />
      <button><img src={addLogo} alt="add-toddo" /></button>
    </div>
  )
}

function DisplayTodo(){
  return(
    <div className='todo-list'>
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th style={{
            backgroundColor:"transparent",
            textAlign: 'left',
          }}><input style={{
            padding:"10px",
            border: "1px solid gray",
            borderRadius: "5px"
          }} type="text" placeholder='Search' /></th>
        </tr>
      {todos.map((todo)=>{
        return(
          <tr key={todo.id} style={{textDecoration : todo.completed ? "line-through" : "none" }}>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td style={{backgroundColor : "transparent" , textAlign:"left"  }}>
              <button><img src={deleteLogo} alt="delte-todo" /></button>
              <button style={{display : todo.completed ? "none" : "inline" }}><img src={completeLogo} alt="delte-todo" /></button>
            </td>
          </tr>
        )
      })}
    </table>
    </div>
  )
}
export default App
