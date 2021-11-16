const fs = require('fs');
let saveMultipleFiles = () => {
    return (req, res, next) => {
        let filenames = [];
        if (req.files) {
            req.files.images.forEach(file => {
                let filename = new Date().valueOf() + "_" + file.name;
                filenames.push(filename);
                //filenames.push(`http://${process.env.SERVER_IP}:3000/uploads/${filename}`)
                file.mv(`./uploads/${filename}`)
            });
            req.body['images'] = filenames;
            next();
        } else {
            next(new Error("Product must have at least one files"));
        }

    }
}
let saveSingleFiles = () => {
    return (req, res, next) => {

        let filename = new Date().valueOf() + "_" + req.files.image.name;
        req.files.image.mv(`./uploads/${filename}`)
        req.body['image'] = filename;
        next();
    }
}
let deleteSingleFile = async (name) => {
    console.log(name)
    let filepath = `./uploads/${name}`;
    await fs.unlinkSync(filepath);

}
let deleteMultipleFiles = async (names) => {
    names.forEach(async (name) => {
        await deleteSingleFile(name);
    })
}
module.exports = {
    saveMultipleFiles,
    saveSingleFiles,
    deleteSingleFile,
    deleteMultipleFiles
}