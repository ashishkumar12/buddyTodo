const fs = require('fs');

exports.load = () => {
    const loadingFiles = ['models','controllers'];
    for(let i = 0 ; i < loadingFiles.length; i++){
        fs.readdir(`./${loadingFiles[i]}/`, (err, files) => {
            files.forEach(file => {
                const filename = file.replace('.js','');
                global[filename] = require(`./../${loadingFiles[i]}/${filename}`)
            });
        });
    }
}