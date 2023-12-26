class QuizGame {
    constructor() {
        this.questionElement = document.getElementById('question');
        this.optionsContainer = document.getElementById('options-container');
        this.nextButton = document.getElementById('next-button');
        this.audioCorrect = document.getElementById('audio-correct');
        this.audioIncorrect = document.getElementById('audio-incorrect');
        this.questions = [
            this.generateQuestion(),
            this.generateQuestion(),
            this.generateQuestion(),
        ];
        this.currentQuestionIndex = 0;
        this.init();
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    generateQuestion() {
        const num1 = this.getRandomNumber();
        const num2 = this.getRandomNumber();
        const correctAnswer = (num1 * num2).toString();
        const options = [
            (num1 * num2 + 1).toString(),
            correctAnswer,
            (num1 * num2 - 3).toString()
        ];
        this.shuffleArray(options);
        return {
            question: `${num1} * ${num2}`,
            options: options,
            correctAnswer: correctAnswer
        };
    }

    showQuestion(index) {
        const currentQuestion = this.questions[index];
        this.questionElement.textContent = currentQuestion.question;

        this.optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option');
            button.addEventListener('click', () => this.checkAnswer(index, i));
            this.optionsContainer.appendChild(button);
        });
    }

    checkAnswer(questionIndex, optionIndex) {
        const selectedOption = this.questions[questionIndex].options[optionIndex];
        const correctAnswer = this.questions[questionIndex].correctAnswer;

        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('feedback');

        if (selectedOption === correctAnswer) {
            feedbackElement.textContent = '¡Correcto! 😊';
            this.playAudio(this.audioCorrect);
        } else {
            feedbackElement.textContent = `Incorrecto. La respuesta correcta es ${correctAnswer} 😢`;
            this.playAudio(this.audioIncorrect);
        }

        this.optionsContainer.appendChild(feedbackElement);

        this.optionsContainer.querySelectorAll('.option').forEach(button => {
            button.removeEventListener('click', () => this.checkAnswer);
            button.disabled = true;
        });

        setTimeout(() => this.showQuestion((questionIndex + 1) % this.questions.length), 1000);
    }

    playAudio(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    init() {
        this.nextButton.addEventListener('click', () => {
            this.showQuestion((this.currentQuestionIndex + 1) % this.questions.length);
        });

        this.showQuestion(this.currentQuestionIndex);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new QuizGame();
});