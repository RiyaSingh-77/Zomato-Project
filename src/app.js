//create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');



//Creation of a server:

const app = express();
app.use(cookieParser()); // USED AS A MIDDLEWARE
app.use(express.json());
app.use(cors({
    origin: "https://munchly-dev-feed.vercel.app",
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("Hello World");
})


app.use('/api/auth', authRoutes); //To access the APIs of auth, we need to add a prefix
//Here we are telling our server that there exists some APIs related to auth
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);





module.exports = app;