
//////////////////////// DOM /////////////



// [ html ]  <-- Root Node (grandfather )
//                      |
//          -------------------------
//          |                       |
//       [ head ]                [ body ]  <-- Parent Node (mama/baba)
//                                  |
//                       -----------------------
//                       |                     |
//                    [ h1 ]                [ p ]  <-- Child Nodes (Bache)
//                       |                     |
//               "Hello World"            "Click me" <-- Text Nodes (toys)



// Element Node:  <div>, <h1>, <p>
// Text Node: "Hello World"
// Attribute Node: class, id, src


let heading = document.getElementById("main-heading");
heading.innerText = "Abba Harmonium Bajate The!";
heading.style.backgroundColor = "yellow"; // Background color change
heading.style.fontSize = "40px"; // Size bara kar diya

let image = document.getElementById("my-pic");
image.src = "dog.jpg";

