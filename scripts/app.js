(function () {

    var queuedForTick = [];

    /**
     * Tells whether the game is paused.
     * 
     * @type Boolean
     */
    app.paused = false;

    /**
     * Starts the game
     */
    app.init = function () {
        
        app.stage.render(document.body);
        app.player.render(app.stage.element);
        app.joystick.init();
        app.player.init();

        // start ticking
        setInterval(tick, 17);
        
    };

    /**
     * Called upon DOM Ready. Initializes the app.
     */
    app.onReady = function () {
        
        document.addEventListener('DOMContentLoaded', this.init, false);

    };

    /**
     * Calls the provided callback function on each tick.
     * 
     * @param Function callback The function to be called.
     */
    app.onTick = function (callback) {

        queuedForTick.push(callback);

    };

    /**
     * Sequentially calls each one of the callback functions
     * passed to app.onTick on each tick (approx 60 times per second).
     * 
     * @private
     */
    function tick () {

        if (!app.paused) {

            for (var i = 0, count = queuedForTick.length; i < count; i += 1) {

                queuedForTick[i]();

            }

        }

    }

    app.onReady();

})();
