let fs = require("fs");

fs.readFile("./index.csv",(err,doc)=>{
    console.log(doc)
    let arr = doc.toString().split("\r\n")
    console.log(arr)
})

// for(let i in data[0]){
//     let month = i.split("/");
//     month.pop()
//     let key = month.join("-");
//     cc["driving"][key] = cc["driving"][key] || 0;
//     cc["driving"][key] += parseFloat(data[0][i])*100;
// }
// for(let i in data[1]){
//     let month = i.split("/");
//     month.pop()
//     let key = month.join("-");
//     cc["driving"][key] = cc["driving"][key] || 0;
//     cc["driving"][key] += parseFloat(data[0][i])*100;
// }
// for(let i in data[2]){
//     let month = i.split("/");
//     month.pop()
//     let key = month.join("-");
//     cc["driving"][key] = cc["driving"][key] || 0;
//     cc["driving"][key] += parseFloat(data[0][i])*100;
// }