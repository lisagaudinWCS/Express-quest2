
const database = require("./database");

//Express 5 DELETE
const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);
  database
  .query(
    "DELETE FROM users WHERE id = ?",
    [id]
  )
  .then (([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not Found!");
    }
    else {
      res.sendStatus(204);
    }
  })
  .catch((err) => {
    res.status(500).send("Error deleting the user");
  });
};


//Express 4 PUT
const putUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?,  city = ?,  language = ? WHERE id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating the user");
    });
};
//Express 3 POST
const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
  .query(
    "INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", 
    [firstname, lastname, email, city, language]
  )
  .then(([result]) => {
    res.location(`/api/users/${result.insertId}`).sendStatus(201)
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error saving new user");
  });
};

//Express 2 - 6 GET
const getUsers = (req, res) => {
  let sql = "SELECT * FROM users";
  const sqlValues = [];

  if (req.query.city != null) {
    sql += " WHERE city = ?";
    sqlValues.push(req.query.city);
  }
    if (req.query.language != null) {
      sql += " AND language = ?";
      sqlValues.push(req.query.language);
    }
  else if (req.query.language != null) {
    sql += " WHERE language = ?";
    sqlValues.push(req.query.language);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

//Express 2 GET byId
const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
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
  getUsers,
  getUsersById,
  postUsers,
  putUsers,
  deleteUsers,
};
