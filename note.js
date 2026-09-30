const express = require('express');
const fs = require ("fs");
const app = express();
const port = 3000;
app.use(express.json());
app.get('/api/notes', (req, res) => {
    let notes =[];
    try{
        notes =json.parse( fs.readFileSync("note.json","utf-8"));
    }catch (err){
        notes =[];
    }
    res.status(200).json({massage:"notes fetched successfully",data: notes}); 
    });
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ success: false, message:'Title and content are required!' });
    }
    let notes =[];
    try{
        notes=JSON.parse(fs.readFileSync("note.json","utf-8"));
    }catch(err) {
        notes =[];
    } 
    const newNote = {
        id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
        title: title,
        content: content
    };
    notes.push(newNote);
    fs.writeFileSync("note.json", JSON.stringify(notes,null,2));
    res.status(201).json({success: true,message: 'added ',data: newNote});
});
app.put('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync("note.json", "utf-8"));
    const index = notes.findIndex(n => n.id == req.params.id);
    if (index === -1){
        return res.status(404).json({ success: false, message: 'Note not found' });
    }
    notes[index] = { id: Number(req.params.id), ...req.body };
    fs.writeFileSync("note.json", JSON.stringify(notes, null, 2));

    res.status(200).json({ success: true, message: 'Note updated successfully', data: notes[index] });
});
app.patch('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync("note.json", "utf-8"));
    const note = notes.find(n => n.id == req.params.id);

    if (!note) {
        return res.status(404).json({ success: false, message: 'Note not found' });
    }
    Object.assign(note, req.body);
    fs.writeFileSync("note.json", JSON.stringify(notes, null, 2));

    res.status(200).json({ success: true, message: 'Note patched successfully', data: note });
});
app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync("note.json", "utf-8"));
    const filteredNotes = notes.filter(n => n.id != req.params.id);

    fs.writeFileSync("note.json", JSON.stringify(filteredNotes, null, 2));
    res.status(200).json({ success: true, message: 'Note deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});