const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser());

const PORT = 3000;

// // Mock data
let pizzas = [
	{
		id: "1",
		name: "hawaiian",
		price: 10
	},
	{
		id: "2",
		name: "pepperoni",
		price: 9
	}
];

// Handlers
const getPizzas = (req, res) => {
	res.send(pizzas);
};

const getPizzasById = (req, res) => {
	let selectedPizza = pizzas.find(pizza => pizza.id == req.params.id);
	if (selectedPizza) {
		res.send(selectedPizza);
	} else {
		res.send({ message: `No pizza with id ${req.params.id} found :(` });
	}
};

const createPizza = (req, res) => {
	let pizza = req.body;

	if (pizza.id && pizza.name && pizza.price) {
		pizzas = [...pizzas, pizza];
        res.send(pizzas);
	} else {
		res.send({ message: "The pizza you wanted to create is incomplete." });
	}
};

const updatePizzaById = (req, res) => {
	let originalPizza = pizzas.find(pizza => pizza.id == req.params.id);
	let newPizza = req.body;

	//If original pizza can be found
	if (originalPizza) {
		// Create new pizza
		newPizza = { ...originalPizza, ...newPizza };
        
		// Find and replace old pizza in array
		let indexOfPizza = pizzas.indexOf(originalPizza);
		pizzas[indexOfPizza] = newPizza;

		res.send(newPizza);
	} else {
		res.send({ message: `No pizza with id ${req.params.id} found :(` });
	}
};
const deletePizzaById = (req, res) => {
    let toBeDeleted = pizzas.find(pizza => pizza.id == req.params.id);

	//If pizza can be found
	if (toBeDeleted) {

		// Find and delete old pizza in array
		let indexOfPizza = pizzas.indexOf(toBeDeleted);
		pizzas.splice(indexOfPizza, 1)

		res.send(pizzas);
	} else {
		res.send({ message: `No pizza with id ${req.params.id} found :(` });
	}
};

// GET /pizzas
app.get("/pizzas", getPizzas);

// GET /pizzas/:id
app.get("/pizzas/:id", getPizzasById);

// POST /pizzas (add a new pizza)
app.post("/pizzas", createPizza);

// PUT /pizzas/:id (update pizza with id)
app.put("/pizzas/:id", updatePizzaById);

// DELETE /pizzas/:id (delete pizza with id)
app.delete("/pizzas/:id", deletePizzaById);

app.listen(PORT, () => {
	console.log(`App has started on port ${PORT} meowmeow`);
});
