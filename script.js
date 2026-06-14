// Função para alternar a visibilidade de informações adicionais nos cards
function mostrarDetalhes(idFonte) {
    const elementoInfo = document.getElementById(`info-${idFonte}`);
    
    if (elementoInfo) {
        // Alterna a classe hidden
        elementoInfo.classList.toggle('hidden');
        
        // Altera dinamicamente o texto do botão correspondente para melhor UX
        const botao = elementoInfo.previousElementSibling;
        if (elementoInfo.classList.contains('hidden')) {
            botao.textContent = 'Saber mais';
        } else {
            botao.textContent = 'Ocultar detalhes';
        }
    }
}

// Função para processar a simulação financeira do formulário
function calcularEconomia(event) {
    // Impede o recarregamento padrão da página ao submeter o formulário
    event.preventDefault();

    const tipoEnergia = document.getElementById('tipo-energia').value;
    const consumoAtual = parseFloat(document.getElementById('consumo-atual').value);
    
    const resultadoBox = document.getElementById('resultado-simulacao');
    const textoResultado = document.getElementById('texto-resultado');

    if (isNaN(consumoAtual) || consumoAtual <= 0) {
        alert('Por favor, insira um valor de consumo válido.');
        return;
    }

    let percentualEconomia = 0;
    let nomeEnergia = '';

    // Lógica simples baseada nas médias reais de redução do mercado rural
    switch (tipoEnergia) {
        case 'solar':
            percentualEconomia = 0.90; // Até 90% de economia
            nomeEnergia = 'Solar Fotovoltaica';
            break;
        case 'eolica':
            percentualEconomia = 0.70; // Até 70% de economia
            nomeEnergia = 'Eólica Rústica';
            break;
        case 'biogas':
            percentualEconomia = 0.80; // Até 80% de economia
            nomeEnergia = 'Biodigestor (Biogás)';
            break;
        default:
            percentualEconomia = 0.50;
            nomeEnergia = 'Energia Limpa';
    }

    const economiaMensal = consumoAtual * percentualEconomia;
    const novoGasto = consumoAtual - economiaMensal;
    const economiaAnual = economiaMensal * 12;

    // Renderiza o resultado formatado em moeda brasileira local
    textoResultado.innerHTML = `
        Ao implementar o sistema de <strong>Análise de Energia ${nomeEnergia}</strong>, sua propriedade pode reduzir significativamente os custos.<br><br>
        • Estimativa de Economia Mensal: <strong>R$ ${economiaMensal.toFixed(2).replace('.', ',')}</strong><br>
        • Nova projeção de fatura: R$ ${novoGasto.toFixed(2).replace('.', ',')}<br>
        • Retorno acumulado projetado em 1 ano: <span style="color: #1f5f38; font-weight: bold;">R$ ${economiaAnual.toFixed(2).replace('.', ',')}</span>
    `;

    // Exibe o painel de resultados removendo a classe hidden
    resultadoBox.classList.remove('hidden');
}