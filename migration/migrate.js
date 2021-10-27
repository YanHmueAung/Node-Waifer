const fs = require('fs');
let backup = async () => {
    let data = [{
        id: "lasdf", name: "aserwef"
    }]
    //await fs.writeFileSync("./migration/text.txt", JSON.stringify(data), 'utf8');
    let result = await fs.readFileSync("./migration/text.txt", "utf8");
    result = JSON.parse(result);
    console.log(typeof result);
    console.log(result);

}

module.exports = {
    backup
}