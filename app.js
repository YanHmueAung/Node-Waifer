require('dotenv').config()
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fileUpload = require('express-fileupload');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    });
}

app.use(bodyParser.json());
app.use(fileUpload());


const userRouter = require('./routes/user');
const permitRouter = require('./routes/permit');
const roleRouter = require('./routes/role');

app.use('/user', userRouter);
app.use('/permit', permitRouter);
app.use('/role', roleRouter);

app.listen(process.env.PORT, console.log(`Running on ${process.env.PORT}`));