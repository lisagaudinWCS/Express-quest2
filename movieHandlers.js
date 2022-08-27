
const database = require("./database");

//Express 3 POST
const postTest = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database
  .query(
    "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
    [title, director, year, color, duration]
  )
  .then(([result]) => {
    res.location(`/api/movies/${result.insertId}`).sendStatus(201)
  }) 
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error saving the movie");
  });
};
// EXPRESS QUEST 02 GET 
const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
// EXPRESS QUEST 02 GET BY ID
const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      }
      else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postTest,
};
