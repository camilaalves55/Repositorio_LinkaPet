const express = require('express');
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require('cors');

const agendarRouter = require('./routes/agendarRouter');
const atualizarPerfilRouter = require('./routes/atualizarPerfilRouter');
const cadastroRouter = require('./routes/cadastroRouter');
const consultasRouter = require('./routes/consultasRouter');
const contasEmpresasRouter = require('./routes/contasEmpresasRouter');
const loginRouter = require('./routes/loginRouter');
const perfilRouter = require('./routes/perfilRouter');
const registrarEmpresaRouter = require('./routes/registrarEmpresaRouter');

const app = express();
app.set("port", process.env.PORT || 3005);

app.use(express.json());
app.use(cors());

app.use('/upload', express.static(path.join(__dirname, "uploads")));
app.use('/uploads', express.static('uploads'));

app.use('/api', agendarRouter);
app.use('/api', atualizarPerfilRouter);
app.use('/api', cadastroRouter);
app.use('/api', consultasRouter);
app.use('/api', contasEmpresasRouter);
app.use('/api', loginRouter);
app.use('/api', perfilRouter);
app.use('/api', registrarEmpresaRouter);

module.exports = app;