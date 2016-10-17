'use strict';

/* Lab 3: Airline route display. */

/**
 * App name space.
 *
 * The
 * quiz object encapsulates the variables and functions
 * into a namespace to prevent interference with global variables from
 * other libraries. In this case, it isn't strictly necessary, but a good
 * habit to get into.
 *
 * @type {object}
 quiz
 */
var quiz = quiz || {};
var score = 0;
var q1Answered = false;
var q2Answered = false;
/**
 * Indicates which cities have a direct flight between them.
 * A key has a direct flight to each of the cities in the array
 * associated with that key.
 *
 * @type {object} routes
 * @const
 */


quiz.Q1 = {
  "HAL 9000": "Incorrect: The HAL 9000 is a fictional computer from Arthur C. Clarke's 2001: A Space Odyssey.",
  "FERUT": "Correct: The machine arrived in Canada on April 30, 1952.  Named FERUT (FERranti U of T), it was used to compute changes in water levels due to the opening of the St. Lawrence Seaway.",
  "ILLIAC": "Incorrect: The ILLIAC was built at the University of Illinois. It was the first von Neumann architecture computer built and owned by an American university. It was put into service on September 22, 1952.",
  "UNIVAC": "Incorrect:  The UNIVAC was the first commericial computer produced in the United States, and was designed by J. Presper Eckert and John Mauchly.  The United States Census Department received delivery of the first UNIVAC in May 1952."
};

quiz.Q2 = ["loop", "inline", "keyboard", "interpreter", "function", "block", "character", "variable"];

quiz.Q3 = {
  "Daniel Wigdor": "Taught a first-year course while an undergraduate student in our department",
  "Stephen Cook": "Turing Award winner for work in computational complexity",
  "Geoff Hinton": "Pioneer in machine learning, now Distinguished Researcher at Google",
  "Karan Singh": "Academy Award for Ryan (software research and development director)",
  "Diane Horton": "Winner of both the President's Teaching Award and OCUFA teaching award",
  "Raquel Urtasun": "Canada Research Chair in Machine Learning and Computer Vision, researching self-driving cars",
  "David Levin": "Associate Research Scientist at Disney Research before joining the faculty",
  "Mike Brudno": "Scientific Director of the Centre for Computational Medicine at Sick Kids Hospital"
};

quiz.updateScore = function(){
    var scoreLabel = document.getElementById("score");
    scoreLabel.innerHTML = "Score: " + score.toString();
};

//Fisher-Yates algorithm.
quiz.shuffle = function(sourceArray){
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
};

quiz.buildQ1 = function() {
    let q1Form = document.getElementById("q1form");
    for (let key in quiz.Q1){
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "option"
        input.value = key;
        input.onclick = function() {
            let answer = document.getElementById(this.value);
            if (answer != null) {
              answer.innerHTML = quiz.Q1[this.value];
              if (!q1Answered) {
                  q1Answered = true;
                  if (this.value === "FERUT"){
                    score += 1;
                    quiz.updateScore();
                  };
              }
              for (let option in quiz.Q1){
                if (option !== this.value) {
                  let otherAnswer = document.getElementById(option);
                  otherAnswer.innerHTML = "";
                }
              }
            }
        };

        q1Form.appendChild(input);
        q1Form.appendChild(document.createTextNode(key));
        var linebreak = document.createElement("br");
        q1Form.appendChild(linebreak);
        let explanationNode = document.createElement("p");
        explanationNode.id = key;
        q1Form.appendChild(explanationNode);

    }

    let submitButton = document.createElement("input");
    submitButton.type = 'button';
    submitButton.value = 'Display All Explanations';
    submitButton.onclick = function() {
        q1Answered = true;
        for (let key in quiz.Q1){
          let a = document.getElementById(key);
          a.innerHTML = quiz.Q1[key];
        }
    };
    q1Form.appendChild(submitButton);
};


quiz.buildQ2 = function() {
    let q2Form = document.getElementById("q2form");
    for (let i = 0; i < quiz.Q2.length; i++){
        let input = document.createElement("input");
        input.type = "checkbox";
        input.name = "word";
        input.value = quiz.Q2[i];

        q2Form.appendChild(input);
        q2Form.appendChild(document.createTextNode(quiz.Q2[i]));
        var linebreak = document.createElement("br");
        q2Form.appendChild(linebreak);
    }

    let submitButton = document.createElement("input");
    submitButton.type = 'button';
    submitButton.value = 'Submit';
    submitButton.onclick = function() {
      let count = 0; 
      let answers = [];
      for (let i = 0; i < q2Form.elements.length; i++) { 
        var obj = q2Form.elements[i]; 
        if (obj.type == "checkbox" && obj.checked) { 
          answers[count] = obj.value;
          count++; 
        } 
      }
      let response = document.getElementById("q2response");
      if (count > 2) {
          response.innerHTML = "Only two words can be selected. Please try again.";
      }else if (count < 2) {
          response.innerHTML = "Your answer is incomplete.  Please select another word.";
      }else{
          if (answers[0] === "function" && answers[1] === "variable") {
            if (!q2Answered) {
              q2Answered = true;
              score += 2;
              quiz.updateScore();
            }
            response.innerHTML = "Correct: Yes!  It is hard to believe that words we take for granted in computing were once so new.";
          }else if (answers[0] !== "function" && answers[1] !== "variable") {
            if (!q2Answered) {
              q2Answered = true;
            }
            response.innerHTML = "Incorrect: Both words you chose are words that Professors Gotlieb and Hume were quoted for in the OED.";
          }else{
            if (!q2Answered) {
              q2Answered = true;
            }
            if (answers[0] !== "function" && answers[1] === "variable") {
              response.innerHTML = "Incorrect: You picked '" + answers[1] + "' correctly, but '" + answers[0] + "' is one of the words that Professors Gotlieb and Hume got credit for.";
            }
            if (answers[0] === "function" && answers[1] !== "variable") {
              response.innerHTML = "Incorrect: You picked '" + answers[0] + "' correctly, but '" + answers[1] + "' is one of the words that Professors Gotlieb and Hume got credit for.";
            }
          }
      }
    };
    q2Form.appendChild(submitButton);
    let responseNode = document.createElement("p");
    responseNode.id = "q2response";
    q2Form.appendChild(responseNode);
};

quiz.buildQ3 = function() {
    var nameField = document.getElementsByClassName("professors")[0];
    var fameField = document.getElementsByClassName("fame")[0];
    let option = "";

    let index = "a";
    let counter = 0;
    for (let key in quiz.Q3){
        let prof = document.createElement("p");
        prof.innerHTML = String.fromCharCode(index.charCodeAt(0) + counter) + ". " + key;
        prof.id = String.fromCharCode(index.charCodeAt(0) + counter);
        prof.onclick = function() {
            option = this.id;
        };
        nameField.appendChild(prof);
        let linebreak = document.createElement("br");
        nameField.appendChild(linebreak);
        counter++;
    }

    let keys = quiz.shuffle(Object.keys(quiz.Q3));
    // let keys = Object.keys(quiz.Q3);
    for (let i = 0; i < keys.length; i++){
        let fame = document.createElement("p");
        fame.innerHTML = " <span class='placeholder'> </span>" + quiz.Q3[keys[i]];
        fame.onclick = function() {
            let placeholder = this.getElementsByClassName("placeholder");
            placeholder[0].innerHTML = option;
        };
        fameField.appendChild(fame);
        let linebreak = document.createElement("br");
        fameField.appendChild(linebreak);
    }

};
quiz.checkAnswerForQ4 = function() {

// http://stackoverflow.com/questions/21220578/display-another-div-when-submit-button-is-clicked

};
/**
 * Init function.
 */
 quiz.init = function() {
  this.updateScore();
  this.buildQ1();
  this.buildQ2();
  this.buildQ3();
};

// Initializing.
quiz.init();
