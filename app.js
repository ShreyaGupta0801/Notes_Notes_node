const express = require('express');
const jwt = require('jsonwebtoken');
var cors = require("cors");
var axios = require("axios");
const NoteService = require("./services/NoteService");
const app = express();


app.use(cors());
app.use(express.json());

app.post("/node-api/user/add", async (req, res) => {
  var user = req.body.user;
  
  NoteService.createUser(user).then((bootResponse) => {
    
    res.json({ message: bootResponse.data });
  });
});
app.post("/node-api/user/login", async (req, res) => {
  var user = req.body;
  var usertoken="";
  console.log("login hit", user);

  jwt.sign({user},"secretKey",{expiresIn:'3000s'},(err,token)=>{
    usertoken=token;
  })
  NoteService.findByUsername(user.username).then( (bootResponse) => {
    console.log(bootResponse.data);
    res.json({ message: bootResponse.data,usertoken });
   
  });
});


app.post("/node-api/notes-by-user", (req, res) => {
  console.log(req.body);
  NoteService.findNotesByUser(req.body).then((bootResponse) => {

    console.log(bootResponse.data);
    res.json({ notesData: bootResponse.data });
  });
});
app.post("/node-api/note", (req, res) => {
  var newNote = req.body;
  console.log("new note",newNote);
  NoteService.addNote(newNote).then((bootResponse) => {
    console.log("boot response", bootResponse.data);
    res.json(bootResponse.data);
  });
});
app.put("/node-api/note/:id", (req, res) => {
  var updatedNote = req.body;
  var id = req.params.id;
  console.log(updatedNote, id);
  NoteService.updateNote(id, updatedNote).then((bootResponse) => {
    res.json(bootResponse.data);
  });
});
app.delete("/node-api/note/:id", (req, res) => {
  console.log(req.params.id);
  NoteService.deleteNoteById(req.params.id).then((bootResponse) => {
    res.json(bootResponse.data);
  });
});

app.listen(5000, () => console.log('Server started on port 5000'));