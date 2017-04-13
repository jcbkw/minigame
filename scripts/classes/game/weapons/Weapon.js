/* global app, ns */

(function () {

    /**
     * @class Weapon The base Weapon class.
     * 
     * @param {DisplayObject} [container]
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Weapon (container, x, y, width, height) {
        
        // call to super
        app.classes.display.DisplayObject.call(this, container, x, y, width, height);
        
        this.user = null;
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.weapons.Weapon
     */
    Weapon.GROUP = 'weapon';
    
    /**
     * @type app.classes.display.Stage.prototype
     */
    var api = new app.classes.display.DisplayObject;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Weapon;
    
    /**
     * @property {app.classes.game.characters.Attacker} user The Weapons user
     */
    api.user = null;
    
    /**
     * Executes an attack with the current weapon.
     */
    api.attack = function () {};

    /**
     * Returns the user whom this weapon is assigned to.
     * 
     * @return {app.classes.game.characters.Attacker}
     */
    api.getUser = function () {

        return this.user;

    };
    
    /**
     * Sets the user whom this weapon is assigned to.
     * 
     * @param {app.classes.game.characters.Attacker} user 
     */
    api.setUser = function (user) {

        this.user = user;

    };
    
    Weapon.prototype = api;
    
    ns.set('app.classes.game.weapons.Weapon', Weapon);
    
})();