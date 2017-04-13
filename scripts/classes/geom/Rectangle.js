 /* global app, ns */

(function () {
     
    /**
     * @class Rectangle A rectangular shape.
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Rectangle (x, y, width, height) {
        
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        
    }

    Rectangle.prototype = {

        /**
         * Constructor
         * @type Function
         */
        constructor: Rectangle,

        /**
         * The rectangle's x coordinate
         * @type {Number}
         */
        x: 0,

        /**
         * The rectangle's y coordinate
         * @type {Number}
         */
        y: 0,

        /**
         * The rectangle's width
         * @type {Number}
         */
        width: 0,

        /**
         * The rectangle's height
         * @type {Number}
         */
        height: 0,
       
        /**
         * Tells whether this rectangle is colliding 
         * with the provided rectangle.
         * 
         * @param {app.classes.geom.Rectangle} rectangle
         * 
         * @returns {Boolean}
         */
        hitsRectangle: function (rectangle) {

            return  this.x < rectangle.x + rectangle.width  &&
                    this.x + this.width > rectangle.x       &&
                    this.y < rectangle.y + rectangle.height &&
                    this.height + this.y > rectangle.y;

        }

    };
    
    ns.set('app.classes.geom.Rectangle', Rectangle);
    
 })();