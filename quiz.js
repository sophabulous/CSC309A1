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
var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var q4 = document.getElementById("q4");
var score = 0;
var q1Answered = false;
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


quiz.updateScore = function(){
    var scoreLabel = document.getElementById("score");
    scoreLabel.innerHTML = "Score: " + score.toString();
};

quiz.elementHasClass = function(element, cls) {
  return element.classList.contains(cls);
};

quiz.buildQ1 = function() {
    var q1Form = document.getElementById("q1form");
    for (let key in quiz.Q1){
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "option"
        input.value = key;
        // input.addEventListener("click", quiz.checkAnswerForQ1(key));
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

        var linebreak = document.createElement("br");
        q1Form.appendChild(input);
        q1Form.appendChild(document.createTextNode(key));
        q1Form.appendChild(linebreak);

        let explanationNode = document.createElement("p");
        explanationNode.id = key;
        q1Form.appendChild(explanationNode);

    }

    var submitButton = document.createElement("input");
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

quiz.checkAnswerForQ4 = function() {

// http://stackoverflow.com/questions/21220578/display-another-div-when-submit-button-is-clicked

};
/**
 * Init function.
 */
 quiz.init = function() {
  this.updateScore();
  this.buildQ1();
};

// Initializing.
quiz.init();
