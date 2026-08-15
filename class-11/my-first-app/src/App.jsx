import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskInput from './components/TaskInput';
import Auth from './components/Auth';
import { myDatabase } from './supabaseClient';

function App() {
  // 1. Easy State Names for Kids
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Logged in user memory box

  // 2. Check if User is Logged In or Out
  useEffect(() => {
    // Page load hone par check karo
    myDatabase.auth.getSession().then(({ data }) => {
      setCurrentUser(data.session);
    });

    // Jab bhi koi Login ya Logout kare, fawran memory update karo
    const { data: checkUser } = myDatabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session);
    });

    return () => checkUser.subscription.unsubscribe();
  }, []);

  // 3. Cloud se sirf apne tasks lao
  async function loadFromCloud() {
    // Agar koi user login nahi hai, toh aage mat jao
    if (!currentUser) return;

    const response = await myDatabase
      .from('todos')
      .select('*')
      .eq('user_id', currentUser.user.id); //  Sirf mere ID wale tasks!

    if (response.data) {
      setTasks(response.data);
    }
  }

  // Jab bhi logged-in user change ho, tasks reload karo
  useEffect(() => {
    if (currentUser) {
      loadFromCloud();
    } else {
      setTasks([]); // Logout par screen clear
    }
  }, [currentUser]);

  // 4. Delete Task
  async function deleteTask(id) {
    const response = await myDatabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (response.error) {
      alert("Error deleting task: " + response.error.message);
      return;
    }

    loadFromCloud();
  }

  // 5. Update Task
  async function updateTask(id) {
    const newText = prompt("Enter new task text:");

    if (!newText || newText.trim() === '') return;

    const response = await myDatabase
      .from('todos')
      .update({ title: newText.trim() })
      .eq('id', id);

    if (response.error) {
      alert("Error updating task: " + response.error.message);
      return;
    }

    loadFromCloud();
  }

  // 6. Logout
  async function handleLogout() {
    await myDatabase.auth.signOut();
  }

  return (
    <div className="app-wrapper">
      <Header />

      <main className="main-container">
        {/* AGAR USER LOGGED IN NAHI HAI -> SHOW LOGIN SCREEN */}
        {!currentUser ? (
          <Auth />
        ) : (
          /* AGAR USER LOGGED IN HAI -> SHOW PRIVATE APP */
          <>
            <div className="user-bar">
              <span>👤 Welcome: <strong>{currentUser.user.email}</strong></span>
              <button onClick={handleLogout} className="logout-btn">
                Logout 🚪
              </button>
            </div>

            {/* Pass Roll Number ID to TaskInput */}
            <TaskInput refreshList={loadFromCloud} userId={currentUser.user.id} />

            <h2>My Tasks:</h2>

            <ul className="todo-list-container">
              {tasks.map((item) => (
                <li key={item.id} className="todo-card">
                  <span> {item.title}</span>

                  <div className="button-group">
                    <button onClick={() => updateTask(item.id)} className="edit-btn">
                      ✏️ Edit
                    </button>
                    <button onClick={() => deleteTask(item.id)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;