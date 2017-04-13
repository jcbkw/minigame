 /* global app, ns */

(function () {
     
    /**
     * @class Actor A base Actor Class
     * 
     * @param {DisplayObject} stage
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Actor (stage, x, y, width, height) {
        
        // call to super
        app.classes.game.characters.Character.call(this, stage, x, y, width, height);
        
        this.group.add(Actor.GROUP);
        
    }
        
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.characters.Actor
     */
    Actor.GROUP = 'actor';
    
    /**
     * @type app.classes.game.characters.Actor.prototype
     */
    var api = new app.classes.game.characters.Character;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Actor;
    
    Actor.prototype = api;
    
    ns.set('app.classes.game.characters.Actor', Actor);
    
 })();