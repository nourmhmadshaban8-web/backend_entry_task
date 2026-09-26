const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, name: 'nour', email: 'nour@example.com' },
    { id: 2, name: 'mohamed', email: 'mohamed @example.com' }
];

let projects = [
    { id: 1, title: 'website development', status: 'in a progress ' },
    { id: 2, title: 'mobile application', status: 'complete' }
];

app.get('/home', (req, res) => {
    res.json({ message: 'welcome to the page ' });
});

app.get('/user', (req, res) => {
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});


app.get('/project', (req, res) => {
    res.json({
        success: true,
        count: projects.length,
        data: projects
    });
});



app.post('/user', (req, res) => {
    const { name, email } = req.body;


    if (!name || !email) {
        return res.status(400).json({ 
            success: false, 
            message:'user added successfully',
        });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name,
        email: email
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message:'user added successfully ',
        data: newUser
    });
});

app.listen(PORT, () => {
    console.log(`the server is now working : http://localhost:${PORT}`);
});
