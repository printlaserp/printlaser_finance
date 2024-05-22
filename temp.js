
// Função para gerar valores aleatórios
function getRandomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// Simulação de dados para 31 dias
const simulatedData = Array.from({ length: 31 }, (_, index) => {
  const date = new Date(2023, 0, index + 1);  // Mês 0 representa janeiro
  return {
    incomes: getRandomFloat(100, 1000),
    expenses: getRandomFloat(50, 500),
    goodsIncomes: getRandomFloat(20, 200),
    created_at: date.toISOString(),
    updated_at: new Date().toISOString(),
  };
});

console.log(simulatedData);
