const app = require('./app');
const port = app.get('port');


const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Pet Shops!",
            version: "1.0.0",
            description: "API CRUD para realizar agendamentos",
        },
        servers: [{ url: "http://localhost:3005" }],
    },
    apis: [`${__dirname}/routes/*.js`], //caminho para as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => console.log(`Run on port ${port}`));