const express = require("express");
const Joi = require("joi");
const app = express();


app.use(express.json());

const generes = [
  {
    id: 1,
    name: "horror"
  },
  {
    id: 2,
    name: "drama"
  },
  {
    id: 3,
    name: "romance"
  }
];

app.get("/api/", (req, res) => {
  res.send(generes);
});

app.get("/vividly/generes", (req, res) => {
  res.send(generes);
});

app.get("/vividly/generes/:id", (req, res) => {
  const genere = generes.find(gen => gen.id === parseInt(req.params.id));

  if (!genere)
    return res.status(404).send("No genere found with your Request Id");

  res.send(genere);
});

app.post("/vividly/generes", (req, res) => {
  const { error } = validateGenere(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genere = {
    id: generes.length + 1,
    name: req.body.name
  };

  generes.push(genere);
  res.send(genere);
});

app.put("/vividly/generes/:id", (req, res) => {
  const genere = generes.find(gen => gen.id === parseInt(req.params.id));
  if (!genere)
    return res.status(404).send("No genere found with your Request Id");

  const { error } = validateGenere(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  genere.name = req.body.name;
  res.send(genere);
});

app.delete("/vividly/generes/:id", (req, res) => {
    const genere = generes.find(gen => gen.id === parseInt(req.params.id));
    if (!genere)
      return res.status(404).send("No genere found with your Request Id");
  
    const index = generes.indexOf(genere);
    generes.splice(index,1);
  
   
    res.send(generes);
  });

const port = 8080;
app.listen(port, () =>
  console.log(`Listining on port ${port}----------------->`)
);

const validateGenere = genere => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genere, schema);
};
