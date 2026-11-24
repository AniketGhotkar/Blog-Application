// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//     res.send("Welcome to Express.js!");
// });

// app.get("/products", (req, res) => {
//     res.send("All Products");
// });

// app.post("/register", (req, res) => {
//     res.send("User Registered");
// });

// app.get("/about", (req, res) => {
//     res.send("About Us");
// });

// app.get("/contact", (req, res) => {
//     res.send("Contacts Us")
// });

// app.get("/products/:id", (req, res) => {
//     res.send(req.params.id);
// });

// app.get("/users/:id", (req, res) => {
//     res.send(`User ID: ${req.params.id}`);
// })

// app.get("/search", (req, res) => {
//      res.send(`Searching for ${req.query.name}`);
// })

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });

const express = require("express");

const cors = require("cors");


const app = express();
const connectDB = require("./db");

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Express");
});

async function startServer() {
    try {
        await connectDB();

        app.listen(process.env.PORT || 3000, () => {
            console.log("Server running");
        });

    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
}

startServer();

// // Middleware
// app.use((req, res, next) => {
//     console.log("Request received");
//     next();
// });

// // Route
// app.get("/", (req, res) => {
//     res.send("Welcome Home");
// });

app.use(express.json());

app.use((err,req, res, next) => {
    res.status(err.staus || 500).send(err.message);
});


const userRoutes = require("./routes/userRoutes");

const postRoutes = require("./routes/postRoute");

app.use("/posts", postRoutes);

app.use("/users", userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});

