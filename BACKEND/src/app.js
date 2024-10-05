// const express = require('express');
// const dotenv = require("dotenv").config();
// const fileupload = require("express-fileupload");
// const path = require("path");
// const cors = require('cors');

// const perfilRouter = require('./routes/perfilRouter');
// const loginRouter = require('./routes/loginRouter');
// const petsRouter = require('./routes/petsRouter');
// const servicoRouter = require('./routes/servicoRouter');
// const feedRouter = require('./routes/feedRouter');

// const app = express();
// app.set("port", process.env.PORT || 3005);

// // const fileupload = require('express-fileupload');
// // app.use(fileupload());


// app.use(express.json());
// app.use(cors());
// app.use(fileupload());

// app.use('/upload', express.static(path.join(__dirname, "uploads")));


// // app.use('/uploads', express.static('uploads'));

// app.use('/api', loginRouter);
// app.use('/api', petsRouter);
// app.use('/api', feedRouter);
// app.use('/api', perfilRouter);
// app.use('/api', servicoRouter);

// module.exports = app;





const express = require('express');
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require('cors');
const multer = require('multer');

// Configuração do multer para armazenar arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo
    }
});

const upload = multer({ storage: storage });

const perfilRouter = require('./routes/perfilRouter');
const loginRouter = require('./routes/loginRouter');
const petsRouter = require('./routes/petsRouter');
const servicoRouter = require('./routes/servicoRouter');

const app = express();
app.set("port", process.env.PORT || 3005);

app.use(express.json());
app.use(cors());

// Middleware para servir arquivos estáticos
app.use('/upload', express.static(path.join(__dirname, "uploads")));
app.use('/uploads', express.static('uploads'));

// Rotas da API
app.use('/api', loginRouter);
app.use('/api', petsRouter);
app.use('/api', perfilRouter);
app.use('/api', servicoRouter);

module.exports = app;

















// const express = require('express');
// const dotenv = require("dotenv").config();
// const path = require("path");
// const cors = require('cors');

// const perfilRouter = require('./routes/perfilRouter');
// const loginRouter = require('./routes/loginRouter');
// const petsRouter = require('./routes/petsRouter');
// const servicoRouter = require('./routes/servicoRouter');
// const feedRouter = require('./routes/feedRouter');

// const app = express();
// app.set("port", process.env.PORT || 3005);

// app.use(express.json());
// app.use(cors());

// app.use('/upload', express.static(path.join(__dirname, "uploads")));

// app.use('/api', loginRouter);
// app.use('/api', petsRouter);
// app.use('/api', feedRouter);
// app.use('/api', perfilRouter);
// app.use('/api', servicoRouter);

// module.exports = app;
