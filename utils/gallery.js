let saveMultipleFiles = () => {
    return (req, res, next) => {
        let filenames = [];
        req.files.files.forEach(file => {
            let filename = new Date().valueOf() + "_" + file.name;
            filenames.push(filename);
            file.mv(`./uploads/${filename}`)
        });
        req.body['filenames'] = filenames;
        next();
    }
}
let saveSingleFiles = () => {
    return (req, res, next) => {

        let filename = new Date().valueOf() + "_" + req.files.file.name;
        req.files.file.mv(`./uploads/${filename}`)
        req.body['filename'] = filename;
        next();
    }
}
module.exports = {
    saveMultipleFiles,
    saveSingleFiles
}