 /* global app, ns */

(function () {
     
    /**
     * @class Attacker A base Attacker Class
     * 
     * @param {DisplayObject} stage
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Attacker (stage, x, y, width, height) {
        
        // call to super
        app.classes.game.characters.HarmfulCharacter.call(this, stage, x, y, width, height);
        this.group.add(Attacker.GROUP);
        
        this.weapon = null;
            
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.characters.Attacker
     */
    Attacker.GROUP = 'attacker';
    
    /**
     * @type app.classes.game.characters.Attacker.prototype
     */
    var api = new app.classes.game.characters.HarmfulCharacter;
    
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