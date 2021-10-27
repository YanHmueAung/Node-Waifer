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
const catRouter = require('./routes/category');
const subcatRouter = require('./routes/subcat');
const childRouter = require('./routes/childcat');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const apiRouter = require('./routes/api')

app.use('/user', userRouter);
app.use('/permit', permitRouter);
app.use('/role', roleRouter);
app.use('/cat', catRouter);
app.use('/subcat', subcatRouter);
app.use('/childcat', childRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/api', apiRouter);


// app.get('/', (req, res) => {
//     throw new Error("not found");
// })

// app.use((err, req, res, next) => {
//     err.status = err.status || 303;
//     res.status(err.status).json({ con: false, "msg": err.message });
// })

/********************Migration************* */
let migrate = () => {
    let migrator = require("./migration/migrate");
    migrator.backup();

}
migrate()

app.listen(process.env.PORT, console.log(`Running on ${process.env.PORT}`));