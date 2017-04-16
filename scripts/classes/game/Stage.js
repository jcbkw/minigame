 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.display.DisplayClip
     */
    var Super = app.classes.display.DisplayClip,
    
        /**
         * @lends app.classes.display.Stage.prototype
         */
        api = new Super;
    
    /**
     * @class Stage The main DisplayClip of the application
     * 
     * @param {app.classes.game.Viewport} viewport
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Stage (viewport, x, y, width, height) {
        
        // call to super
        Super.call(this, viewport, x, y, width, height);
        
        this.viewport = viewport;
        
        this.group.add(Stage.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.Stage
     */
    Stage.GROUP = 'stage';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Stage;
    
    /**
     * @type {app.classes.game.Viewport}
     */
    api.viewport = null;
    
    /**
     * Restricts the Stage's panning to its viewport.
     * The <code>outside</code> parameter has no effect.
     * 
     * @param {Boolean} outside
     */
    api.boundToContainer = function (outside) {
        
        this.setBounds(new app.classes.geom.RectangularBounds(

            /*top*/     -(this.height - this.viewport.width),
            /*right*/   0,
            /*bottom*/  0,
            /*left*/    -(this.width - this.viewport.width)

        ));
        
    };
    
    Stage.prototype = api;
    
    ns.set('app.classes.game.Stage', Stage);
    
 })();