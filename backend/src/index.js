const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: Configurar quando tiver o domínio
app.use(cors())

require('./app/controllers/index')(app);

app.listen(8080, () => {
  console.info("Running in port 8080...");
})