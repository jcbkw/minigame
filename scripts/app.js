/* global app, ns */

(function () {
           
    var queuedForTick = [],
        queuedForTickMaxLength = 32000,
        api = {};
    
    /**
     * Tells whether the game is paused.
     * 
     * @type Boolean
     */
    api.paused = false;

    /**
     * Calls the provided callback function on each tick.
     * 
     * @param {Function} callback The function to be called.
     */
    api.onTick = function (callback) {
        
        cleanseQueue();
        queuedForTick.push(callback);
        
    };
    
    /**
     * Calls the provided callback function once, on
     * the next tick only.
     * 
     * @param {Function} callback The function to be called.
     */
    api.nextTick = function (callback) {
        
        api.onTick(function oneTimer () {
           
            callback && callback();
            app.unTick(oneTimer);
            
        });
        
    };

    /**
     * Removes the provided callback function from the tick queue.
     * 
     * @param {Function} callback The function to be removed from the tick queue.
     */
    api.unTick = function (callback) {

        var index = queuedForTick.indexOf(callback);

        if (index !== -1) {

            queuedForTick[index] = null;

        }

    };

    /**
     * Initializes the main objects and
     * starts the game.
     * 
     * @private
     */
    function init () {
        
        app.stage = new app.classes.game.Stage(document.body, 300, 300);
        app.stage.render();
        
        app.player = new app.classes.game.characters.Player(app.stage, 0, 0, 32, 32);
        
        app.player.group.add('alice');
        app.player.boundToContainer();
        app.player.render();
                
        app.player.setWeapon(new app.classes.game.weapons.Gun());
        
        app.player.moveTo((app.stage.width / 2) - (app.player.width / 2), 
                           app.stage.height - app.player.height);
                           
        app.player.setStance(app.classes.geom.Direction.UP);
        
        app.ai = new app.classes.game.ai.ZombieRaid(app.stage);
        app.ai.start();
                
        // start ticking
        requestAnimationFrame(tick);
        
        
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
        
        requestAnimationFrame(tick);

    }
    
    function cleanseQueue () {
        
        var newQueue,
            callback,
            count = queuedForTick.length >>> 0,
            i;
        
        if (count > queuedForTickMaxLength) {
            
            newQueue = [];
            
            for (i = 0; i < count; i += 1) {
                
                callback = queuedForTick[i];
                
                if (callback) {
                    
                    newQueue.push(callback);
                    
                }
                
            }
            
            queuedForTick = newQueue;
            
        }
        
    }
    
    ns.set('app', api);
    
    // begin
    onReady();
    
})();