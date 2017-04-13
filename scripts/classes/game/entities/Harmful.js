/* global app, ns */

(function () {

    /**
     * @class Harmful The base Harmful class.
     * 
     * @param {DisplayObject} [container]
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Harmful (container, x, y, width, height) {
        
        // call to super
        app.classes.display.DisplayObject.call(this, container, x, y, width, height);
        
        this.group.add(Harmful.GROUP);
        
        this.hitPoints = 1;
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.Harmful
     */
    Harmful.GROUP = 'harmful';
    
    /**
     * @type app.classes.display.Stage.prototype
     */
    var api = new app.classes.display.DisplayObject;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Harmful;
    
    /**
     * @type {Number} The harmful object's hit points.
     */
    api.hitPoints = 1;
    
    /**
     * Returns the harmful object's hit points.
     * @returns {Number}
     */
    api.getHitPoints = function () {
        
        return this.hitPoints;
        
    };
    
    /**
     * Set the harmful object's hit points.
     * @param {Number} value
     */
    api.setHitPoints = function (value) {
        
        this.hitPoints = value;
        
    };
    
    Harmful.prototype = api;
    
    ns.set('app.classes.game.entities.Harmful', Harmful);
    
})();