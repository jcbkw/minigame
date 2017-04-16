 /* global app, ns */

(function () {
    
    /**
     * Super
     * @private
     * @type app.classes.display.DisplayBase
     */
    var Super = app.classes.display.DisplayBase,
        
        /**
         * @private
         * @lends {app.classes.display.DisplayObject.prototype}
         */
        api = new Super;
    
    /**
     * An Object that can be rendered on the screen.
     * 
     * @name DisplayObject
     * @memberOf app.classes.display
     * 
     * @class
     * 
     * @param {DisplayObject} container 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function DisplayObject (container, x, y, width, height) {
        
        // call to super
        Super.call(this, container, x, y, width, height);
        
        this.bounds = null;
        this.locked = false;
        
    }
    
    /**
     * @property {Boolean} locked Whether this object is prevented from moving
     */
    api.locked = false;
    
    /**
     * @property {RectangularBounds} bounds The bounds of this object whithin its
     *                                      parent. e.g. The limits of where it can
     *                                      move.
     */
    api.bounds = null;
    
    /**
     * Prevents or allowing this object from moving.
     * This affect the {@link #moveTo} function and
     * all its high level clients.
     * 
     * @param {Boolean} value
     */
    api.setLocked = function (value) {
        
        this.locked = value;
        
    };
    
    /**
     * Tells whether this object is prevented from moving.
     * 
     * @returns {Boolean}
     */
    api.isLocked = function () {
        
        return this.locked;
        
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = DisplayObject;
    
    /**
     * Set the rectangle used to measure the bounds
     * of this object whithin its parent. e.g. The limits of where it can
     * move.
     * 
     * @param {(app.classes.geom.RectangularBounds|null)} bounds
     */
    api.setBounds = function (bounds) {
       
        this.bounds = bounds;
        
    };
    
    /**
     * Get the rectangle used to measure the bounds
     * of this object whithin its parent.
     * 
     * @returns {(app.classes.geom.RectangularBounds|null)}
     */
    api.getBounds = function () {
       
        return this.bounds;
        
    };
    
    /**
     * Creates a <code>app.classes.geom.RectangularBounds</code> using this instance's 
     * measurements and returns it.
     * 
     * @param {Boolean} [absolute=false]    <p>If <code>true</code> the bounds use 0 as their
     *                                      top, left and the instance's width and height
     *                                      as their bottom,right.</p>
     *                                      <p>If <code>false</code> the bounds use the instance's
     *                                      x and y as their top, left and the instance's 
     *                                      width and height added to its x and y as their
     *                                      bottom, right.</p>
     * 
     * @returns {app.classes.geom.RectangularBounds}
     */
    api.toBounds = function (absolute) {
        
        return app.classes.geom.RectangularBounds.fromRectangle(this, absolute);
        
    };
    
    /**
     * Use this object container's dimensions as its bounds.
     * 
     * @param {Boolean} [outside=false] Whether the object should be bound
     *                                  right outside its container as opposed
     *                                  to inside of it.
     */
    api.boundToContainer = function (outside) {
        
        var bounds = new app.classes.geom.RectangularBounds();
        
        if (outside) {
            
            bounds          = new app.classes.geom.RectangularBounds(
                /*top*/     -this.height,
                /*right*/   this.container.width  + this.width,
                /*bottom*/  this.container.height + this.height,
                /*left*/    -this.width
            );
            
        }
        else {
            
            bounds          = new app.classes.geom.RectangularBounds(
                /*top*/     0,
                /*right*/   this.container.width  - this.width,
                /*bottom*/  this.container.height - this.height,
                /*left*/    0
            );
            
        }
        
        this.bounds = bounds;
        
    };
    
    /**
     * Tells whether this object is outside of its
     * bounds (if any) or outside of the provided
     * bounds (if given).
     * 
     * @param {RectangularBounds} [bounds]
     * @returns {Boolean}
     */
    api.isOutOfBounds = function (bounds) {
        
        if (!bounds) {
            
            bounds = this.bounds;
            
        }
        
        if (!bounds) {
            
            return false;
            
        }
        
        return     this.y < bounds.top
                || this.x < bounds.left
                || this.y > bounds.right
                || this.x > bounds.bottom;
        
    };
    
    /**
     * Places the object at a new position
     * relative to its current position.
     * 
     * @param {Number} [x=0] The relative x coordinate. 
     * @param {Number} [y=0] The relativ y coordinate.
     * 
     * @example
     * displayObject.move(5)     // moves right by 5px
     * displayObject.move(0, -2) // moves up by 2px
     */
    api.move = function (x, y) {

        this.moveTo(this.x + (x || 0), this.y + (y || 0));

    };
    
    /**
     * Moves this object to the specified position
     * while making sure that it remains its bounds.
     * 
     * @param {Number} x The x coordinate. 
     * @param {Number} y The y coordinate. 
     */
    api.moveTo = function (x, y) {
        
        if (!this.locked) {
            
            if (this.bounds) {

                // prevents from going out of bounds up or down
                // if y is less than the defined top
                if (y < this.bounds.top) {

                    // than set y to the defined top
                    // so that it can't go further up
                    y = this.bounds.top;

                }
                // otherwise
                // if y is more than the fartest allowed
                else if (y > this.bounds.bottom) {

                        // than set it to the fartest allowed
                        // so that it can't go further down
                        y = this.bounds.bottom;


                }

                // prevents from going out of bounds left or right
                // if x is less than the defined top
                if (x < this.bounds.left) {

                    // than set x to the defined top
                    // so that it can't go further left
                    x = this.bounds.left;

                }
                // otherwise 
                // if x is more than the fartest allowed
                else if (x > this.bounds.right) {

                    // than set it to the fartest allowed
                    // so that it can't go further right
                    x = this.bounds.right;

                }

            }

            this.setPosition(x, y);
            
        }

    };
    
    DisplayObject.prototype = api;
    
    ns.set('app.classes.display.DisplayObject', DisplayObject);
    
 })();