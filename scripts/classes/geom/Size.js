 /* global app, ns */

(function () {
     
    /**
     * @class Size An object containing a width an a height.
     * 
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Size (width, height) {
        
        this.width = width || 0;
        this.height = height || 0;
        
    }

    Size.prototype = {

       /**
        * Constructor
        * @type Function
        */
       constructor: Size,

       /**
        * The width
        * @type {Number}
        */
       width: 0,

       /**
        * The height
        * @type {Number}
        */
       height: 0

    };
    
    ns.set('app.classes.geom.Size', Size);
    
 })();