 /* global app, ns */

(function () {
    
    /**
     * Super
     * @private
     * @type app.classes.geom.Rectangle
     */
    var Super = app.classes.geom.Rectangle,
        
        /**
         * @private
         * @lends {app.classes.display.DisplayBase.prototype}
         */
        api = new Super;
    
    /**
     * An Object that can be rendered on the screen.
     * 
     * @name DisplayBase
     * @memberOf app.classes.display
     * 
     * @class
     * 
     * @param {DisplayBase} container 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function DisplayBase (container, x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this.container = container;
        this.element = document.createElement('div');
        this.transform = new app.classes.display.displaybase.Transformer(this);
        this.processor = null;
        
        this.group = this.element.classList;
        this.children = [];
        
        this.setSize(this.width, this.height);
        this.setPosition(this.x, this.y);
       
        this.group.add(DisplayBase.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.display.DisplayObject
     */
    DisplayBase.GROUP = 'displaybase';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = DisplayBase;

    /**
     * @property {DisplayBase} container this object's parent 
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
     * @property {DisplayBase[]} children The list of children that this object 
     *                                    contains.
     */
    api.children = null;
    
    /**
     * @type app.classes.display.displaybase.Transformer
     */
    api.transform = null;
    
    /**
     * @type app.classes.display.displaybase.Processor
     */
    api.processor = null;
    
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
     * Return an object that can used to apply 2D tranforms
     * to this DisplayBase.
     * 
     * @returns {app.classes.display.displaybase.Transformer}
     */
    api.transformer = function () {
        
        return this.transform;
        
    };
    
    /**
     * Return an object that can used to calculate data
     * from and apply useful routines to this DisplayBase.
     * 
     * @returns {app.classes.display.displaybase.Processor}
     */
    api.cpu = function () {
        
        if (this.processor === null) {
            
            this.processor = new app.classes.display.displaybase.Processor(this);
            
        }
        
        return this.processor;
        
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
        
        this.transform.xTranslation = this.x = x;
        this.transform.yTranslation = this.y = y;
        
        this.transform.apply();
        
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
     * Returns this instance's parent display object, if any.
     * 
     * @returns {(app.classes.display.DisplayBase|null)}
     */
    api.getContainer = function () {
        
        return this.container;
        
    };
    
    /**
     * Inserts an inner display object into this one.
     * 
     * @param {DisplayBase} displayObject
     */
    api.addChild = function (displayObject) {
        
        if (app.tk.arrays.put(this.children, displayObject)) {
            
            getInnerElement(this).appendChild(displayObject.element);
            
        }
        
    };
    
    /**
     * Removes a child of this display object from it.
     * 
     * @param {DisplayBase} displayObject
     */
    api.removeChild = function (displayObject) {
        
        if (this.innerElement) {
            
            app.tk.arrays.put(displayObject);
            this.innerElement.removeChild(displayObject.element);
            
        }
        
    };
    
    /**
     * Removes this display object from its container.
     */
    api.remove = function () {
        
        if (this.container) {
            
            this.container.removeChild(this);
            
        }
        
    };
    
    /**
     * Draws the display object in its container
     */
    api.render = function () {
        
        this.container.addChild(this);
        
    };
    
    /**
     * Erases the display object from its container
     */
    api.unrender = function () {
        
        this.element.parentNode &&
        this.element.parentNode.removeChild(this.element);
        
    };
    
    /**
     * Retreives or creates the innerElement of the provided instance.
     * @private
     * @param {DisplayBase} that
     * @returns {Element}
     */
    function getInnerElement (that) {
        
        if (!that.innerElement) {
            
            that.innerElement = document.createElement('div');
        
            that.innerElement.classList.add(DisplayBase.GROUP + '-content');
            that.element.appendChild(that.innerElement);
            
        }
        
        return that.innerElement;
        
    }
    
    DisplayBase.prototype = api;
    
    ns.set('app.classes.display.DisplayBase', DisplayBase);
    
 })();