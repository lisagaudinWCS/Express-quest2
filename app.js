require("dotenv").config();

const express = require("express");


const app = express();
// hyper important pour qu'express puisse lire des requetes format json
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
// MOVIES
const { validateMovie } = require("./validator.js");

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

//Express 3 POST
app.post("/api/movies", validateMovie, movieHandlers.postTest);

//Express 4 PUT
app.put("/api/movies/:id", validateMovie, movieHandlers.putMovies);

//Express 5 DELETE
app.delete("/api/movies/:id", movieHandlers.deleteMovies);

//USERS

const { validateUser } = require("./validator.js");

const usersHandler = require("./usersHandler");

app.get("/api/users", usersHandler.getUsers);
app.get("/api/users/:id", usersHandler.getUsersById);

//Express 3 POST
app.post("/api/users", validateUser, usersHandler.postUsers);

//Express 4 PUT
app.put("/api/users/:id", validateUser, usersHandler.putUsers);

//Express 5 DELETE
app.delete("/api/users/:id", usersHandler.deleteUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
