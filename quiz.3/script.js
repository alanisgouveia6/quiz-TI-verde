const questions = [
    {
        question: "O que é TI Verde?",
        options: ["Uso de tecnologia para reduzir o impacto ambiental", "Tecnologia para aumentar a produção", "Tecnologia sem impacto ambiental", "Nenhuma das anteriores"],
        answer: 0
    },
    {
        question: "Qual dos seguintes é um dos 5 R's?",
        options: ["Reduzir", "Reutilizar", "Reciclar", "Todos os anteriores"],
        answer: 3
    },
    {
        question: "O que significa sustentabilidade?",
        options: ["Uso de recursos sem pensar no futuro", "Uso consciente de recursos", "Desperdício de recursos", "Nenhuma das anteriores"],
        answer: 1
    },
    {
        question: "Qual é um exemplo de reciclagem?",
        options: ["Jogar lixo no chão", "Reutilizar garrafas", "Transformar papel usado em papel reciclado", "Queimar lixo"],
        answer: 2
    },
    {
        question: "O que é a economia circular?",
        options: ["Modelo de produção que evita desperdício", "Modelo de produção linear", "Modelo de produção sem reciclagem", "Nenhuma das anteriores"],
        answer: 0
    },
    {
        question: "Qual é a importância da redução de resíduos?",
        options: ["Aumenta a poluição", "Diminui o uso de recursos", "Não tem importância", "Aumenta o consumo"],
        answer: 1
    },
    {
        question: "O que significa 'reutilizar'?",
        options: ["Usar algo novamente", "Descartar algo", "Reciclar algo", "Comprar algo novo"],
        answer: 0
    },
    {
        question: "Qual é um benefício da TI Verde?",
        options: ["Redução de custos", "Aumento da poluição", "Desperdício de energia", "Nenhuma das anteriores"],
        answer: 0
    },
    {
        question: "O que é compostagem?",
        options: ["Transformar resíduos orgânicos em adubo", "Queimar lixo", "Descartar lixo em aterros", "Nenhuma das anteriores"],
        answer: 0
    },
    {
        question: "Qual é a melhor forma de descartar eletrônicos?",
        options: ["Jogar no lixo comum", "Reciclar em pontos específicos", " Descartar em aterros", "Queimar"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.getElementById('start-quiz').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
        showQuestion();
    } else {
        alert("Por favor, digite seu nome.");
    }
});

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');

    questionContainer.innerText = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = '';

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = 'none';
}

function selectOption(index) {
    if (index === questions[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    const nextButton = document.getElementById('next-button');
    if (currentQuestionIndex < questions.length) {
        nextButton.style.display = 'block';
    } else {
        showResult();
    }
}

document.getElementById('next-button').addEventListener('click', function() {
    showQuestion();
});

function showResult() {
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('result').innerText = `Você acertou ${score} de ${questions.length} perguntas.`;
    document.getElementById('more-info').style.display = 'block';

    // Adicione a resposta ao servidor
    fetch('http://localhost:3000/adicionar-resposta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: document.getElementById('username').value,
            pontuacao: score
        })
    }).then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

    // Recupere o rank do servidor
    fetch('http://localhost:3000/get-rank')
    .then((response) => response.json())
    .then((rank) => {
        const rankList = document.getElementById('rank-list');
        rankList.innerHTML = '';
        rank.forEach((resultado, indice) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${indice + 1}. ${resultado.nome} - ${resultado.pontuacao} pontos`;
            rankList.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error(error);
    });
}

document.getElementById('more-info').addEventListener('click', function() {
    const infoText = `
        A TI Verde refere-se ao uso de tecnologia da informação para promover a sustentabilidade ambiental. 
        Isso inclui práticas como a redução do consumo de energia, a minimização de resíduos e a promoção da reciclagem. 
        A sustentabilidade é um conceito que envolve o uso responsável dos recursos naturais, garantindo que as necessidades do presente sejam atendidas sem comprometer a capacidade das futuras gerações de atenderem suas próprias necessidades. 
        Os 5 R's (Reduzir, Reutilizar, Reciclar, Repensar e Recusar) são princípios fundamentais para a gestão de resíduos e a promoção de um estilo de vida mais sustentável. 
        A economia circular é um modelo que busca eliminar o desperdício e promover a reutilização de recursos, criando um ciclo contínuo de uso e reciclagem. 
        A compostagem é uma prática que transforma resíduos orgânicos em adubo, contribuindo para a redução de resíduos e a melhoria do solo. 
        A correta destinação de eletrônicos é crucial para evitar a poluição e a contaminação do meio ambiente. 
        A adoção de práticas sustentáveis na TI não só ajuda o meio ambiente, mas também pode resultar em economia de custos e eficiência operacional. 
        A conscientização sobre esses temas é essencial para promover mudanças significativas em nossa sociedade.
    `;
    document.getElementById('info-text').innerText = infoText;
    document.getElementById('info-text').style.display = 'block';
});
