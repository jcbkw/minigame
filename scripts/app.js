/**
 * Starts the game
 */
function init () {

    renderStage(document.body);

}

/**
 * Called upon DOM Ready. Initializes the app.
 */
function onReady () {

    document.addEventListener('DOMContentLoaded', init, false);

}

onReady();