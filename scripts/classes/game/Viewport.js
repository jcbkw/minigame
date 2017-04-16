 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.display.DisplayBase
     */
    var Super = app.classes.display.DisplayBase,
    
        /**
         * @lends app.classes.display.Viewport.prototype
         */
        api = new Super;
    
    /**
     * @class Viewport The main DisplayBase of the application
     * 
     * @param {Element} parentElement
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Viewport (parentElement, width, height) {
        
        // call to super
        Super.call(this, createContainer(parentElement), 0, 0, width, height);
        
        this.group.add(Viewport.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.Viewport
     */
    Viewport.GROUP = 'viewport';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Viewport;
    
    /**
     * @type {app.classes.game.Stage}
     */
    api.stage = null;
    
    /**
     * Creates the initial display object using this element.
     * e.g. A container-less display object.
     * 
     * @private
     * 
     * @param {Element} element
     * @returns {app.classes.display.DisplayBase}
     */
    function createContainer (element) {
        
        var container = new Super(null);
        
        container.element = 
        container.innerElement = element;
        
        return container;
        
    };
    
    Viewport.prototype = api;
    
    ns.set('app.classes.game.Viewport', Viewport);
    
 })();