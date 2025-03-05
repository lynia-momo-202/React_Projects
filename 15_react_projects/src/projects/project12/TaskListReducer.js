import React, { useReducer, useState } from 'react'
import './App.css'
import Task from './Task'
const initialState =[]
function reducer(state,action){
    switch (action.type) {
        case 'add-task':
            return [...state,createNewTask(action.payload.name)]
        default:
            return state;
    }
}

function createNewTask(name){
    return {id:Date.now(),name:name,complete:false}
}

function TaskListReducer() {
    const [state,dispatch] = useReducer(reducer,initialState);
    const [taskName, setTaskName] = useState('')
// console.log(state)
    const hamdleSubmit = (e) => {
        e.preventDefault();
        dispatch({type:'add-task',payload:{name:taskName}})
        
    }

    const handleDelete = (id) => {
     
    }

    const handleComplete = (id) => {
        
    }

    return (
        <div className='task-list-container'>
            <form className='task-form task-item ' onSubmit={(e) => hamdleSubmit(e)}>
                <label className='task-label' htmlFor='task-input'>Add Task</label>
                <input
                    name='task'
                    className='task-input'
                    placeholder='Enter your task'
                    value={taskName}
                    onChange={(e)=>setTaskName(e.target.value)}
                />
                <button className='task-submit-btn' type='submit'>Add</button>
            </form>
            <div className='task-list'>
                {
                    state.map((task) => (
                        <Task
                            key = {task.id}
                            libelle = {task.name}
                            complete = {task.complete}
                            handleDelete = {() => handleDelete(task.id)}
                            handleComplete = {() => handleComplete(task.id)}
                        />
                    )
                    )
                }
            </div>
        </div>
    )
}

export default TaskListReducer