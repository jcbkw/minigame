/* global app, ns */

(function () {
    
    /**
     * @type app.classes.display.DisplayObject
     */
    var SuperA = app.classes.display.DisplayObject,
        
        /**
         * @type app.classes.game.Gauge
         */
        SuperB = app.classes.game.Gauge,
        
        /**
         * @lends app.classes.game.characters.Character.prototype
         */
        api = ns.merge(new SuperA, SuperB.prototype);
        
    /**
     * Creates a DisplayGauge instance
     * 
     * @class
     * 
     * @augments app.classes.display.DisplayObject
     * @augments app.classes.game.Gauge
     * 
     * @param {DisplayObject} container
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function DisplayGauge (container, x, y, width, height) {
        
        SuperA.call(this, container, x, y, width, height);
        SuperB.call(this, DisplayGauge.DEFAULT_LIFE, DisplayGauge.DEFAULT_LIFE);
        
        this.group.add(DisplayGauge.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.characters.DisplayGauge
     */
    DisplayGauge.GROUP = 'DisplayGauge';
    
    /**
     * The gauges default life.
     * 
     * @static
     * @name GROUP
     * @type Number
     * @memberOf app.classes.game.characters.DisplayGauge
     */
    DisplayGauge.DEFAULT_LIFE = 100;
    
    DisplayGauge.prototype = api;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = DisplayGauge;
    
    ns.set("app.classes.game.characters.DisplayGauge", DisplayGauge);
    
})();