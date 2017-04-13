 /* global app, ns */

(function () {
     
    /**
     * @class Stage The main DisplayObject of the application
     * 
     * @param {Element} element
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Stage (element, width, height) {
        
        // call to super
        app.classes.display.DisplayObject.call(this, createInitialDisplayObject(element), 0, 0, width, height);
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
     * @type app.classes.display.Stage.prototype
     */
    var api = new app.classes.display.DisplayObject;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Stage;
    
    /**
     * Creates the initial display object using this element.
     * e.g. A container-less display object.
     * 
     * @private
     * 
     * @param {Element} element
     * @returns {app.classes.display.DisplayObject}
     */
    function createInitialDisplayObject (element) {
        
        var displayObject = new app.classes.display.DisplayObject(null);
        
        displayObject.element = 
        displayObject.innerElement = element;
        
        return displayObject;
        
    };
    
    Stage.prototype = api;
    
    ns.set('app.classes.game.Stage', Stage);
    
 })();