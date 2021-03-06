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
     * Whethe the app is in debug mode;
     * 
     * @type Boolean
     */
    api.debug = true;

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
     * Throws the provided error.
     * 
     * @param {Error} error
     */
    api.die = function (error) {
        
        throw error;
        
    };
    
    api.log = function () {
        
        api.debug && console.log.apply(console, Array.prototype.slice.call(arguments, 0));
        
    };

    /**
     * Initializes the main objects and
     * starts the game.
     * 
     * @private
     */
    function init () {
        
        app.viewport = new app.classes.game.Viewport(document.body, 300, 300);
                
        app.stage = new app.classes.game.Stage(0, 0, 1574, 1070);
        
        app.viewport.addChild(app.stage);
        app.stage.boundToContainer();
        
        app.player = new app.classes.game.entities.characters.Player(0, 0, 32, 32);
        
        app.player.group.add('alice');
        app.stage.addChild(app.player);
        app.player.boundToContainer();
        
        app.player.setWeapon(new app.classes.game.entities.base.Gun());
        
        app.player.moveTo( app.viewport.cpu().centerX() - app.player.cpu().centerX(), 
                           app.viewport.height - app.player.height);
        
        /*app.player.moveTo( app.stage.width - app.player.cpu().centerX(), 
                           app.stage.height - app.player.height);*/
                           
        app.player.setDirection(app.classes.geom.Direction.UP);
        
        ns.set('app.game.engine', new app.classes.game.Engine);
        
        app.ai = new app.classes.game.ai.ZombieRaid(app.stage);
        app.ai.start();
        
        
        
        /**************************/
        var boundary = new app.classes.game.entities.volumes.Boundary(40, 412, 70, 245);
        app.stage.addChild(boundary);
        boundary.element.style.background = 'rgba(255,0,0,.5)';
        /**************************/
        
        
        
        /**************************/
        var box = new app.classes.game.entities.volumes.Box(40, 250);
        app.stage.addChild(box);
        box.boundToContainer();
        /**************************/
        
        
        
        /**************************/
        var dustX = 280,
            dustY = 280,
            dustWidth = 40,
            dustHeight = 40,
            dustCols = 6,
            dustRows = 3,
            dust,
            i,
            j;
    
        for (i = 0; i < dustRows; i += 1) {
            
            for (j = 0; j < dustCols; j += 1) {
                
                dust = new app.classes.game.entities.volumes.Dust(dustX + j * dustWidth, dustY);

                app.stage.addChild(dust);

            }
            
            dustY  += dustHeight;
            
        }
        /**************************/
        
            
        // start ticking
        requestAnimationFrame(tick);
        
        
        /* 
        var fps = 0;
        
        app.onTick(function () {
            
            ++fps;
            
        });
        
        setInterval(function () {
            
            console.log(fps, 'fps');
            fps = 0;
            
        }, 1000);
        */
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