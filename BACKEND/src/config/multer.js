// const multer = require("multer");

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, "./src/public");
//     },
//     filename: function (req, file, cb) {
//         return cb(null, `${Date.now()}_${file.originalname}`);
//     }
// });

// var upload = multer({ storage });

// module.exports = upload;



// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '..', 'uploads')); // Corrigir para o caminho correto
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     }
// });

// const upload = multer({ storage });

// module.exports = upload;



const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configuração do diretório de upload
const uploadPath = path.join(__dirname, '..', 'uploads');

// Cria o diretório se não existir
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

// Configuração do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Exportando o upload para uso em outros módulos
module.exports = upload;




// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const uploadPath = path.join(__dirname, '..', 'uploads');

// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     }
// });

// const upload = multer({ storage });

// module.exports = upload;





// const multer = require("multer");
 
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, "./src/public");
//     },
//     filename: function (req, file, cb) {
//         let imagem_sem_espaco = file.originalname.trim()
//         let imagem_array = imagem_sem_espaco.split(' ')
//         let imagem_underline = imagem_array.join('_')
 
//         return cb(null, `${Date.now()}_${imagem_underline}`);
//     }
// });
 
// var upload = multer({ storage });
 
// module.exports = upload;