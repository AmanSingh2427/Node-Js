const express = require('express');
const app = express();
const api = require('./API.json');
const fs = require('fs');
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
    // return res.json({msg:'Hello from Middleware 1'})
    next();
})

app.use((req,res,next)=>{
    console.log("Hello from middleware 2");
    // return res.end('Hello from Middleware 2')
    next();
})

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World, this message is from Express');
});

app.get('/api', (req, res) => {
    return res.json(api);
});

app.get('/api/users', (req, res) => {
    console.log(req.headers)
    const html = `<ul>
    ${api.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const data = api.find((i) => i.id === id);
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ status: 'error', message: 'User not found' });
    }
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg:'All field are required'});
    }
    console.log(body);
    api.push({ ...body, id: api.length });
    fs.writeFile('./API.json', JSON.stringify(api, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        res.json({ status: 'success', id: api.length });
    });
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = api.findIndex((i) => i.id === id);

    if (index === -1) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    api.splice(index, 1);

    fs.writeFile('./API.json', JSON.stringify(api, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        res.json({ status: 'success', message: `User with id ${id} deleted` });
    });
});

app.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = api.findIndex((i) => i.id === id);

    if (index === -1) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Extract query parameters
    const updates = req.query;

    // Update user data with query parameters
    api[index] = { ...api[index], ...updates };

    fs.writeFile('./API.json', JSON.stringify(api, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        res.status(201).json({ status: 'success', message: `User with id ${id} updated`, data: api[index] });
    });
});

app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = api.findIndex((i) => i.id === id);

    if (index === -1) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Update only the fields provided in the request body
    api[index] = { ...api[index], ...req.body };

    fs.writeFile('./API.json', JSON.stringify(api, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        res.status(201).json({ status: 'success', message: `User with id ${id} partially updated`, data: api[index] });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
