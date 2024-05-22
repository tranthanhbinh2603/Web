const fs = require('fs');
const folderName = process.argv[2] || 'Project';

try {    
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, '');
    fs.writeFileSync(`${folderName}/styles.css`, '');
    fs.writeFileSync(`${folderName}/script.js`, '');
}
catch (e){
    console.log('CREATE ERROR!!!!!')
    console.error(e);
}
