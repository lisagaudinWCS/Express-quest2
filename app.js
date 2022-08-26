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

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

//Express 3 POST
app.post("/api/movies", movieHandlers.postTest);

const usersHandler = require("./usersHandler");

app.get("/api/users", usersHandler.getUsers);
app.get("/api/users/:id", usersHandler.getUsersById);

//Express 3 POST
app.post("/api/users", usersHandler.postUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
