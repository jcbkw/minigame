 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.characters.Character
     */
    var Super = app.classes.game.characters.Character,
        
        /**
         * @lends app.classes.game.characters.Attacker.prototype
         */
        api = new Super;
    
    /**
     * Creates a Character who may possess a weapon.
     * 
     * @class Attacker
     * 
     * @param {DisplayObject} stage
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Attacker (stage, x, y, width, height) {
        
        // call to super
        Super.call(this, stage, x, y, width, height);
        
        this.weapon = null;
            
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Attacker;
    
    /**
     * @property {app.classes.game.weapons.Weapon} weapon The attacker's weapon
     */
    api.weapon = null;
    
    /**
     * Set the attacker's weapon
     * @param {(app.classes.game.weapons.Weapon|null)} weapon
     */
    api.setWeapon = function (weapon) {
        
        if (this.weapon) {
            
            this.weapon.setUser(null);
            
        }
        
        if (weapon) {
            
            weapon.setUser(this);
            
        }
        
        this.weapon = weapon;
        
    };
    
    /**
     * Get the attacker's weapon
     * @returns {(app.classes.game.weapons.Weapon|null)}
     */
    api.getWeapon = function () {
        
        return this.weapon;
        
    };
    
    /**
     * Check whether the attacker has a weapon
     * @returns {Boolean}
     */
    api.hasWeapon = function () {
        
        return this.weapon !== null;
        
    };
    
    /**
     * Attacks using the attacker's weapon if any.
     */
    api.attack = function () {

        if (this.weapon) {

            this.weapon.attack();

        }

    };

    Attacker.prototype = api;
    
    ns.set('app.classes.game.characters.Attacker', Attacker);
    
 })();