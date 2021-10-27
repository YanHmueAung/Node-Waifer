const fs = require('fs');
let backup = async () => {
    let data = [{
        id: "lasdf", name: "aserwef"
    }]
    await fs.writeFileSync("./migration/text.txt", JSON.stringify(data), 'utf8');


}

module.exports = {
    backup
}