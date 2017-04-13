 /* global app, ns */

(function () {
     
    /**
     * @class RectangularBounds A shape that defines 
     *                          top right bottom and left
     *                          properties.
     * 
     * @param {Number} [top=0]
     * @param {Number} [right=0]
     * @param {Number} [bottom=0]
     * @param {Number} [left=0]
     */
    function RectangularBounds (top, right, bottom, left) {
        
        this.left = left || 0;
        this.top = top || 0;
        this.right = right || 0;
        this.bottom = bottom || 0;
        
    }

    RectangularBounds.prototype = {

       /**
        * Constructor
        * @type Function
        */
       constructor: RectangularBounds,

       /**
        * The left bound
        * @type {Number}
        */
       left: 0,

       /**
        * The top bound
        * @type {Number}
        */
       top: 0,

       /**
        * The right bound
        * @type {Number}
        */
       right: 0,

       /**
        * The bottom bound
        * @type {Number}
        */
       bottom: 0

    };
    
    ns.set('app.classes.geom.RectangularBounds', RectangularBounds);
    
 })();