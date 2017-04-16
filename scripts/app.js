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
        
        function oneTimer () {
           
            callback && callback();
            app.unTick(oneTimer);
            
        }
        
        api.onTick(oneTimer);
        
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
        
        app.viewport = new app.classes.game.Viewport(document.body, 300, 300);
        app.viewport.render();
        
        app.stage = new app.classes.game.Stage(app.viewport, 0, 0, 1574, 1070);
        app.stage.boundToContainer();
        app.stage.render();
        
        app.player = new app.classes.game.characters.Player(app.stage, 0, 0, 32, 32);
        
        app.player.group.add('alice');
        app.player.boundToContainer();
        app.player.render();
                
        app.player.setWeapon(new app.classes.game.weapons.Gun());
        
        app.player.moveTo( app.viewport.cpu().centerX() - app.player.cpu().centerX(), 
                           app.viewport.height - app.player.height);
                           
        /*app.player.moveTo( app.stage.width - app.player.cpu().centerX(), 
                           app.stage.height - app.player.height);*/
                           
        app.player.setStance(app.classes.geom.Direction.UP);
        
        app.ai = new app.classes.game.ai.ZombieRaid(app.stage);
        app.ai.start();
                
        // start ticking
        requestAnimationFrame(tick);
        
        app.onTick(function (viewPortCenterX, viewPortCenterY) {
            
            return function () {
                
                var stageX = -(app.player.x - viewPortCenterX),
                    stageY = -(app.player.y - viewPortCenterY);
                
                app.stage.moveTo(stageX, stageY);
                
            };
                        
        }(app.viewport.cpu().centerX(), app.viewport.cpu().centerY()));
                
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