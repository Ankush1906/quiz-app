
const url = "https://the-trivia-api.com/v2/questions";

const question = document.querySelector("#question");
const answerButton = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0 ;
let score = 0 ;
let questionsData = [];

async function fetchQuestions() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){ 
    resetState();
    let currentQuestion = questionsData[currentQuestionIndex] ;
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + "."+ currentQuestion.question.text;
    

      let allAnswer = [...currentQuestion.incorrectAnswers,currentQuestion.correctAnswer];
       
      allAnswer.sort(()=> Math.random() - 0.5);
      
      allAnswer.forEach(ans=>{
        const button = document.createElement("button");
        button.innerHTML = ans;
        button.classList.add("btn");
        answerButton.appendChild(button);
        button.addEventListener("click",()=>{
            if(button.innerText == currentQuestion.correctAnswer){
             button.style.backgroundColor = "#9aeabc";
             score++;

             }else{
             button.style.backgroundColor = "#ff9393";
             }

             Array.from(answerButton.children).forEach(button=>{
                if(button.innerText == currentQuestion.correctAnswer){
                     button.style.backgroundColor = "#9aeabc";
                }
                button.disabled = true;
             });
             nextButton.style.display = 'block';
   
        });
      })
}
  

function resetState(){
   nextButton.style.display = "none";
   while(answerButton.firstChild){
         answerButton.removeChild(answerButton.firstChild)
   }; 
    
}

function showScore(){
    resetState();
    question.innerHTML = `YOU SCORED ${score} out of ${questionsData.length}!`
    nextButton.innerHTML = "PLAY AGAIN";
    nextButton.style.display = ' block';
}

function handleNextButton(){

    currentQuestionIndex++;
   if(currentQuestionIndex< questionsData.length){
    showQuestion();
   }else{
    showScore();
   }
}


nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questionsData.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


fetchQuestions().then(data =>{
    questionsData = data;
    startQuiz();
})

