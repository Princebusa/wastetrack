const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/home' , (req , res) =>{
    res.send("this is home page ")
}) ;

app.get('/prince' , (req , res) =>{
    res.send("this is home page ")
}) ;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});