 /* global app, ns */

(function () {
    
    "use strict";
    
    /**
     * @lends app.classes.game.utils.Direction.prototype
     */
    var api = {constructor: Direction};
     
    /**
     * Creates a direction instance
     * 
     * @class Direction
     * 
     * @param {String} direction 
     */
    function Direction (direction) {
        
        this.directions = 0;
        
        if (direction) {
            
            this.up     = direction.indexOf(Direction.UP)     !== -1 && !! ++this.directions;
            this.down   = direction.indexOf(Direction.DOWN)   !== -1 && !! ++this.directions;
            this.left   = direction.indexOf(Direction.LEFT)   !== -1 && !! ++this.directions;
            this.right  = direction.indexOf(Direction.RIGHT)  !== -1 && !! ++this.directions;
            
        }
        
    }
    
    Direction.NONE                      = '';
    
    Direction.UP                        = 'up';
    Direction.DOWN                      = 'down';
    Direction.LEFT                      = 'left';
    Direction.RIGHT                     = 'right';
    
    Direction.DIAG_RIGHTUP              = Direction.RIGHT + Direction.UP;
    Direction.DIAG_RIGHTDOWN            = Direction.RIGHT + Direction.DOWN;
    
    Direction.DIAG_LEFTUP               = Direction.LEFT + Direction.UP;
    Direction.DIAG_LEFTDOWN             = Direction.LEFT + Direction.DOWN;
    
    Direction.OPPOSITE_UP               = Direction.DOWN;
    Direction.OPPOSITE_DOWN             = Direction.UP;
    Direction.OPPOSITE_LEFT             = Direction.RIGHT;
    Direction.OPPOSITE_RIGHT            = Direction.LEFT;
    
    Direction.DIAG_OPPOSITE_RIGHTUP     = Direction.DIAG_LEFTDOWN;
    Direction.DIAG_OPPOSITE_RIGHTDOWN   = Direction.DIAG_LEFTUP;
    
    Direction.DIAG_OPPOSITE_LEFTUP      = Direction.DIAG_RIGHTDOWN;
    Direction.DIAG_OPPOSITE_LEFTDOWN    = Direction.DIAG_RIGHTUP;
    
    /**
     * Whether the direction is facing up
     * @type Boolean
     */
    api.up      = false;
    
    /**
     * Whether the direction is facing dwon
     * @type Boolean
     */
    api.down    = false;
    
    /**
     * Whether the direction is facing left
     * @type Boolean
     */
    api.left    = false;
    
    /**
     * Whether the direction is facing right
     * @type Boolean
     */
    api.right   = false;
    
    /**
     * The source string of this direction
     * @type String
     */
    api.direction  = null;
    
    /**
     * The number of directions that this direction is facing
     * @number Number
     */
    api.directions = 0;
        
    /**
     * Returns the directions that this direction is facing.
     * 
     * @returns {String[]}
     */
    api.getDirections = function () {
        
        var directions = [];
        
        this.up     && directions.push(Direction.UP);
        this.down   && directions.push(Direction.DOWN);
        this.left   && directions.push(Direction.LEFT);
        this.right  && directions.push(Direction.RIGHT);
        
        return directions;
        
    };
    
    /**
     * Tells whether this direction is facing multiple
     * directions.
     * 
     * @returns {Boolean}
     */
    api.isMultiple = function () {
        
        return this.directions > 1;
        
    };
    
    /**
     * The number of directiosn that this direction is facing.
     * 
     * @returns {Number}
     */
    api.countDirections = function () {
        
        return this.directions;
        
    };
    
    /**
     * Tells whether this direction the same as the provided direction.
     * 
     * @param {String|direction app.classes.geom.Direction} direction
     * 
     * @returns {Boolean}
     */
    api.equals = function (direction) {
        
        if (typeof direction === 'string') {
            
            direction = new Direction(direction);
            
        }
        
        return      this.directions === direction.directions
                &&  this.up         === direction.up
                &&  this.down       === direction.down
                &&  this.left       === direction.left
                &&  this.right      === direction.right;
        
    };
    
    /**
     * Tells whether the direction has at least one X axis direction
     * (e.g. left or right) in it.
     * 
     * @returns {Boolean}
     */
    api.hasX = function () {
        
        return this.left || this.right;
        
    };
    
    /**
     * Tells whether the direction has at least one Y axis direction
     * (e.g. up or down) in it.
     * 
     * @returns {Boolean}
     */
    api.hasY = function () {
        
        return this.up || this.down;
        
    };
    
    /**
     * Returns the direction that this instance is facing on the X axis
     * (e.g. left or right) or an empty string if neither.
     * 
     * @returns {String} <code>Direction.LEFT|Direction.RIGHT|&lt;emtpy string&gt;</code>
     */
    api.getX = function () {
        
        return this.left ? Direction.LEFT : (this.right ? Direction.RIGHT : Direction.NONE);
        
    };
    
    /**
     * Returns the direction that this instance is facing on the Y axis
     * (e.g. up or down) or an empty string if neither.
     * 
     * @returns {String} <code>Direction.UP|Direction.DOWN|&lt;emtpy string&gt;</code>
     */
    api.getY = function () {
        
        return this.up ? Direction.UP : (this.down ? Direction.DOWN : Direction.NONE);
        
    };
    
    /**
     * The string representation of this direction.
     * 
     * @returns {String}
     */
    api.toSource = api.toString = function () {
        
        if (this.direction && typeof this.direction === 'string') {
            
            return this.direction;
            
        }
        
        this.direction = Direction.NONE;
        
        if (this.left) {
            
            this.direction += Direction.LEFT;
                    
        }
        
        if (this.right) {
            
            this.direction += Direction.RIGHT;
                    
        }
        
        if (this.up) {
            
            this.direction += Direction.UP;
                    
        }
        
        if (this.down) {
            
            this.direction += Direction.DOWN;
                    
        }
        
        return this.direction;
        
    };
    
    /**
     * Returns a new Direction facing the oppotise direction.
     * 
     * @returns {app.classes.game.utils.Direction}
     */
    api.opposite = function () {
        
        var direction = Direction.NONE;
        
        if (this.left) {
            
            direction += Direction.OPPOSITE_LEFT;
                    
        }
        
        if (this.right) {
            
            direction += Direction.OPPOSITE_RIGHT;
                    
        }
        
        if (this.up) {
            
            direction += Direction.OPPOSITE_UP;
                    
        }
        
        if (this.down) {
            
            direction += Direction.OPPOSITE_DOWN;
                    
        }
        
        return new Direction(direction);
        
    };
            
    Direction.prototype = api;
    
    /**
     * Contains static directional properties and methods.
     * 
     * @typedef {Direction} app.classes.geom.Direction 
     */
    ns.set('app.classes.geom.Direction', Direction);
    
 })();