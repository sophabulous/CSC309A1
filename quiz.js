'use strict';


var quiz = quiz || {};
var score = 0;
var q1Answered = false;
var q2Answered = false;
var q3Answered = false;
var q4Answered = false;

//dictionaries that keeps the data for each question
// in quiz.Q1 the names are the keys, and the explanations are values
quiz.Q1 = {
  "HAL 9000": "Incorrect: The HAL 9000 is a fictional computer from Arthur C. Clarke's 2001: A Space Odyssey.",
  "FERUT": "Correct: The machine arrived in Canada on April 30, 1952.  Named FERUT (FERranti U of T), it was used to compute changes in water levels due to the opening of the St. Lawrence Seaway.",
  "ILLIAC": "Incorrect: The ILLIAC was built at the University of Illinois. It was the first von Neumann architecture computer built and owned by an American university. It was put into service on September 22, 1952.",
  "UNIVAC": "Incorrect:  The UNIVAC was the first commericial computer produced in the United States, and was designed by J. Presper Eckert and John Mauchly.  The United States Census Department received delivery of the first UNIVAC in May 1952."
};

quiz.Q2 = ["loop", "inline", "keyboard", "interpreter", "function", "block", "character", "variable"];

// in quiz.Q3 use the professor's names as the keys and the fame as values
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

// in quiz.Q4 user the dates as the keys and the events as the values
quiz.Q4 = {
  "1940": "The First Computer Network",
  "1971": "First Microprocessor: Intel 4004",
  "1957": "First Popular High-Level Language: FORTRAN",
  "1953": "First Open Source Software: A-2 System",
  "1951": "First Compiler for Electronic Computer: A-0 System",
  "1841": "First Computer Program",
  "1967": "First Object Oriented Programming Language: Simula"

};

//updates the score by updating the score label with the most current score
quiz.updateScore = function(){
    var scoreLabel = document.getElementById("score");
    scoreLabel.innerHTML = "Score: " + score.toString();
};

//Fisher-Yates algorithm for randomizing arrays
quiz.shuffle = function(sourceArray){
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
};

// build Q1
quiz.buildQ1 = function() {
    // get the area with the id "q1form" and append the contents of q1 to it
    let q1Form = document.getElementById("q1form");
    
    // iterate through every key of the dictioanry quiz.Q1
    for (let key in quiz.Q1){
        // create a radio button for each key
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "option"
        //setting the value of the radio button to the key
        input.value = key;
        input.onclick = function() {
            // retrieve the p element for holding the explanations 
            // then store it in answer
            let answer = document.getElementById(this.value);
            if (answer != null) {
              // if the answer is not null, set the innerHTML of answer
              // to the explanation that the selected name corresponds to
              answer.innerHTML = quiz.Q1[this.value];
              // if the answer is correct, update the score and check completion 
              // of the quiz, and set the answer to the colour green
              if (this.value === "FERUT"){
                // if this is the first time this question has been answered,
                // add 1 to the score
                answer.style.color = "green";
                if (!q1Answered) {
                  score += 1;
                  q1Answered = true;
                  quiz.updateScore();
                  quiz.checkCompletion();
                }
              }else{
                // if the answer is incorrect, check completion 
                // of the quiz, and set the answer to the colour green
                answer.style.color = "red";
                if (!q1Answered) {
                  // if this is the first time the question has been answered, 
                  // set q1Answered to true
                  q1Answered = true;
                  quiz.checkCompletion();
                }
              }
              // hide the explanation of every other option that are not selected 
              for (let option in quiz.Q1){
                if (option !== this.value) {
                  let otherAnswer = document.getElementById(option);
                  otherAnswer.innerHTML = "";
                }
              }
            }
        };
        // append the radio button
        q1Form.appendChild(input);
        // append the names after the radio button
        q1Form.appendChild(document.createTextNode(key));
        // insert a new line
        let linebreak = document.createElement("br");
        // append the new line
        q1Form.appendChild(linebreak);
        // create a p element for the explanation and append it after the new line
        let explanationNode = document.createElement("p");
        // set the id for each p element to the name
        explanationNode.id = key;
        q1Form.appendChild(explanationNode);

    }
    
    // append the button that displays all explanations
    let submitButton = document.createElement("input");
    submitButton.type = 'button';
    submitButton.value = 'Display All Explanations';
    
    // iterate through every name in Q1 and set the innerHTML of
    // each of their corresponding p elements to their explanations
    submitButton.onclick = function() {
        for (let key in quiz.Q1){
          let a = document.getElementById(key);
          a.innerHTML = quiz.Q1[key];
        }
    };
    q1Form.appendChild(submitButton);
};

// build Q2
quiz.buildQ2 = function() {
    // get the area by id "q2form" and append corresponding content to it
    let q2Form = document.getElementById("q2form");

    // iterate through every key of the dictioanry quiz.Q1
    for (let i = 0; i < quiz.Q2.length; i++){
        // create a checkbox for each key
        let input = document.createElement("input");
        input.type = "checkbox";
        input.name = "word";
        input.value = quiz.Q2[i];

        // apend to checkbox to q2Form
        q2Form.appendChild(input);
        // append the words after the checkbox
        q2Form.appendChild(document.createTextNode(quiz.Q2[i]));
        // append a new line
        let linebreak = document.createElement("br");
        q2Form.appendChild(linebreak);
    }

    // create a submit button
    let submitButton = document.createElement("input");
    submitButton.type = 'button';
    submitButton.value = 'Submit';
    submitButton.onclick = function() {
      // count keeps track of how many elements are checked
      let count = 0; 
      // create empty array answers
      let answers = [];
      // iterate through all the elements in q2Form, find the ones that
      // are checkboxes and store them into answers if they are checked
      for (let i = 0; i < q2Form.elements.length; i++) { 
        let obj = q2Form.elements[i]; 
        if (obj.type == "checkbox" && obj.checked) { 
          // use the index of the checked element as key and their value as the value
          answers[count] = obj.value;
          // increment count if the element is a checkbox
          count++; 
        } 
      }
      // create variable response to hold the element that has the 
      let response = document.getElementById("q2response");
      if (count > 2) {
        // if more than 2 options are checked
          response.style.color = "orange";
          response.innerHTML = "Only two words can be selected. Please try again.";
      }else if (count < 2) {
        // if less than 2 options are checked
          response.style.color = "orange";
          response.innerHTML = "Your answer is incomplete.  Please select another word.";    
      }else{
          // if only 2 options were checked

          //if both answers are correct
          if (answers[0] === "function" && answers[1] === "variable") {
            response.style.color = "green";
            if (!q2Answered) {
              q2Answered = true;
              score += 2;
              quiz.updateScore();
              quiz.checkCompletion();
            }
            response.innerHTML = "Correct: Yes!  It is hard to believe that words we take for granted in computing were once so new.";
          // if one of the answers is correct
          }else{
            response.style.color = "red";
            if (answers[0] === "function" || answers[0] === "variable") {
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
      }
    };

    // append the submit button
    q2Form.appendChild(submitButton);
    // create a p element for the response and append it after the submit button
    let responseNode = document.createElement("p");
    // set the id for each of the response to the word they are associated with
    responseNode.id = "q2response";
    q2Form.appendChild(responseNode);
};

// build Q3
quiz.buildQ3 = function() {
    // get the areas by the class names "professors" and "fame"
    // and append corresponding content to them
    var nameField = document.getElementsByClassName("professors")[0];
    var fameField = document.getElementsByClassName("fame")[0];
    // use option to keep track of the current prof name that user clicked on
    let option = "";

    // create letter index for putting in front of the options
    let index = "a";
    // use counter to increment the letter index
    let counter = 0;
    // iterate through all the keys in quiz.Q3
    for (let key in quiz.Q3){
        // create the a p element that corresponse to the prof's name for each key
        let prof = document.createElement("p");
        // set the innerHTML of the p element to the letter index and the prof's name
        prof.innerHTML = String.fromCharCode(index.charCodeAt(0) + counter) + ". " + key;
        // set the id of the p element to the letter index it corresponds to
        prof.id = String.fromCharCode(index.charCodeAt(0) + counter);
        prof.onclick = function() {
        // set option to the prof name that is clicked on 
            option = this.id;
        };
        // append the prof to nameField
        nameField.appendChild(prof);
        // append a line break
        let linebreak = document.createElement("br");
        nameField.appendChild(linebreak);
        // increment the counter
        counter++;
    }

    // let keys equal to the keys of quiz.Q3 and shuffle it
    let keys = quiz.shuffle(Object.keys(quiz.Q3));

    // iterate through every key in keys
    for (let i = 0; i < keys.length; i++){
        // create a p element for each fame
        let fame = document.createElement("p");
        // set the id of the fame to the professor they correspond to
        fame.id = keys[i];
        // set the innerHTML of the p element to a placeholder where the letter the user selected will be,  
        // the text of the fame, and a placeholder for all the right answers
        fame.innerHTML = " <span class='placeholder'></span>" + quiz.Q3[keys[i]] + " <span class='q3answer'> </span>";
        fame.onclick = function() {
            //find the placeholder of the current fame and change the text to the letter the use just clicked on
            let placeholder = this.getElementsByClassName("placeholder");
            placeholder[0].innerHTML = option;

            let answerCount = 0;
            // retrieve all the placeholders inside answerField and store them in all_placeholders
            let all_placeholders = fameField.getElementsByClassName("placeholder");
            // iterate through every place holder
            for (let i = 0; i < all_placeholders.length; i++) {
              // if the place holder has been filled, increment answerCount by 1
              if (all_placeholders[i].innerHTML !== "") {
                answerCount += 1;
              }
            }

            // if all the placeholders have been filled, check correctness
            if (answerCount == keys.length) {
              // retrieve all the fame objects and store them in all_fame
              let all_fame = fameField.getElementsByTagName("p");
              // recreate all the placeholders for the right answers and store them in answerFields
              let answerFields = fameField.getElementsByClassName("q3answer");
              // iterate through all the right answer placeholders
              for (let i = 0; i < answerFields.length; i++) {
                // retrieve the prof name that the user has chosen for this paticular 
                // fame and store it in matchedAnswer
                let matchedAnswer = document.getElementById(all_placeholders[i].innerHTML); 
                // if the prof the user has chosen matches the prof the fame corresponde to
                // show that the answer is correct
                if (matchedAnswer.innerHTML.indexOf(all_fame[i].id) != -1) {
                  answerFields[i].innerHTML = "<br> Correct!";
                  answerFields[i].style.color = "green";
                  if (!q3Answered) {
                    score += 0.5;
                    quiz.updateScore();
                  }
                }else{
                  // if the names don't match, show that the answer is incorrect
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
        // append the fame to fameField
        fameField.appendChild(fame);
        // append a new line
        let linebreak = document.createElement("br");
        fameField.appendChild(linebreak);
    }

};

// build Q4
quiz.buildQ4 = function() {
    // get the area by the id "q4form" and append corresponding content to it
    let q4Form = document.getElementById("q4form");
    // let keys be the keys of quiz.Q4 and shuffle it
    let keys = quiz.shuffle(Object.keys(quiz.Q4));
    // store all the dates in quiz.Q4 in q4dates
    let q4dates = Object.keys(quiz.Q4);
    // sort the dates so that they are in increasing order
    q4dates.sort();

    // iterate through all the keys
    for (let i = 0; i < keys.length; i++){
        // for every key create a select drop down element
        let selctionDiv = document.createElement('div');
        // set the class name for css styling
        selctionDiv.className = "selection";
        // for each select element, set the id to the date 
        let selectList = document.createElement("select");
        selectList.id = keys[i];
        // append the select element
        selctionDiv.appendChild(selectList);

        // Create and append the options. Iterate through all the
        // keys and use the index as the options
        for (let j = 0; j < keys.length; j++) {
            let option = document.createElement("option");
            option.value = (j + 1).toString();
            option.text = (j + 1).toString();
            selectList.appendChild(option);
        }

        // create and append a span element for the event
        let invention = document.createElement("span");
        invention.innerHTML = quiz.Q4[keys[i]];
        selctionDiv.appendChild(invention);

        // create and append a span element for the 
        // placeholder of the right answers
        let q4answer = document.createElement("span");
        q4answer.innerHTML = "";
        q4answer.className = "q4answer";
        selctionDiv.appendChild(q4answer);

        // append a newline
        let linebreak = document.createElement("br");
        selctionDiv.appendChild(linebreak);
        q4Form.appendChild(selctionDiv);
    }
    
    // create the submit button
    let submitButton = document.createElement("input");
    submitButton.type = 'button';
    submitButton.value = 'Submit';

    // retrieve all the select elements and store them in all_selections
    let allSelections = document.getElementsByTagName("select");
    let scoreCount = 0;

    submitButton.onclick = function() {
      // iterate through all the select elements
      for (let z = 0; z < allSelections.length; z++){
        let selection = allSelections[z];
        // retrieve all the right answer placeholders and store them in answerField 
        let answerFields = q4Form.getElementsByClassName("q4answer");
        // get the index of the current select
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
      // check if the user got all the orders right
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

    // append the submit button
    q4Form.appendChild(submitButton);
};

// check the completion of the quiz
quiz.checkCompletion = function() {
  // if every question has been answered create alert
  if (q1Answered && q2Answered && q3Answered && q4Answered) {
    setTimeout(function(){
      // set message of alertbox
      var r = confirm("Your score is " + score + ". Restart the quiz?");
      if (r == true) {
        // if the user choose to restart the quiz, set score back to 0 and
        // all the question boolean variables to false
          score = 0;
          q1Answered = false;
          q2Answered = false;
          q3Answered = false;
          q4Answered = false;
          location.reload();
      }
    },500);   // put 0.5 sec delay so that user can see all the results and updated score
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
