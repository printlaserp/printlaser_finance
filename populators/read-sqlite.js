const sqlite3 = require('sqlite3').verbose();

// Abra uma conexão com o banco de dados SQLite
const db = new sqlite3.Database('./prisma/dev.db');

// Execute uma consulta SQL para ler dados
db.serialize(() => {
  db.each('SELECT * FROM fees', (err, row) => {
    if (err) {
      console.error(err.message);
    }
    // Faça algo com os dados lidos, por exemplo, imprima-os
    console.log(row);
  });
});

// Feche a conexão com o banco de dados após a conclusão
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
});
