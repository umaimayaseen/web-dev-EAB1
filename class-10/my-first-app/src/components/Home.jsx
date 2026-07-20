import React,{useEffect, useState} from "react";


function Home() {

    const [count, setCount] = useState(0);
    
   useEffect(() => {
                alert('Girls be focused this is an important topic ')
   }, []);


    return(
        <div style={{padding: '40px', textAlign: 'center'}}>
            <h2> This is our Home Page!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h2>
            <p>we are testing our coding skills</p>


            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)} style={{backg:'#333', color:'white', padding:'15px'}}>
                Click me to update 
            </button>
            
          

        </div>
    )
}
export default Home;

