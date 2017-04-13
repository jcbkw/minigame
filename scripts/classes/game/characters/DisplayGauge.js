/* global app, ns */

(function () {
    
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
        
        app.classes.display.DisplayObject.call(this, 
                                               container, x, y, width, height);
                                               
        app.classes.game.Gauge.call(this, DisplayGauge.DEFAULT_LIFE, 
                                          DisplayGauge.DEFAULT_LIFE);
        
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
    
    /**
     * @lends app.classes.game.characters.DisplayGauge.prototype
     */
    var api = new app.classes.display.DisplayObject;
    
    DisplayGauge.prototype = api;
    
    // (mixin) inherits from app.classes.game.Gauge
    ns.merge(api, app.classes.game.Gauge.prototype);
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = DisplayGauge;
    
    ns.set("app.classes.game.characters.DisplayGauge", DisplayGauge);
    
})();