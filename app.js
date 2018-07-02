const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser());

const PORT = process.env.PORT || 3000;

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
		res
			.status(404)
			.send({ message: `No pizza with id ${req.params.id} found :(` });
	}
};

const createPizza = (req, res) => {
	let pizza = req.body;

	if (pizza.id && pizza.name && pizza.price) {
		pizzas = [...pizzas, pizza];
		res.send(pizzas);
	} else {
		res.status(400).send({
			message: "The pizza you wanted to create has incomplete information."
		});
	}
};

const updatePizzaById = (req, res) => {
	let originalPizza = pizzas.find(pizza => pizza.id == req.params.id);
	let newPizza = req.body;

	// If pizza to be updated exists, proceed with update
	if (originalPizza) {
		pizzas = pizzas.map(pizza => {
			if (pizza.id == req.params.id) {
				return { ...originalPizza, ...newPizza };
			} else {
				return pizza;
			}
		});
		res.send(newPizza);
	} else {
		res
			.status(404)
			.send({ message: `No pizza with id ${req.params.id} found :(` });
	}
};
const deletePizzaById = (req, res) => {
	let originalNumOfPizzas = pizzas.length;
	pizzas = pizzas.filter(pizza => pizza.id !== req.params.id);

	// Array length would be different if a Pizza was successfully filtered out
	if (pizzas.length !== originalNumOfPizzas) {
		res.send(pizzas);
	} else {
		res
			.status(404)
			.send({ message: `No pizza with id ${req.params.id} found :(` });
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
