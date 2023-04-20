const express = require('express')
const cors = require('cors')
const PORT = 4000


const app = express();

//Global Middlewares
app.use(express.json())
app.use(cors())

//Custom Middlewares
app.get('/', (req, res) => {
    res.status(200).send('Hello')
})
app.use('/auth', require('./routes/authroute'))

//error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).send(errorMessage);
});


app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
})