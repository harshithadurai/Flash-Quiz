// displaying menu page on clicking menu button
document.getElementById("menu").onclick = function() {
  document.getElementById("page2").style.display = "inline";
  document.getElementById("page1").style.display = "none";
}

// functions -------------------

// loads the QA list to the page
function loadQA(array) {
  array.forEach(element => {
    if (element.trash == false){
      addQA(element.id, element.trash, element.question, element.answer);
    }
  });
}

// adds a new Question Answer pair to the list
function addQA(id, trash, question, answer) {
  const text = `<li>    
                 <div class="main questionBlock" id="${id}">
                    <img class="deleteButtonImage" id="deleteButtonImageID" 
                    src="deletebutton.png">
                    <div class="inner-question main questionBlock">
                        ${question}
                    </div>
                    <div class="main answerBlock" id="${id}">
                        ${answer}
                    </div>
                  </div>
                  <div class="gap"></div>
                </li>`

  const position = "beforeEnd";
  questionsList.insertAdjacentHTML(position, text);
}

// loading a random question on page1
function loadRandomQuestion(x) {
  let randomQuestion;
  if (list.length == 0){
    randomQuestion = "No Questions to Display";
  }
  else {
    if (list.length == 1){
      questionID = 0;
      randomQuestion = list[questionID].question;
    }
    else {
      questionID = Math.floor(Math.random() * id);
      if (questionID == x){
        loadRandomQuestion(x);
        return
      }
      else {
        randomQuestion = list[questionID].question;
      }
    }
  }
  questionBox.innerHTML = randomQuestion;
}

// clear all elements with trash true
function removeTrash(array) {
  for (let i = 0; i<array.length; i++) {
    if (array[i].trash == true){
      array.splice(i,1);
      i--;
    }
  }
}

// deleting a qa pair
function deleteQA(element){
  let toBeDeletedID = element.parentNode.id;
  for (let i = list.length - 1; i>=0; i--) {
    if (list[i].id == toBeDeletedID){
      list[i].trash = true;
    }
  }
  element.parentNode.parentNode.remove();
};

// next button
document.getElementById("next").onclick = function() {
  loadRandomQuestion(questionID);
  answerBox.innerHTML = `<textarea id="answerToCheck" type="text" placeholder="Enter Your Answer..."></textarea>`
  //location.reload();
}

// see-answer button
document.getElementById("see-answer").onclick = function() {
  answerBox.innerHTML = list[questionID].answer;
}

// check button
document.getElementById("check").onclick = function() {
  answerToCheck = document.getElementById("answerToCheck")
  answer = answerToCheck.value
  if(!(answer == ""))
  {
    if(answer.localeCompare(list[questionID].answer) == 0){
      answerBox.innerHTML = "CORRECT!"
    }
    else {
      answerBox.innerHTML = "TRY AGAIN"
      setTimeout(function() {
        answerBox.innerHTML = `<textarea id="answerToCheck" type="text" placeholder="Enter Your Answer..."></textarea>`}, 900)
    }
  }
}

// declaring constants and vars
const questionBox = document.getElementById("questionDisplayed")
const answerBox = document.getElementById("answerDisplayed")
const inputQuestion = document.getElementById("questionInput")
const inputAnswer = document.getElementById("answerInput")
const questionsList = document.getElementById("list")
let answerToCheck = document.getElementById("answerToCheck")
let list, id, questionID;

let data = localStorage.getItem("QApair");
if (data) {
  list = JSON.parse(data);
  id = list.length;
  loadQA(list);
} 
else {
  list = [];
  id = 0;
}

loadRandomQuestion();

// when add button is pressed to add a new question answer pair
document.getElementById("addButton").addEventListener("click",function(event){
  const question = inputQuestion.value
  const answer = inputAnswer.value
  if((question != "") && (answer != "")) {
    addQA(id, false, question, answer);

    list.push({
      question: question,
      answer: answer,
      id: id,
      trash: false
    });

    // update local storage
    localStorage.setItem("QApair", JSON.stringify(list));

    inputQuestion.value = "";
    inputAnswer.value = "";
    id++;  

    deleteButtonImageHover();
  } 
});

// invoking delete
document.getElementById("list").addEventListener("click",function(event) {
    if (event.target.id == "deleteButtonImageID")
      deleteQA(event.target); 
    removeTrash(list);
    
    // update local storage
    localStorage.setItem("QApair", JSON.stringify(list));
    
    id = list.length;
});

// image changing on hovering over buttons ------------------------------------------

// image hover for menu
document.getElementById("menu").onmouseover = function() {
  this.src = "menuclicked.png";
};

document.getElementById("menu").onmouseout = function() {
  this.src = "menu.png";
};

// image hover for back button
document.getElementById("backButtonImage").onmouseover = function() {
  this.src = "backbuttonclicked.png";
};

document.getElementById("backButtonImage").onmouseout = function() {
  this.src = "backbutton.png";
};

// image hover for delete button
function deleteButtonImageHover () {
  var deleteButtons = document.getElementsByClassName("deleteButtonImage");
  for (let i = 0; i<deleteButtons.length; i++) { 
    deleteButtons[i].onmouseover = function() {
      this.src = "deletebuttonclicked.png";
  };
    deleteButtons[i].onmouseout = function() {
      this.src = "deletebutton.png";
   };
  }
}
deleteButtonImageHover();

// image hover for add button
document.getElementById("addButton").onmouseover = function() {
  this.src = "addquestionclicked.png";
};

document.getElementById("addButton").onmouseout = function() {
  this.src = "addquestion.png";
};
