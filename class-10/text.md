useEffect( alert("Hi") ) this is a wrong way . we should write this way useEffect(()=>alert("hi"),[])
If you are gonna run this without  Arrow function () => { } It's not gonna wait for anything. Arrow function () => { } lagane ka maqsad hi yeh hota hai ke hum code ko kehte hain: "Abhi mat chalna, jab React kahe tab chalna!

[]
Yeh batata hai ke is callback function ko kab kab chalana hai. Agar khali chorenge [], toh iska matlab hai: "Sirf tab chalo jab component screen par pehli dafa aaye    