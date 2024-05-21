const express=require('express');
const users=require('./MOCK_DATA.json')
const fs=require('fs')
const app=express();
const PORT=4000;

//Middleware
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('Hello World this message is from express');
})

app.get('/users',(req,res)=>{
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.job_title}</li>`).join("")}
    </ul>`
    res.send(html);
})      

//dynamic routing
app.get('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    res.send(user);
})

app.get('/api/users',(req,res)=>{
    return res.json(users);
})

app.post('/api/users',(req,res)=>{
    const body=req.body;
    console.log(body);
    users.push({...body, id: users.length});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        res.json({status: "success" , id: users.length})
    })
    // return error;
})

// app.patch('/api/users:id',(req,res)=>{
//     return res.json({status: "pending"})
// })

// app.delete('/api/users/:id',(req,res)=>{
//     const user = parseInt(req.params.id);
//     const usersid = user.find(item => item.id === user);
  
//     if (usersid !== -1) {
//       // Remove the item from the array
//       user.splice(usersid, 1);
//       res.status(200).json({ message: `Item with id ${user} deleted` });
//     } else {
//       res.status(404).json({ message: `Item with id ${user} not found` });
//     }
//   });



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

