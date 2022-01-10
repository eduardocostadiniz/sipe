const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: Configurar quando tiver o domínio
app.use(cors())
app.use(express.static(path.join(__dirname, '../sipe-uploads/avatars')));

require('./app/controllers/index')(app);

app.listen(9090, () => {
  console.info("Running in port 9090...");
})