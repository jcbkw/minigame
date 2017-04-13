 /* global app, ns */

(function () {
     
    /**
     * @class DisplayObject An Object that can be rendered on the screen.
     * 
     * @param {DisplayObject} container 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function DisplayObject (container, x, y, width, height) {
        
        // call to super
        app.classes.geom.Rectangle.call(this, x, y, width, height);
        
        this.container = container;
        this.element = document.createElement('div');
        
        this.group = this.element.classList;
                        
        this.setSize(this.width, this.height);
        this.setPosition(this.x, this.y);
        this.setOrigin(this.getWidth(true/*halved*/), this.getHeight(true/*halved*/));
        
        this.group.add(DisplayObject.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.display.DisplayObject
     */
    DisplayObject.GROUP = 'displayobject';
    
    /**
     * @type app.classes.display.DisplayObject.prototype
     */
    var api = new app.classes.geom.Rectangle;
    
    /**
     * @property {RectangularBounds} bounds The bounds of this object whithin its
     *                                      parent. e.g. The limits of where it can
     *                                      move.
     */
    api.bounds = null;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = DisplayObject;

    /**
     * @property {DisplayObject} container this object's parent 
     *                           object on the screen
     */
    api.container = null;
    
    /**
     * @property {Element} element A DOM element used to render the object
     */
    api.element = null;
    
    /**
     * @property {Element} element A DOM element created inside this object's
     *                             element used to append inner element.
     *                             This object is null until a display object
     *                             has been insterted inside this one.
     */
    api.innerElement = null;
    
    /**
     * @property {DOMTokenList} group   Allows to add and remove qualifying groups
     *                                  to this object. Similar to a DOMElement's
     *                                  classList.
     */
    api.group = null;
    
    /**
     * @property {app.classes.geom.Point} origin    The origin or (a.k.a anchor point or regristration point)
     *                                              of the display object.
     *                                              
     */
    api.origin = null;
    
    /**
     * Attach the provided qualifying 
     * key/value pair to this object.
     * 
     * @param {String} name
     * @param {String} value
     */
    api.setAttribute = function (name, value) {
        
        this.element.setAttribute(name, value);
        
    };
    
    /**
     * Tells whether this object contains the provided
     * attribute
     * 
     * @param {String} value
     * @returns {Boolean}
     */
    api.hasAttribute = function (value) {
        
        return this.element.hasAttribute(value);
        
    };
    
    /**
     * Returns the value attached to the provided
     * attribute of this object if any
     * 
     * @param {String} value
     * @returns {(String|null)}
     */
    api.getAttribute = function (value) {
        
        return this.element.getAttribute(value) || null;
        
    };
    
    /**
     * Removes this provided attribute from this element
     * 
     * @param {String} value
     */
    api.removeAttribute = function (value) {
        
        return this.element.removeAttribute(value);
        
    };
       
    /**
     * Set this instance's width and height
     * within its container.
     * 
     * @param {Number} width
     * @param {Number} height
     */
    api.setSize = function (width, height) {
        
        this.width  = width;
        this.height = height;
        
        this.element.style.width    = width  + "px";
        this.element.style.height   = height + "px";
        
    };
    
    /**
     * Returns the instance's width and height as a
     * <code>app.classes.geom.Size</code> object.
     * 
     * @returns {app.classes.geom.Size}
     */
    api.getSize = function () {
        
        return new app.classes.geom.Size(this.width, this.height);
        
    };
        
    /**
     * Set this instance's x and y coordinates
     * within its container.
     * 
     * @param {Number} x
     * @param {Number} y
     */
    api.setPosition = function (x, y) {
        
        this.x = x;
        this.y = y;
        
        this.element.style.left   = x + "px";
        this.element.style.top    = y  + "px";
        
    };
    
    /**
     * Returns the instance's x and y coordinates as a
     * <code>app.classes.geom.Point</code> object.
     * 
     * @returns {app.classes.geom.Point}
     */
    api.getPosition = function () {
        
        return new app.classes.geom.Point(this.x, this.y);
        
    };
    
    /**
     * Set this instance's registration point.
     * 
     * @param {Number} x
     * @param {Number} y
     */
    api.setOrigin = function (x, y) {
        
        this.origin = new app.classes.geom.Point(x, y);
        
    };
    
    /**
     * Return this instance's registration point.
     * 
     * @returns {app.classes.geom.Point}
     */
    api.getOrigin = function () {
        
        return this.origin;
        
    };
    
    /**
     * Returns this instance's parent display object, if any.
     * 
     * @returns {(app.classes.display.DisplayObject|null)}
     */
    api.getContainer = function () {
        
        return this.container;
        
    };
    
    /**
     * Inserts an inner display object into this one
     * @param {DisplayObject} displayObject
     */
    api.appendChild = function (displayObject) {
        
        getInnerElement(this).appendChild(displayObject.element);
        
    };
    
    /**
     * Draws the display object in its container
     */
    api.render = function () {
        
        this.container.appendChild(this);
        
    };
    
    /**
     * Erases the display object from its container
     */
    api.unrender = function () {
        
        this.element.parentNode &&
        this.element.parentNode.removeChild(this.element);
        
    };
    
    /**
     * Returns this instance's width.
     * 
     * @param {Boolean} [halved=false] Whether the value should be returned halved.
     * @returns {Number}
     */
    api.getWidth = function (halved) {
        
        return halved ? Math.round(this.width / 2) : this.width;
        
    };
    
    /**
     * Returns this instance's height.
     * 
     * @param {Boolean} [halved=false] Whether the value should be returned halved.
     * @returns {Number}
     */
    api.getHeight = function (halved) {
        
        return halved ? Math.round(this.height / 2) : this.height;
        
    };
    
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
        
        var bounds;
        
        if (absolute) {
            
            bounds          = new app.classes.geom.RectangularBounds(
                /*top*/     0,
                /*right*/   this.width,
                /*bottom*/  this.height,
                /*left*/    0
            );
            
        }
        else {
            
            bounds          = new app.classes.geom.RectangularBounds(
                /*top*/     this.y,
                /*right*/   this.x + this.width,
                /*bottom*/  this.y + this.height,
                /*left*/    this.x
            );
            
        }
        
        return bounds;
        
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

    };
    
    /**
     * Retreives or creates the innerElement of the provided instance.
     * @private
     * @param {DisplayObject} that
     * @returns {Element}
     */
    function getInnerElement (that) {
        
        if (!that.innerElement) {
            
            that.innerElement = document.createElement('div');
        
            that.innerElement.classList.add('displayobject-innerelement');
            
            that.element.appendChild(that.innerElement);
            
        }
        
        return that.innerElement;
        
    }
    
    DisplayObject.prototype = api;
    
    ns.set('app.classes.display.DisplayObject', DisplayObject);
    
 })();