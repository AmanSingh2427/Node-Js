const fs=require('fs');
// const { readFile } = require('fs/promises');


// Sync...
fs.writeFileSync('./test.txt','Hello this is a file');

//Async...
fs.writeFile('./test1.txt','Hello this is async file',(err)=>{})

const res=fs.readFileSync('./test.txt','utf-8');
console.log(res)

fs.readFile('./test1.txt','utf-8',(err,res)=>{
    if(err){
        console.log('Error',err)
    }
    else{
        console.log(res)
    }
});

// fs append
fs.appendFileSync('./test.txt',`this code need to append again and again ${Date.now()}\n`);

// fs delete
fs.unlinkSync('./test1.txt');

console.log(fs.statSync('./test.txt'));