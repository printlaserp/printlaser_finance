#!/bin/bash

# Defina os nomes dos bancos de dados
banco_origem="./devbkp.db"
banco_destino="./prisma/dev.db"
#!/bin/bash

# Obtenha uma lista de todas as tabelas no banco de origem
tabelas=$(sqlite3 $banco_origem ".tables")

# Para cada tabela, exporte os dados do banco de origem para o banco de destino
for tabela in $tabelas; do
  sqlite3 $banco_origem ".dump $tabela" | sqlite3 $banco_destino
done