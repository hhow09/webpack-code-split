const express = require('express');
const app = express();
 
//setting middleware
app.use(express.static('build'));
 
app.listen(5050);

console.log("server is listening on http://localhost:5050/index")