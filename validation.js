/*
WARNING!!!!!
This file checks your work. If you make changes to this file, then the tests might not work.
*/

/*
TEMPLATE GUIDE
Remove this comment after you've made changes to a new exercise.

A recommended pattern is to create functions for each requirement.  
*/

const UNCHANGED_MESSAGE = 'Did you make a change yet? If so, make sure that you saved your file and refreshed this page!'

/**
 * Clears all nested content from an element
 * @param {HTMLElement} element - element to clear
 */
const clearElement = (element) => {
    while(element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Writes a result message to the DOM
 * @param {number} questionIndex - DOM index for this question
 * @param {string} result - message to be written
 * @param {boolean} success - whether the test passed
 */
const writeResult = (questionIndex, result, success) => {
    const resultElement = document.querySelectorAll('.problem-container > .question')[questionIndex].querySelector('.result');
    clearElement(resultElement);
    const textNode = document.createTextNode(result);
    resultElement.appendChild(textNode);

    if(success) {
        resultElement.classList.add('pass');
    }
    else if (result !== UNCHANGED_MESSAGE) {
        resultElement.classList.add('fail');
    }

}

/**
 * Main function. Runs validation on all provided questions.
 * @param {Object[]} questions - Array of questions
 */
const runValidation = (questions) => {
    questions.forEach((question, index) => {
        question.validate();

        writeResult(index, question.message, question.passed);
    });
}

/**
 * Creates a question object.
 * @param {function} validator - function that returns a boolean based on this question passing
 * @param {string} success - message if result passes validation
 * @param {string} failure  - message if result fails validation
 * 
 * @returns {Object} - question object
 */
const question = (validator) => {
    return {
        validate: function () {
            try {
                const { passed, message } = validator();
                this.message = message;
                this.passed = passed;
            }
            catch (e) {
                if (e.name === 'ReferenceError') {
                    this.message = 'I couldn\'t find your answer. There is either an error or a typo at or before this question.';
                    this.passed = false;
                }
            }
        }
    }
}

/**
 * 
 * @param {boolean} passed - Whether the requirement was met
 * @param {string} message - message to display
 * @returns {object} - Result Object
 */
const resultObject = (passed, message) => ({ passed, message })

/*
***********************************************************************************
*************************************IMPORTANT*************************************
***********************************************************************************
Everything below can be safely removed from the template. You MIGHT want to keep the 
getTypeMessage function, depending on the problems that you have in mind. Perhaps 
additional helper methods will be added later. This template will be updated accordingly.
There is a short example of what validation functions might look like, as well as an
example of triggering validation.
***********************************************************************************
***********************************************************************************
*/


/**
 * A guard clause that returns a message depending on the success or issue.
 * @param {*} variable - The variable being changed for this requirement
 * @param {string} type - Data type that this variable should be
 * @returns {string} - "success" if the type matches, otherwise a message to be displayed to the user
 */
const getTypeMessage = (variable, type) => {
    let message = 'success';
    if(type === 'null' && variable === null) {
        return message;
    }
    let actualType = typeof variable;
    if (actualType !== type) {
        message = `I was expecting ${type === 'undefined' ? type : `a ${type}`}, but you entered ${actualType === 'undefined' ? actualType : `a ${actualType}`}.`;
    }
    return message;
}

const instantiatedWith = (variableName) => {
    //global variables instantiated with var go to the window 
    if(window.hasOwnProperty(variableName)) {
        return 'var';
    }
    try{
        //If you find a better way to check for const vs let with a dynamic variable name, TELL ME!
        eval(
            `const temp = ${variableName};
            ${variableName} = 'blah';
            ${variableName} = temp;`
        )
    } catch (e) {
        if(e.message === 'Assignment to constant variable.') {
            return 'const';
        }
        //If there was an error that wasn't a const error, just throw the error and let it be handled elsewhere.
        throw e;
    }
    return 'let';
}

const VAR_WARNING = 'STOP!!! Use "let" or "const" when you instantiate variables.';
const CONST_WARNING = 'The const keyword doesn\'t allow for reassignment. I\'ll let you figure out the correct keyword to use.';

const validateTimeAsDev = () => {
    let message = getTypeMessage(timeAsDev, 'number');
    if(message === 'success') {
        let keyword = instantiatedWith('timeAsDev');
        if(keyword == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        if(keyword == 'const') {
            return resultObject(false, CONST_WARNING);
        }
        const timeAsDevYears = Math.floor(timeAsDev / 365);
        if(timeAsDev < 0) {
            message = "If you're doing this exercise, you're a dev. Or you\'re a time traveller...";
        }
        else if (timeAsDevYears > 99) {
            message = `Wow, you've been writing code for ${timeAsDevYears} years? Are you a Greenland Shark?`;
        }
        else if (timeAsDevYears >= 1) {
            message = 'What are you doing here? Go build some projects!';
        }
        else {
            message = 'Welcome to JavaScript! While this language seems fishy at times, it can be quite fun.';
        }
        return resultObject(true, message);
    } else {
        return resultObject(false, message);
    }
}

const validateBassGenus = () => {
    let message = getTypeMessage(bassGenus, 'string');
    if (message === 'success') {
        if(instantiatedWith('bassGenus') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        if(bassGenus.toLowerCase() == 'micropterus') {
            if(bassGenus[0] == 'm') {
                message = 'I\'ll give you credit, but a genus should have its first letter capitalized.';
            }
            else {
                message = 'Correct! Micropterus means little fin. The name arose from mistakenly thinking there was a third small dorsal fin on a smallmouth bass.'
            }
            return resultObject(true, message);
        }
        else {
            return resultObject(false,`${bassGenus} isn't what I found. I had "Micropterus".`);
        }
    }
    else {
        return resultObject(false, message);
    }
}

const validateIsVarPreferred = () => {
    let message = getTypeMessage(isVarPreferred, 'boolean');
    if (message === 'success') {
        if(instantiatedWith('isVarPreferred') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        if(isVarPreferred) {
            return resultObject(false, 'NOOOOOOOOOOO!!!!!! You should not use var when writing modern (since 2015) JavaScript.')
        }
        return resultObject(true, 'Yarrrr, var be antiquated.');
    }
    else {
        return resultObject(false, message);
    }
}

const validateGallonsWaterOnEarth = () => {
    let message = getTypeMessage(gallonsWaterOnEarth, 'bigint');
    if (message === 'success') {
        if(instantiatedWith('gallonsWaterOnEarth') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        if (1000000000000000000n < gallonsWaterOnEarth && gallonsWaterOnEarth < 1000000000000000000000n) {
            return resultObject(true, 'Holy Mackeral, thats a lot of water.')
        }
        else {
            return resultObject(false, `Google tells me 326 million trillion, which is 326000000000000000000n gallons.`);
        }
    }
    else {
        return resultObject(false, message);
    }
}

const validateVariablesThusFar = () => {
    let message = getTypeMessage(variablesThusFar, 'number');
    if(message === 'success') {
        let keyword = instantiatedWith('variablesThusFar');
        if(keyword == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        if(keyword == 'const') {
            return resultObject(false, CONST_WARNING);
        }
        if (variablesThusFar == 4) {
            return resultObject(true, 'Four, so far.')
        }
        else if (variablesThusFar == 11) {
            return resultObject(true, 'Didn\'t this used to be 4? I must be dreaming.');
        }
        else {
            return resultObject(false, 'Total number of variables you made BEFORE this question.')
        }
    } else {
        return resultObject(false, message);
    }
}

const validateFeetInFathom = () => {
    let message = getTypeMessage(feetInFathom, 'number');
    if(message === 'success') {
        if(instantiatedWith('feetInFathom') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        if (feetInFathom == 6) {
            return resultObject(true, 'Correct! There are a lot of interesting nautical measurements based on fathoms.');
        }
        return resultObject(false, 'If you can\'t fathom a guess here, go to Google!')
    } else {
        return resultObject(false, message);
    }
}

const validateFishPluralForm = () => {
    let message = getTypeMessage(fishPluralForm, 'string');
    if (message === 'success') {
        if(instantiatedWith('fishPluralForm') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        const fishPlural = fishPluralForm.toLowerCase();
        if(fishPlural === 'fishes') {
            return resultObject(true, 'You get 1 million bonus points. Ichthyologists use "fishes" to refer to multiple fish of different species, but most people just use "fish".');
        }
        if(fishPlural === 'fish') {
            return resultObject(true, 'I also accept "fishes". Just don\'t actually send them to me.')
        }
        else {
            return resultObject(false, `There are 10 different ${fishPluralForm} swimming around. Wait, that doesn't sound right. Try again!`);
        }
    }
    else {
        return resultObject(false, message);
    }
}

const validateUpdatedTimeAsDev = () => {
    let message = getTypeMessage(timeAsDev, 'number');
    if(message === 'success') {
        return resultObject(true, 'See message from requirement 5.');
    } else {
        return resultObject(false, message);
    }
}

const validateCanChangeLet = () => {
    let message = getTypeMessage(canChangeLet, 'boolean');
    if (message === 'success') {
        if(instantiatedWith('canChangeLet') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        if(canChangeLet) {
            return resultObject(true, 'let result = false; result = true; Nice job!')
        }
        return resultObject(false, 'Try it out! (or just go with the only other option).');
    }
    else {
        return resultObject(false, message);
    }
}

const validateJsDefaultValue = () => {
    let message = getTypeMessage(jsDefaultValue, 'undefined');
    if(message === 'success') {
        if(instantiatedWith('jsDefaultValue') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        return resultObject(true, 'Correct! Simply typing "let jsDefaultValue;" is the simplest solution, since undefined is the default value.');
    }
    else {
        return resultObject(false, message);
    }
}

const validateNullVsUndefined = () => {
    let message = getTypeMessage(nullVsUndefined, 'string');
    if (message === 'success') {
        if(instantiatedWith('nullVsUndefined') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        message = 'Null represents the intentional lack of a value, where undefined is JavaScript\'s placeholder when a value wasn\'t assigned.'
        return resultObject(true, `I'll trust that you wrote: ${message}${message === nullVsUndefined ? '' : `Oh wait, you wrote ${nullVsUndefined}`}`);
    }
    else {
        return resultObject(false, message);
    }
}

const validateUserOmitted = () => {
    let message = getTypeMessage(userOmitted, 'null');
    if (message === 'success') {
        if(instantiatedWith('userOmitted') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        return resultObject(true, `Oh no, the userOmitted variable was ${userOmitted}. Wait, that's what I wanted. Nice job!`);
    }
    else {
        return resultObject(false, message);
    }
}

const validateStonefishAreSteps = () => {
    let message = getTypeMessage(stonefishAreSteps, 'boolean');
    if (message === 'success') {
        if(instantiatedWith('stonefishAreSteps') == 'var') {
            return resultObject(false, VAR_WARNING);
        }
        if(stonefishAreSteps) {
            return resultObject(false, 'You\'d only do make that mistake once. They release neurotoxins if stepped on, because what doesn\'t try to harm you in Australia?');
        }
        return resultObject(true, 'Correct! You definitely don\'t want to step on these.');
    }
    else {
        return resultObject(false, message);
    }
}

//NOTE: The order of questions in this array must match the order of requirements on the DOM and in the index.js file.
const questions = [
    question(validateTimeAsDev),
    question(validateBassGenus),
    question(validateIsVarPreferred),
    question(validateGallonsWaterOnEarth),
    question(validateVariablesThusFar),
    question(validateFeetInFathom),
    question(validateFishPluralForm),
    question(validateUpdatedTimeAsDev),
    question(validateCanChangeLet),
    question(validateJsDefaultValue),
    question(validateNullVsUndefined),
    question(validateUserOmitted),
    question(validateVariablesThusFar),
    question(validateStonefishAreSteps),
]

runValidation(questions);