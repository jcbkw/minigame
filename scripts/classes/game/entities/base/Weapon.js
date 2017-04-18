/* global app, ns */

(function () {
        
    var Super = app.classes.game.entities.base.Insentient,
    
        /**
         * @lends app.classes.game.entities.base.Weapon.prototype
         */
        api = new Super;

    /**
     * @class Weapon The base Weapon class.
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Weapon (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
        
        this.user = null;
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.base.Weapon
     */
    Weapon.GROUP = 'weapon';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Weapon;
    
    /**
     * @property {app.classes.game.entities.characters.Attacker} user The Weapons user
     */
    api.user = null;
    
    /**
     * Executes an attack with the current weapon.
     */
    api.attack = function () {};

    /**
     * Returns the user whom this weapon is assigned to.
     * 
     * @return {app.classes.game.entities.characters.Attacker}
     */
    api.getUser = function () {

        return this.user;

    };
    
    /**
     * Sets the user whom this weapon is assigned to.
     * 
     * @param {app.classes.game.entities.characters.Attacker} user 
     */
    api.setUser = function (user) {

        this.user = user;

    };
    
    Weapon.prototype = api;
    
    ns.set('app.classes.game.entities.base.Weapon', Weapon);
    
})();