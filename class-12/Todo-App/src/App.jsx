
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Task from './components/Task';
import { myDatabase } from './supabase';


function App() {

    const [tasks, setTasks] = useState([]); 

    async function loadFromCloud() {
        const response = await myDatabase
            .from('todos')
            .select('*');

        if (response.data) {
            setTasks(response.data);
        }

    }

      useEffect(() => {
            loadFromCloud();
        }, []);

    return (
        <div className="app-wrapper">
            <Header />
            
            <main className='main-container'>

                 <Task refreshList={loadFromCloud} />

                <h2>tasks:</h2>
                   <ul className='todo-list-container'>
                        {tasks.map((item) => (
                            <li key={item.id} className='todo-card'>
                              
                                {item.t}
                            </li>
                        ))}

                   </ul>
            </main>

      
            <Footer />
        </div>
    );
}
export default App;
