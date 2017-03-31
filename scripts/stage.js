/**
 * Draws the game stage
 * @param {Element} parentElement 
 */
function renderStage (parentElement) {

    var stageElement = document.createElement('main');

    stageElement.classList.add('stage');
    
    stageElement.style.width = "300px";
    stageElement.style.height = "300px";

    parentElement.appendChild(stageElement);

}