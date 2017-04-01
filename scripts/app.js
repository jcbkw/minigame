/**
 * Starts the game
 */
app.init = function () {
    
    app.stage.render(document.body);
    app.player.render(app.stage.element);

};

/**
 * Called upon DOM Ready. Initializes the app.
 */
app.onReady = function () {
    
    document.addEventListener('DOMContentLoaded', this.init, false);

};

app.onReady();