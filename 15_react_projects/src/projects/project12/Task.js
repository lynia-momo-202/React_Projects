import React from 'react'

function Task(props) {

    const { libelle, complete, handleDelete, handleComplete } = props
    // console.log(props)
    return (
        <>
            <div className='task-item'>
                <span className={`task-name ${complete ? 'complete' : ''}`}>
                    {libelle}
                </span>
                <button className='task-action-btn complete-btn' onClick={handleComplete}>{/*complete ? handleUndo : */}
                    {complete ? 'Undo' : 'Complete'}
                </button>
                <button className='task-action-btn delete-btn' onClick={handleDelete}>
                    delete
                </button>
            </div>
        </>
    )
}

export default Task