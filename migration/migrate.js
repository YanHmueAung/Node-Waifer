const fs = require('fs');
const storage = (file) => "./migration/" + file + '.json';
let backup = async () => {
    let data = [{
        id: "lasdf", name: "aserwef"
    }]
    //await writeFile(storage + 'test.txt', data);
    console.log(storage("Category"));

}
const writeFile = async (filename, data) => await fs.writeFileSync(filename, JSON.stringify(data), 'utf8');
const readFile = async (filename) => await JSON.parse(fs.readFileSync(filename, "utf8"));


module.exports = {
    backup
}