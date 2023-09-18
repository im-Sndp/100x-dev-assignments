const { Console } = require('console');
const fs = require('fs');

function processData(data){
  processed_data = "";
  check = false;
  for(var i = 0 ; i < data.length ; i++){
    if (data[i] == " ") {
      if (check == true){
        processed_data += " ";
        check = false; 
      }
    }
    else{
      processed_data += data[i];
      check = true;
    }
  }
  return processed_data;
}

fs.readFile("input.txt","utf-8",(error,data)=>{
    if (error){
        console.log("Error while reading the file.")
    }
    else{
        console.log("File has been read successfully .\nFile content :",data);
      data = processData(data);
      console.log("Updated text :",data);

      fs.writeFile("result.txt",data,"utf-8",error =>{
        if (error){
          console.log("Error while writing the file.");
        }
        else{
          console.log("Data has been written successfully.");
        }
      })
    }
})