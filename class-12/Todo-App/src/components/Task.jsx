
import React, { useState } from 'react';
import { myDatabase } from '../supabase';

function TaskInput({refreshList}) {
   const [userText, setUserText] = useState('');


   
    async function saveToCloud() {
        
        const cleanText = userText.trim();
        if (cleanText === '') {
            alert('Please enter a task before saving.');
            return;
        }

        await myDatabase 
        .from('todos')
        .insert([{ title: cleanText}])

        setUserText('   ');
        refreshList();
       
           
    }

    return (
        <div className="input-box-wrapper">
            <input onChange={(event) =>  setUserText(event.target.value)} value={userText} type="text" placeholder="Add a new task..." className="task-input" />
            <button onClick={saveToCloud} className='save-btn'>Add Task</button>

        </div>
    )
}

export default TaskInput;