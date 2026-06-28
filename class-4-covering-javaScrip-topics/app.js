
// var biscuits = 3 

// while ( biscuits > 0){
//     console.log("nirma ne biscuit khaya! " + biscuits);
//     biscuits--;

// }
// console.log("plate is empty! biscuits khatam ");



// var testAchaHai = false ; 

// do {
//     console.log("ek ghooth pilo")
// } while ( testAchaHai === true)

//  console.log("juice kadwa tha!! eww ");



// var flavors = ["Mango", "Pista"];
// var toppings = ["Jelly", "Nuts"];

// for ( var i = 0; i < flavors.length; i++){
//     for (var j = 0; j < toppings.length; j++){
//         console.log("Combination: " + flavors[i] + " with " + toppings[j]);
//     }
// };


// var myInfo = {
//     name : "umaima", 
//     role : "Teacher",
//     batch : "EAB1"
// };
// console.log("My name is " + myInfo.name);
// console.log("I am a " + myInfo.role + " here!");
// console.log("Our Batch is " + myInfo.batch);

let conditionText = data.current.condition.text.toLowerCase();
            let emoji = "";

            // 2. Check the condition text and assign the right emoji
            if (conditionText.includes("rain") || conditionText.includes("drizzle")) {
                emoji = "🌧️";
            } else if (conditionText.includes("cloud") || conditionText.includes("overcast")) {
                emoji = "☁️";
            } else if (conditionText.includes("sun") || conditionText.includes("clear")) {
                emoji = "☀️";
            } else if (conditionText.includes("snow") || conditionText.includes("blizzard")) {
                emoji = "❄️";
            } else if (conditionText.includes("thunder") || conditionText.includes("storm")) {
                emoji = "⛈️";
            } else if (conditionText.includes("mist") || conditionText.includes("fog")) {
                emoji = "🌫️";
            } else {
                emoji = "✨"; // Default emoji if nothing matches
            }




    //         [ html ]  <-- Root Node (Dada Abu)
    //                  |
    //      -------------------------
    //      |                       |
    //   [ head ]                [ body ]  <-- Parent Node (Ammi/Abba)
    //                              |
    //                   -----------------------
    //                   |                     |
    //                [ h1 ]                [ p ]  <-- Child Nodes (Bache)
    //                   |                     |
    //           "Hello World"            "Click me" <-- Text Nodes (Khilonay)