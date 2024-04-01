import { atom, selector } from 'recoil';

export const todos = atom({
    key:"todos",
    default:[]
})

export const filterValue = atom({
    key:"filterValue",
    default: ""
})

export const displaySelecctor = selector({
    key: "displaySelecctor",
    get: ({get})=>{
        const todoList = get(todos);
        const inputFilter = get(filterValue).split(" ");
        return todoList.filter((todo)=>{
            for(let i=0; i<inputFilter.length ; i++){
                if(!todo.title.includes(inputFilter[i])){
                    return false;
                }
            }
            return true;
        })
    }
}) 