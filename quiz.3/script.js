const questions = [
    {
        question: "O que significa TI Verde?",
        options: ["Tecnologia da Informação sustentável", "Tecnologia da Informação tradicional", "Tecnologia da Informação em nuvem", "Tecnologia da Informação em hardware"],
        answer: 0
    },
    {
        question: "Qual dos seguintes é um dos 5 R's?",
        options: ["Reduzir", "Reutilizar", "Reciclar", "Todos os anteriores"],
        answer: 3
    },
    {
        question: "O que é reciclagem?",
        options: ["Transformar resíduos em novos produtos", "Descartar lixo", "Queimar resíduos", "Armazenar lixo"],
        answer: 0
    },
    {
        question: "Qual é um benefício da TI Verde?",
        options: ["Redução de custos", "Aumento do consumo de energia", "Aumento de resíduos", "Nenhuma das anteriores"],
        answer: 0
    },
    {
        question: "O que significa 'Reutilizar'?",
        options: ["Usar um produto novamente", "Descartar um produto", "Reciclar um produto", "Comprar um novo produto"],
        answer: 0
    },
    {
        question: "Qual é um exemplo de TI Verde?",
        options: ["Computadores com eficiência energética", "Impressoras a jato de tinta", "Desktops antigos", "Servidores sem ventilação"],
        answer: 0
    },
    {
        question: "O que é a pegada de carbono?",
        options: ["Emissões de gases de efeito estufa", "Uso de papel", "Consumo de água", "Descarte de eletrônicos"],
        answer: 0
    },
    {
        question: "Qual é a importância da sustentabilidade?",
        options: ["Preservar recursos para futuras gerações", "Aumentar a produção", "Reduzir custos", "Aumentar o consumo"],
        answer: 0
    },
    {
        question: "Qual dos seguintes é um exemplo de 'Reciclar'?",
        options: ["Transformar papel usado em novos produtos de papel", "Descartar papel no lixo comum", "Queimar papel", "Armazenar papel em casa"],
        answer: 0
    },
    {
        question: "O que é 'Reduzir'?",
        options: ["Diminuir o consumo de recursos", "Aumentar a produção", "Comprar mais produtos", "Descartar produtos antigos"],
        answer: 0
    }
];

document.getElementById('login-button').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('user-name').innerText = username;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
        loadQuiz();
    }
});

function loadQuiz() {
    const quizForm = document.getElementById('quiz-form');
    questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        q.options.forEach((option, i) => {
            questionElement.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${i}" required>
                    ${option}
                </label><br>
            `;
        });
        quizForm.appendChild(questionElement);
    });
    document.getElementById('submit-quiz').style.display = 'block';
}

document.getElementById('submit-quiz').addEventListener('click', function() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });
    displayResults(score);
});

function displayResults(score) {
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('score').innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
    document.getElementById('ti-verde-text').innerText = "A TI Verde refere-se ao uso de tecnologia da informação de maneira sustentável, minimizando o impacto ambiental e promovendo a eficiência energética. Isso inclui práticas como a utilização de equipamentos com baixo consumo de energia, a reciclagem de eletrônicos e a promoção de uma cultura de sustentabilidade nas empresas. A adoção de TI Verde não só ajuda a preservar o meio ambiente, mas também pode resultar em economia de custos e melhoria da imagem corporativa. A implementação de políticas de TI Verde é essencial para garantir que as tecnologias da informação contribuam para um futuro mais sustentável.";
}