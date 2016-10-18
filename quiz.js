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
var q3Answered = false;
var q4Answered = false;
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

quiz.Q4 = {
  "1940": "The First Computer Network",
  "1971": "First Microprocessor: Intel 4004",
  "1957": "First Popular High-Level Language: FORTRAN",
  "1953": "First Open Source Software: A-2 System",
  "1951": "First Compiler for Electronic Computer: A-0 System",
  "1841": "First Computer Program",
  "1967": "First Object Oriented Programming Language: Simula"

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

              if (this.value === "FERUT"){
                score += 1;
                if (!q1Answered) {
                  q1Answered = true;
                  quiz.updateScore();
                  quiz.checkCompletion();
                }
              }else{
                if (!q1Answered) {
                  q1Answered = true;
                  quiz.checkCompletion();
                }
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
        let linebreak = document.createElement("br");
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
        let obj = q2Form.elements[i]; 
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
          // if only 2 options were chosen

          //if both answers are correct
          if (answers[0] === "function" && answers[1] === "variable") {
            if (!q2Answered) {
              q2Answered = true;
              score += 2;
              quiz.updateScore();
              quiz.checkCompletion();
            }
            response.innerHTML = "Correct: Yes!  It is hard to believe that words we take for granted in computing were once so new.";
          // if one of the answers is correct
          }else if (answers[0] === "function" || answers[0] === "variable") {
              response.innerHTML = "Incorrect: You picked '" + answers[0] + "' correctly, but '" + answers[1] + "' is one of the words that Professors Gotlieb and Hume got credit for.";
              if (!q2Answered) {
                q2Answered = true;
                quiz.checkCompletion();
              }
          }else if (answers[1] === "function" || answers[1] === "variable") {
              response.innerHTML = "Incorrect: You picked '" + answers[1] + "' correctly, but '" + answers[0] + "' is one of the words that Professors Gotlieb and Hume got credit for.";
              if (!q2Answered) {
                q2Answered = true;
                quiz.checkCompletion();
              }
          // if neither of the answers are correct
          }else{
            if (!q2Answered) {
              q2Answered = true;
              quiz.checkCompletion();
            }
            response.innerHTML = "Incorrect: Both words you chose are words that Professors Gotlieb and Hume were quoted for in the OED.";
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
        let linebreak = document.createElement("br");
        let fame = document.createElement("p");
        fame.id = keys[i];
        fame.innerHTML = " <span class='placeholder'></span>" + quiz.Q3[keys[i]] + " <span class='q3answer'> </span>";
        fame.onclick = function() {
            //find the placeholder of the current fame and change the text to the letter the use just clicked on
            let placeholder = this.getElementsByClassName("placeholder");
            placeholder[0].innerHTML = option;

            let answerCount = 0;
            let all_placeholders = fameField.getElementsByClassName("placeholder");
            for (let i = 0; i < all_placeholders.length; i++) {
              if (all_placeholders[i].innerHTML !== "") {
                answerCount += 1;
              }
            }
            if (answerCount == keys.length) {

              let all_fame = fameField.getElementsByTagName("p");
              let answerFields = fameField.getElementsByClassName("q3answer");
              for (let i = 0; i < answerFields.length; i++) {
                let matchedAnswer = document.getElementById(all_placeholders[i].innerHTML); //the prof the user has chosen
                if (matchedAnswer.innerHTML.indexOf(all_fame[i].id) != -1) {
                  answerFields[i].innerHTML = "<br> Correct!";
                  answerFields[i].style.color = "green";
                  if (!q3Answered) {
                    score += 0.5;
                    quiz.updateScore();
                  }
                }else{
                  answerFields[i].style.color = "red";
                  answerFields[i].innerHTML = "<br> Incorrect! The correct answer is " + all_fame[i].id;
                }
              }
              if (!q3Answered) {
                q3Answered = true;
                quiz.checkCompletion();
              };
            }
        };
        fameField.appendChild(fame);
        
        fameField.appendChild(linebreak);
    }

};
quiz.buildQ4 = function() {
    let q4Form = document.getElementById("q4form");
    let keys = quiz.shuffle(Object.keys(quiz.Q4));
    let q4dates = Object.keys(quiz.Q4);
    q4dates.sort();
    for (let i = 0; i < keys.length; i++){
        let selctionDiv = document.createElement('div');
        selctionDiv.className = "selection";
        let selectList = document.createElement("select");
        selectList.id = keys[i];
        selctionDiv.appendChild(selectList);

        //Create and append the options
        for (let j = 0; j < keys.length; j++) {
            let option = document.createElement("option");
            option.value = (j + 1).toString();
            option.text = (j + 1).toString();
            selectList.appendChild(option);
        }
        let invention = document.createElement("span");
        invention.innerHTML = quiz.Q4[keys[i]];
        selctionDiv.appendChild(invention);

        let q4answer = document.createElement("span");
        q4answer.innerHTML = "";
        q4answer.className = "q4answer";
        selctionDiv.appendChild(q4answer);

        let linebreak = document.createElement("br");
        selctionDiv.appendChild(linebreak);
        q4Form.appendChild(selctionDiv);
    }
    
    let submitButton = document.createElement("input");
    submitButton.type = 'button';
    submitButton.value = 'Submit';

    let allSelections = document.getElementsByTagName("select");
    let scoreCount = 0;
    submitButton.onclick = function() {
      for (let z = 0; z < allSelections.length; z++){
        let selection = allSelections[z];
        let answerFields = q4Form.getElementsByClassName("q4answer");
        // the index the user has chosen for the current select
        let index = parseInt(selection.options[selection.selectedIndex].value);

        //if the date associated with the chosen index matches the id of the select element, it's correct
        if (q4dates[index - 1] === selection.id) {
          answerFields[z].innerHTML = "    Correct! The year is " + selection.id;
          answerFields[z].style.color = "green";
          scoreCount += 1;
        }else{
          answerFields[z].innerHTML = "    Incorrect! The year is " + selection.id;
          answerFields[z].style.color = "red";
        }
      }
      if (scoreCount == allSelections.length) {
        if (!q4Answered) {
          q4Answered = true;
          score += 1;
          quiz.updateScore();
          quiz.checkCompletion();
        }
      }else{
          if (!q4Answered) {
            q4Answered = true;
            quiz.checkCompletion();
          }
      }
    };
    q4Form.appendChild(submitButton);

};

quiz.checkCompletion = function() {
  if (q1Answered && q2Answered && q3Answered && q4Answered) {

    var r = confirm("Your score is " + score + ". Restart the game?");
    if (r == true) {
        score = 0;
        q1Answered = false;
        q2Answered = false;
        q3Answered = false;
        q4Answered = false;
        location.reload();
    } else {
    }
  } 

};
/**
 * Init function.
 */
 quiz.init = function() {
  this.updateScore();
  this.buildQ1();
  this.buildQ2();
  this.buildQ3();
  this.buildQ4();
};

// Initializing.
quiz.init();
