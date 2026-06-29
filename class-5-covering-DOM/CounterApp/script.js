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

// let heading = document.getElementById("main-heading");
// heading.innerText = "We are practicing DOM Manipulation!";
// heading.style.backgroundColor = "lightblue";
// heading.style.padding = "10px";

// let image = document.getElementById("main-image");
// image.src = "dog.png";

let counterTextNode = document.getElementById("counter-display"); 
let buttonNode = document.getElementById("my-btn");

let count = 0;

buttonNode.addEventListener("click", function() {
    
    count = count + 1;
    counterTextNode.innerText = count;

    if(count === 6 || count === 12 || count === 14) {
         counterTextNode.style.color = "red";
        counterTextNode.innerText = count + " - these are special numbers!";
    }
    else {
         counterTextNode.style.color = "black";
    }
  
});