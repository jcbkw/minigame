/* global app */

(function () {

    var queuedForTick = [];

    /**
     * Tells whether the game is paused.
     * 
     * @type Boolean
     */
    app.paused = false;

    /**
     * Calls the provided callback function on each tick.
     * 
     * @param {Function} callback The function to be called.
     */
    app.onTick = function (callback) {

        queuedForTick.push(callback);

    };

    /**
     * Removes the provided callback function from the tick queue.
     * 
     * @param {Function} callback The function to be removed from the tick queue.
     */
    app.unTick = function (callback) {

        var index = queuedForTick.indexOf(callback);

        if (index !== -1) {

            queuedForTick.splice(index, 1);

        }

    };

    /**
     * Initializes the main objects and
     * starts the game.
     * 
     * @private
     */
    function init () {
        
        app.stage.render(document.body);
        app.player.render(app.stage.element);
        app.joystick.init();
        app.player.init();
        app.player.weapon = new app.blueprints.weapons.Gun(app.player);

        // start ticking
        setInterval(tick, 17);
        
    };

    /**
     * Called upon DOM Ready in order to
     * initializes the app.
     * 
     * @private
     */
    function onReady () {
        
        document.addEventListener('DOMContentLoaded', init, false);

    };

    /**
     * Sequentially calls each one of the callback functions
     * passed to app.onTick on each tick (approx 60 times per second).
     * 
     * @private
     */
    function tick () {

        if (!app.paused) {

            for (var i = 0, count = queuedForTick.length, fn; i < count; i += 1) {

                fn = queuedForTick[i];

                fn && fn();

            }

        }

    }

    // begin
    onReady();

})();