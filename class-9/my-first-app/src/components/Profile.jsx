import React from "react";

function Profile() {
   const studentList = ["nimra","rabia","anabia","aisha"]
    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Tracked Students List</h2>
       
          <ul >
            {studentList.map((student, index)=> {
                return(
                    <li  key={index}> {student}</li>
                )

            })}
          </ul>
           
        </div>
    );
}

export default Profile;