 /* global app, ns */

(function () {
     
    /**
     * @class Direction  Contains static directional properties and methods
     */
    function Direction () {}
    
    /**
     * @static
     * @memberOf app.classes.geom.Direction
     * @property {String} UP Direction UP
     */
    Direction.UP                = 'up';
    Direction.DOWN              = 'down';
    Direction.LEFT              = 'left';
    Direction.RIGHT             = 'right';
    
    Direction.DIAG_RIGHTUP      = Direction.RIGHT + Direction.UP;
    Direction.DIAG_RIGHTDOWN    = Direction.RIGHT + Direction.DOWN;
    
    Direction.DIAG_LEFTUP       = Direction.LEFT + Direction.UP;
    Direction.DIAG_LEFTDOWN     = Direction.LEFT + Direction.DOWN;
    
    /**
     * Contains static directional properties and methods.
     * 
     * @typedef {Direction} app.classes.geom.Direction 
     */
    ns.set('app.classes.geom.Direction', Direction);
    
 })();