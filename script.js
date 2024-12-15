let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// 初始化測驗
function initializeQuiz() {
    questions = [...quizData];
    shuffleArray(questions);
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    startButton.style.display = 'none';
    nextButton.style.display = 'none';
    showQuestion();
}

// 顯示問題
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `
        <div>第 ${questionNumber} 題 / 共 ${questions.length} 題</div>
        <div>請選出「${currentQuestion.word}」的正確發音：</div>
        <div style="font-size: 0.8em; color: #666;">(${currentQuestion.meaning})</div>
    `;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

// 選擇答案
function selectAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsContainer.getElementsByClassName('option-btn');
    
    // 禁用所有按鈕
    Array.from(buttons).forEach(button => {
        button.disabled = true;
    });

    // 顯示正確和錯誤答案
    buttons[currentQuestion.correct].classList.add('correct');
    
    if (index === currentQuestion.correct) {
        score++;
        scoreElement.textContent = score;
    } else {
        buttons[index].classList.add('wrong');
    }

    nextButton.style.display = 'block';
}

// 重置問題狀態
function resetState() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// 下一題或結束測驗
function handleNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.style.display = 'none';
    } else {
        showFinalScore();
    }
}

// 顯示最終分數
function showFinalScore() {
    resetState();
    questionElement.innerHTML = `
        測驗完成！<br>
        你的得分是: ${score} / ${questions.length}<br>
        正確率: ${Math.round((score / questions.length) * 100)}%
    `;
    nextButton.style.display = 'none';
    startButton.style.display = 'block';
    startButton.textContent = '重新開始';
}

// 打亂數組順序
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 事件監聽器
startButton.addEventListener('click', initializeQuiz);
nextButton.addEventListener('click', handleNext);

// 頁面載入時顯示開始按鈕
startButton.style.display = 'block';