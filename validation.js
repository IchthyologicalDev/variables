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
                    this.message = 'Your code has an error at or before this question. Open up your console to see more information.'
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
    let actualType = typeof variable;
    if (variable === null) {
        message = 'Did you make a change yet? If so, make sure that you saved your file and refreshed this page!'
    }
    else if (actualType !== type) {
        message = `I was expecting a ${type}, but you entered ${actualType === 'undefined' ? actualType : `a ${actualType}`}.`;
    }
    return message;
}

const validateIchthyologistFocus = () => {
    let message = getTypeMessage(ichthyologistFocus, 'string');
    if (message === 'success') {
        if(ichthyologistFocus.toLowerCase() == 'fish') {
            return resultObject(true,'Correct! Ichthyologists study fish');
        }
        else {
            return resultObject(false,`Not quite, Ichthyologists don't study ${ichthyologistFocus}. Do a quick google search and try again!`);
        }
    }
    else {
        return resultObject(false, message);
    }
}

const validateDeveloperName = () => {
    let message = getTypeMessage(developerName, 'string');
    if(message === 'success') {
        return resultObject(true, `If you say your name is ${developerName}, that's what I'll call you! Have fun practicing data types, ${developerName}!`);
    } else {
        return resultObject(false, message);
    }
}

const validateNumberOfOceans = () => {
    let message = getTypeMessage(numberOfOceans, 'number');
    if (message === 'success') {
        switch(numberOfOceans) {
            case 1:
                return resultObject(true, '1 global ocean? ><> ><> ><> I\'ll accept that.');
            case 4:
                return resultObject(true, 'I learned that there were only 4 ocean basins as a kid, but the Southern Ocean is recognized as its own basin. This counts.');
            case 5:
                return resultObject(true, 'Nice job!');
            default:
                return resultObject(true, `I can't possibly know if the internet lied to you, or if the internet lied to me. I was expecting either 1, 4, or 5 as your answer, not ${numberOfOceans}. Since you put a number here, I'll take it.`)
        }
    }
    else {
        return resultObject(false, message);
    }
}

const validateHavingFun = () => {
    let message = getTypeMessage(havingFun, 'boolean');
    if (message === 'success') {
        message = havingFun ? "Glad that you're enjoying yourself!" : "Sorry that you're not having fun. Leave me a comment on Youtube if you have any suggestions.";
        return resultObject(true, message);
    }
    else {
        return resultObject(false, message);
    }
}

const validateHawaiianStateFish = () => {
    let message = getTypeMessage(hawaiianStateFish, 'string');
    if (message === 'success') {
        let fish = hawaiianStateFish.toLowerCase().replace("'",).replace('ā', 'a');
        switch (fish) {
            case 'humuhumunukunukuapuaa':
            case 'humuhumu':
                return resultObject(true, "Ae! The Humuhumunukunukuapua'a is Hawaii's state fish. Try saying that 10 times.");
            case 'reef triggerfish':
                return resultObject(false, "You're technically right, but Reef Triggerfish isn't as fun to say as its other name. Try again.");
            default:
                return resultObject(false, `Mahalo, but no, I was looking for humuhumunukunukuapua'a, not ${hawaiianStateFish}. At least you used a string!`)

        }
    }
    else {
        return resultObject(false, message);
    }
}

const validateCongoLength = () => {
    let message = getTypeMessage(congoLength, 'number');
    if (message === 'success') {
        message = congoLength === 4370 ? `Correct! The Congo River is ${congoLength} km long.` : `Hmmm. I thought it was 4370 km long. If you say it's ${congoLength} km, I'll take your word for it.`;
        return resultObject(true, message);
    }
    else {
        return resultObject(false, message);
    }
}

const validateHaveCaughtFish = () => {
    let message = getTypeMessage(haveCaughtFish, 'boolean');
    if (message === 'success') {
        message = 'Nothing wrong with that.'
        if(haveCaughtFish) {
            message = 'Good for you!'
        }
        return resultObject(true, message);
    }
    else {
        return resultObject(false, message);
    }
}

const validateBigInteger = () => {
    let message = getTypeMessage(bigInteger, 'bigint');
    if (message === 'success') {
        if (bigInteger > Number.MAX_SAFE_INTEGER) {
            message = `${bigInteger} truly is a big integer.`
        }
        else {
            return resultObject(false, `I want a BIG integer. Make sure it's larger than ${Number.MAX_SAFE_INTEGER}n.`);
        }
        return resultObject(true, message);
    }
    else {
        return resultObject(false, message);
    }
}

const validateJavaScriptIsRarelyUsed = () => {
    let message = getTypeMessage(javaScriptIsRarelyUsed, 'boolean');
    if (message === 'success') {
        if(!javaScriptIsRarelyUsed) {
            return resultObject(true, 'Correct! At the time of writing, JavaScript is by far the most used programming language. Do a search for "does X company use JavaScript?" and look at the results. I\'d bet the answer is yes.');
        }
        return resultObject(false, 'Nope. JavaScript is heavily used. Even if you don\'t think it should be.');
    }
    else {
        return resultObject(false, message);
    }
}

const validateBigIntWorksForDecimals = () => {
    let message = getTypeMessage(bigIntWorksForDecimals, 'boolean');
    if (message === 'success') {
        if(!bigIntWorksForDecimals) {
            return resultObject(true, 'Correct! The bigint data type only works for integers. It\'s in the name.');
        }

        return resultObject(false, 'Nope. Integers refer to non-decimal numbers. That means bigint is only for big integers. If you don\'t believe me, try it out in your console!');
    }
    else {
        return resultObject(false, message);
    }
}

const validateLargeNumber = () => {
    let message = getTypeMessage(largeNumber, 'bigint');
    if (message === 'success') {
        if (largeNumber === 9007199254740993n) {
            return resultObject(true, 'Correct! Did you know that 9007199254740993 can\'t be stored as a regular integer? If you try, it turns back into 9007199254740992.');
        }
        return resultObject(false, 'That\'s not how you write 9007199254740993n');
    }
    else {
        return resultObject(false, message);
    }
}

const validateTotalNaSalmonSpecies = () => {
    let message = getTypeMessage(totalNaSalmonSpecies, 'number');
    if (message === 'success') {
        if(totalNaSalmonSpecies === 6) {
            return resultObject(true, 'Correct! There are 6. My favorite is the Sockeye/Red salmon.');
        }
        if(totalNaSalmonSpecies < 6) {
            message = `There are more than ${totalNaSalmonSpecies} species native to North America. Did you include both coasts?`;
        }
        else {
            message = `Reel it back a little. There aren't quite ${totalNaSalmonSpecies} salmon species that are native to North America.`;
        }
        return resultObject(false, message);
    }
    else {
        return resultObject(false, message);
    }
}

const validateLongestRiver = () => {
    let message = getTypeMessage(longestRiver, 'string');
    if (message === 'success') {
        if(longestRiver.toLowerCase() === 'nile') {
            return resultObject(true, 'Correct! Not only is da Nile the longest river in the world, but it\'s a mindset that developers frequently have to combat!');
        }
        else {
            return resultObject(false, `If you're in denial that it's not the ${longestRiver}, then you should know what to guess next.`);
        }
    }
    else {
        return resultObject(false, message);
    }
}

const validateSeenAllTypes = () => {
    let message = getTypeMessage(seenAllTypes, 'boolean');
    if (message === 'success') {
        if(!seenAllTypes) {
            return resultObject(true, 'Correct! You\'re missing out on Symbol, undefined, null, and the endless flexibility of objects (which null happens to be)');
        }
        return resultObject(false, 'Even if you\'ve seen all types, they weren\'t covered in this exercise.');
    }
    else {
        return resultObject(false, message);
    }
}

//NOTE: The order of questions in this array must match the order of requirements on the DOM and in the index.js file.
const questions = [
    question(validateIchthyologistFocus),
    question(validateDeveloperName),
    question(validateNumberOfOceans),
    question(validateHavingFun),
    question(validateHawaiianStateFish),
    question(validateCongoLength),
    question(validateHaveCaughtFish),
    question(validateBigInteger),
    question(validateJavaScriptIsRarelyUsed),
    question(validateBigIntWorksForDecimals),
    question(validateLargeNumber),
    question(validateTotalNaSalmonSpecies),
    question(validateLongestRiver),
    question(validateSeenAllTypes),
]

runValidation(questions);