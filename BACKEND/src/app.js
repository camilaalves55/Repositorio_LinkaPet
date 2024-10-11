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





<<<<<<< HEAD
=======




// const express = require('express');
// const dotenv = require('dotenv').config();
// const path = require('path');
// const cors = require('cors');
// // const fileUpload = require('express-fileupload'); 

// const perfilRouter = require('./routes/perfilRouter');
// const loginRouter = require('./routes/loginRouter');
// const petsRouter = require('./routes/petsRouter');
// const servicoRouter = require('./routes/servicoRouter');
// const feedRouter = require('./routes/feedRouter');

// const app = express();
// app.set('port', process.env.PORT || 3005);

// app.use(express.json());
// app.use(cors());
// // app.use(fileUpload()); 

// app.use('/upload', express.static(path.join(__dirname, '..', "uploads")));

// app.use('/api', loginRouter);
// app.use('/api', petsRouter);
// app.use('/api', feedRouter);
// app.use('/api', perfilRouter);
// app.use('/api', servicoRouter);

// module.exports = app;









// const express = require('express');
// const dotenv = require('dotenv').config();
// const path = require('path');
// const cors = require('cors');

// const perfilRouter = require('./routes/perfilRouter');
// const loginRouter = require('./routes/loginRouter');
// const petsRouter = require('./routes/petsRouter');
// const servicoRouter = require('./routes/servicoRouter');
// const feedRouter = require('./routes/feedRouter');

// const app = express();
// app.set('port', process.env.PORT || 3005);

// app.use(express.json());
// app.use(cors());

// app.use('/upload', express.static(path.join(__dirname, "uploads")));

// app.use('/api', loginRouter);
// app.use('/api', petsRouter);
// app.use('/api', feedRouter);
// app.use('/api', perfilRouter);
// app.use('/api', servicoRouter);

// module.exports = app;























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










>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
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
<<<<<<< HEAD
=======

const agendamentoRouter = require('./routes/agendamentoRouter');
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)

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

app.use('/api', agendamentoRouter);

module.exports = app;
















<<<<<<< HEAD

=======
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
// const express = require('express');
// const dotenv = require("dotenv").config();
// const path = require("path");
// const cors = require('cors');

<<<<<<< HEAD
=======
// // const fileupload = require("express-fileupload");
>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
// const perfilRouter = require('./routes/perfilRouter');
// const loginRouter = require('./routes/loginRouter');
// const petsRouter = require('./routes/petsRouter');
// const servicoRouter = require('./routes/servicoRouter');
<<<<<<< HEAD
// const feedRouter = require('./routes/feedRouter');
=======

>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)

// const app = express();
// app.set("port", process.env.PORT || 3005);

// app.use(express.json());
// app.use(cors());

<<<<<<< HEAD
// app.use('/upload', express.static(path.join(__dirname, "uploads")));

// app.use('/api', loginRouter);
// app.use('/api', petsRouter);
// app.use('/api', feedRouter);
// app.use('/api', perfilRouter);
// app.use('/api', servicoRouter);

=======
// // app.use(fileupload());
// app.use('/upload', express.static(path.join(__dirname, "uploads")));
// app.use('/uploads', express.static('uploads'));


// app.use('/api', loginRouter);
// app.use('/api', petsRouter);
// app.use('/api', perfilRouter);
// app.use('/api', servicoRouter);


>>>>>>> 2123e1b (Página de Consultas Agendadas parte 1)
// module.exports = app;
