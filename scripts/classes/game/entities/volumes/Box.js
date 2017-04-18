/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.volumes.Pushable
     */
    var Super = app.classes.game.entities.volumes.Pushable,
        
        /**
         * @lends app.classes.game.entities.volumes.Box.prototype
         */
        api = new Super;

    /**
     * Creates a pushable box volume.
     * 
     * @class Box
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     */
    function Box (x, y) {
        
        // call to super
        Super.call(this, x, y, 40, 40);
        
        // todo no no no!!!
        this.element.style.background = '#fbab18';
        this.element.style.border = '2px solid black';
        
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Box;
    
    Box.prototype = api;
    
    ns.set('app.classes.game.entities.volumes.Box', Box);
    
})();