import React, { useState } from 'react'
import './App.css'
import Task from './Task'

function TaskList() {

    // const[task,setTask]=useState({
    //     id:'',
    //     libelle:'',
    //     delete:false,
    //     termine:false,
    // })
    const [taskList, setTaskList] = useState([])

    const hamdleSubmit = (t) => {
        t.preventDefault()
        // console.log(new FormData(t.target))
        const newTask = new FormData(t.target)
        const libelle = newTask.get('task')
        const taskListCopy = [...taskList]
        const task = {
            id: taskListCopy.length,
            libelle: libelle,
            complete: false,
        }
        taskListCopy.push(task)
        // console.log(taskListCopy)
        setTaskList(taskListCopy)
    }

    const handleDelete = (id) => {
        const taskListCopy = [...taskList]
        const tackUpdate = taskListCopy.filter(t => t.id !== id);
        setTaskList(tackUpdate);
    }

    const handleComplete = (id) => {
        const taskListCopy = [...taskList]
        // console.log(taskListCopy)
        const tackToChangeState = taskListCopy.filter(t => t.id === id);
        const tack = tackToChangeState[0]
        tack.complete = !tack.complete
        taskListCopy[tack.id]= tack
        setTaskList(taskListCopy)
        // console.log(tack)
    }

    return (
        <div className='task-list-container'>
            <form className='task-form task-item ' onSubmit={(e) => hamdleSubmit(e)}>
                <label className='task-label' htmlFor='task-input'>Add Task</label>
                <input
                    name='task'
                    className='task-input'
                    placeholder='Enter your task'
                />
                <button className='task-submit-btn' type='submit'>Add</button>
            </form>
            <div className='task-list'>
                {
                    taskList.map((task) => (
                        <Task
                            key = {task.id}
                            libelle = {task.libelle}
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

export default TaskList