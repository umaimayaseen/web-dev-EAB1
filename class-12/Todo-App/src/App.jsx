
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Task from './components/Task';
import Auth from './components/Auth';
import { myDatabase } from './supabase';


function App() {

    const [tasks, setTasks] = useState([]); 
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        myDatabase.auth.getSession().then(({data}) => {
            setCurrentUser(data.session);
        });
   
        const {data:checkUser} = myDatabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUser(session);
        });

        return () => checkUser.subscription.unsubscribe();
    }, [])


//   { data: {...}, error: null }.
// { error } likhne se hum Supabase ko bolte hain: "Bade box(database se response) mein se mujhe sirf error wala  packet nikal kar do, taake main check kar sakoon koi masla toh nahi hua

 // {data:{session : userEmail: "..", userPassword: ".." },error: null}


    async function loadFromCloud() {

        if (!currentUser) {
            return;
        }

        const response = await myDatabase
            .from('todos')
            .select('*')
            .eq('user_id', currentUser.user.id);

        if (response.data) {
            setTasks(response.data);
        }

    }
    async function  deleteTask(id) {
        const response = await myDatabase
        .from('todos')
        .delete()
        .eq ('id', id );
        loadFromCloud();
    } 
    async function updateTask(id) {
        const newText = prompt('plz updated your task ');
        
        if(!newText || newText.trim() === '') {
            alert('plz enter your task ');
            return;
        }
        await myDatabase
        .from('todos')
        .update({ title: newText }) 
        .eq('id', id);
        loadFromCloud();
    }

    async function handleLogout() {
        await myDatabase.auth.signOut();
    }

      useEffect(() => {
            if (currentUser) {
                loadFromCloud();
            }

        }, [currentUser]);

    return (


        <div className="app-wrapper">
            <Header />

            {!currentUser ? (
                <Auth />
            ) : (   
            
            <main className='main-container'>

                <div className='user-bar'>
                    <span className='user-email'>Welcome girlyyyy: {currentUser.user.email}</span>
                    <button onClick={handleLogout} className='logout-btn'>Logout</button>
                </div>

                 <Task refreshList={loadFromCloud} userId={currentUser.user.id} />



                <h2>tasks:</h2>
                   <ul className='todo-list-container'>
                        {tasks.map((item) => (
                            <li key={item.id} className='todo-card'>
                              
                                {item.title}
                                     <button onClick={() => deleteTask(item.id)} className='delete-btn'>Delete</button>  
                                     <button onClick={() => updateTask(item.id)} className='edit-btn'>Edit</button>  
         
                            </li>
                        ))}

                   </ul>
            </main>) }
            
         

      
            <Footer />
        </div>
    );
}
export default App;
