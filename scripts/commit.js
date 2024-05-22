// increment-and-commit.js
const { execSync } = require('child_process');

const commitMessage = process.argv[2];

if (!commitMessage) {
    console.error('Por favor, forneça uma mensagem de commit.');
    process.exit(1);
}

try {
    // Adiciona todas as alterações ao git
    execSync('git add .');
    // Faz um commit com a mensagem fornecida
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
} catch (error) {
    console.error('Erro ao realizar commit:', error.message);
    process.exit(1);
}
