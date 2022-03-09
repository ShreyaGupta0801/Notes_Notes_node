var axios = require("axios");
const USER_API_BASE_URL = "http://localhost:8080/api/v1/user";
const NOTE_API_BASE_URL = "http://localhost:8080/api/v1/note";

var createUser = (user) => {
    return axios.post(USER_API_BASE_URL + "/add", user);
};
var findByUsername = (user) => {
    return axios.post(USER_API_BASE_URL + "/findByUsername", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
};
var findNotesByUser = (user) => {
  return axios.post(NOTE_API_BASE_URL + "/get-all", user,{
    headers: {
      "Content-Type": "application/json",
    },
  });
};
var addNote = (notes) => {
  return axios.post(NOTE_API_BASE_URL + "/add", notes);
};
var updateNote = (noteId, notes) => {
  return axios.put(NOTE_API_BASE_URL + "/" + noteId, notes);
};
var deleteNoteById = (noteId) => {
  return axios.delete(NOTE_API_BASE_URL + "/" + noteId);
};

  


module.exports.createUser = createUser;
module.exports.findByUsername = findByUsername;
module.exports.findNotesByUser = findNotesByUser;
module.exports.addNote = addNote;
module.exports.updateNote = updateNote;
module.exports.deleteNoteById = deleteNoteById;