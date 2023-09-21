import { useEffect, useState } from 'react'
// import './App.css'
import axios from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/joy/Checkbox';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';


function App() {
  const [todos, setTodos] = useState([])
  const [title,setTitle] = useState('');
  const [description,setDesctiption] = useState('');

  //Fetch todo
  const fetchTodos = ()=>{
    axios.get("http://localhost:3000/todos").then((response)=>{
      setTodos(response.data);
    })
  }

  const deleteTodo = (todoId)=>{
    axios.delete("http://localhost:3000/todos/"+todoId).then(()=>{
      fetchTodos();
    })
  }

  useEffect(()=>{
    fetchTodos();
  },[]);

  const changeTitle = (event)=>{
    setTitle(event.target.value)
  }

  const changeDescription = (event)=>{
    setDesctiption(event.target.value)
  }

  function Todo(props) {
    return (
      <TableBody>
        <TableCell align="right"><Checkbox variant="soft"/></TableCell>
        <TableCell align="right">{props.title}</TableCell>
        <TableCell align="right">{props.description}</TableCell>
        <TableCell align="right">
          <Button variant="outlined" onClick={()=>{
            deleteTodo(props.id);
          }}>
            Delete
          </Button>
        </TableCell>
      </TableBody>
    )
  }

  return (
            <div style={{display:'flex', justifyContent: 'center'}}>
              <div>
              <div style={{display:'flex', justifyContent: 'center', margin: 10}}>
                <Typography level="h2">Todo App</Typography>
              </div>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <TextField id="outlined-basic" label="Title" variant="outlined" onChange={changeTitle} />
                  <TextField id="outlined-basic" label="Description" variant="outlined" onChange={changeDescription} />
                  <Button variant="contained" onClick={()=>{
                    var data = {
                      title,
                      description,
                      "completed" : false
                    }
                    axios.post("http://localhost:3000/todos",data)
                    fetchTodos();
                  }}>
                    Add
                  </Button>
                </Box>
                <div style={{display:'flex',justifyContent:'center'}}>
                  <div>
                    {todos.map((todo)=>{
                    return (<Todo title={todo.title} description={todo.description} id={todo.id} ></Todo>)
                    })}
                  </div>
                </div>
              </div>
              
            </div>
  )
}

export default App
