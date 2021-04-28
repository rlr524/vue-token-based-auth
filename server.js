const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const events = require("./db/events.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.json({
		message: "Welcome to the API.",
	});
});

app.get("/dashboard", verifyToken, (req, res) => {
	jwt.verify(req.token, "the_secret_key", (err) => {
		if (err) {
			res.sendStatus(401);
		} else {
			res.json({
				events: events,
			});
		}
	});
});

app.post("/register", (req, res) => {
	if (req.body) {
		const user = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			// Remember in a prod app, we'd hash & salt the password and use an encrypted db or even more likely use an auth integration from Firebase, etc.
		};
		const data = JSON.stringify(user, null, 2);
		var dbUserEmail = require("./db/user.json").email;
		var errorsToSend = []; // Array to collect errors

		if (dbUserEmail === user.email) {
			// Check to see if the email already exists in the db
			errorsToSend.push("An account with this email already exists.");
		}
		if (user.password.length < 6) {
			// Validate that the password is at least six chars;
			// TODO: Add some Regex to accept only specific chars, not permit repeated
			errorsToSend.push(
				"Password must be at least six characters including capital or lowercase letters, numbers, or symbols"
			);
		}
		if (errorsToSend.length > 0) {
			res.status(400).json({ errors: errorsToSend });
		} else {
			fs.writeFile("./db/user.json", data, (err) => {
				if (err) {
					console.log(err + data);
				} else {
					const token = jwt.sign({ user }, "the_secret_key");
					// In a prod app, the secret key will be an env variable
					res.json({
						token,
						email: user.email,
						name: user.name,
					});
				}
			});
		}
	} else {
		res.sendStatus(400);
	}
});

app.post("/login", (req, res) => {
	const userDB = fs.readFileSync("./db/user.json");
	const userInfo = JSON.parse(userDB);
	if (
		req.body &&
		req.body.email === userInfo.email &&
		req.body.password === userInfo.password
	) {
		const token = jwt.sign({ userInfo }, "the_secret_key");
		res.json({
			token,
			email: userInfo.email,
			name: userInfo.name,
		});
	} else {
		res.status(401).json({ error: "Invalid login. Please try again." }); // Send error if credentials don't match a user in the db
	}
});

// Middleware
function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(401);
	}
}

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
