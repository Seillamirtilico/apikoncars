const mongoose = require('mongoose');
require('dotenv').config();

async function clean() {
  await mongoose.connect(process.env.MONGODB_URI);
  await mongoose.connection.db.collection('usuarios').deleteMany({ email: null });
  console.log("Registros con email=null eliminados");
  process.exit();
}

clean();