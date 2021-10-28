const fs = require('fs');
const CategoryDB = require('../models/category');
const UserDB = require('../models/user');
const ChildCatDB = require('../models/childcat');
const OrderDB = require('../models/order');
const OrderItemDB = require('../models/orderItem');
const PermitDB = require('../models/permit');
const ProductDB = require('../models/product');
const RoleDB = require('../models/role');
const SubcatDB = require('../models/subcat');



const storage = (file) => "./migration/backup/" + file + '.json';

const migrator = {
    backup: async (DB, file) => {
        let data = await DB.find();
        await writeFile(storage(file), data);

    },
    restore: async (DB, file) => {
        let data = await readFile(storage(file));
        let dataSaveResult = await DB.insertMany(data);
        console.log(file, ' Migration Done');
    }
}
let backup = () => {
    migrator.backup(UserDB, 'user');
    migrator.backup(CategoryDB, 'category');
    migrator.backup(ChildCatDB, 'childcat');
    migrator.backup(OrderDB, 'order');
    migrator.backup(OrderItemDB, 'orderItem');
    migrator.backup(PermitDB, 'permit');
    migrator.backup(ProductDB, 'product');
    migrator.backup(RoleDB, 'role');
    migrator.backup(SubcatDB, 'subcat');


}
let migrate = async () => {
    migrator.restore(UserDB, 'user');
    migrator.restore(CategoryDB, 'category');
    migrator.restore(ChildCatDB, 'childcat');
    migrator.restore(OrderDB, 'order');
    migrator.restore(OrderItemDB, 'orderItem');
    migrator.restore(PermitDB, 'permit');
    migrator.restore(ProductDB, 'product');
    migrator.restore(RoleDB, 'role');
    migrator.restore(SubcatDB, 'subcat');
}

const writeFile = async (filename, data) => await fs.writeFileSync(filename, JSON.stringify(data), 'utf8');
const readFile = async (filename) => await JSON.parse(fs.readFileSync(filename, "utf8"));


module.exports = {
    backup,
    migrate
}