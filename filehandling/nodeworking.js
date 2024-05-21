const fs=require('fs');
const os=require('os');

console.log(os.cpus)

console.log('1');
//Blocking
// const result=fs.readFileSync('test.txt','utf-8');
// console.log(result);

//Non-Blocking
fs.readFile('test.txt','utf-8',(err,res)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(res);
    }
})

console.log('2');
console.log('3')