const express = require('express')
// importer notre dotenv et mongoose
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
// importation des routes 
const productRouter = require('./routes/products');
const authentificationRouter = require('./routes/authentificationRoutes');
const userRouter = require('./routes/usersRoutes');
const port = 3000;

//initialiser dotenv
dotenv.config()
//connection dans notre base de donnée
mongoose.connect(process.env.MONGO_URL
).then(()=>console.log("db connected"))
.catch((err)=>console.log(err))

//pour spécifier que la limite de donnée doit pas depasser 10mb
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb', extended:true}));

app.use('/api/products',productRouter);
app.use('/api/',authentificationRouter)
app.use('/api/users',userRouter)

app.listen( process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))