 /* global app, ns */

(function () {
     
    /**
     * @class Position  Contains static positional properties and methods
     */
    function Position () {}
    
    /**
     * @static
     * @memberOf app.classes.geom.Position
     * @property {String} TOP_LEFT Position top left
     */
    Position.TOP_LEFT          = 'top_left';
    Position.TOP_CENTER        = 'top_center';
    Position.TOP_RIGHT         = 'top_right';
    
    Position.CENTER_LEFT       = 'center_left';
    Position.CENTER_CENTER     = 'center_cenner';
    Position.CENTER_RIGHT      = 'center_right';
    
    Position.BOTTOM_LEFT       = 'bottom_left';
    Position.BOTTOM_CENTER     = 'bottom_cenner';
    Position.BOTTOM_RIGHT      = 'bottom_right';
    
    /**
     * Contains static directional properties and methods.
     * 
     * @typedef {Position} app.classes.geom.Position 
     */
    ns.set('app.classes.geom.Position', Position);
    
 })();