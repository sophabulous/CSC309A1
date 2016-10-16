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
var q1 = document.getElementById('q1');
var q2 = document.getElementById('q2');
var q3 = document.getElementById('q3');
var q4 = document.getElementById('q4');
var score = 0;
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

/**
 * Detects presence of class in an element.
 * Return true if element has the class cls, false otherwise.
 *
 * @param {object} element
 * @param {string} cls
 * @return {boolean}
 */
 quiz.elementHasClass = function(element, cls) {
  return element.classList.contains(cls);
};

quiz.checkAnswerForQ1 = function(element, key){
    element.style.visibility='visible';
};

 quiz.buildQ1 = function() {
    var q1Form = document.getElementById('q1form');
    for (var key in quiz.Q1){
        var label = document.createElement("label");
        var input = document.createElement('input');
        input.type = 'radio';
        input.value = key;

        var linebreak = document.createElement('br');
        label.appendChild(input);
        label.appendChild(document.createTextNode(key));
        label.appendChild(linebreak);

        let explanationNode = document.createElement('p');
        explanationNode.id = key;
        explanationNode.textContent = quiz.Q1[key];
        explanationNode.style.visibility='hidden';
        label.appendChild(explanationNode);

        q1Form.appendChild(label);
    }

    var submitButton = document.createElement("input");
    submitButton.type = 'submit';
    submitButton.value = 'Display All Explanations';
    q1Form.appendChild(submitButton);

};


/**
 * Init function.
 */
 quiz.init = function() {
  this.buildQ1();
};

// Initializing.
quiz.init();
