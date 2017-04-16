/* global app, ns */

(function () {

    /**
     * @class A base ExCalibur class.
     * 
     * @param {app.player} user 
     */
    function ExCalibur (user) {
        
        // calling super
        app.classes.game.weapons.Weapon.call(this, user);
        this.group.add(ExCalibur.GROUP);
        
        this.ammo = Number.POSITIVE_INFINITY;

    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.weapons.ExCalibur
     */
    ExCalibur.GROUP = 'excalibur';
    
    /**
     * @type app.classes.game.weapons.ExCalibur.prototype
     */
    var api = new app.classes.game.weapons.Weapon;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = ExCalibur;
    
    /**
     * Attacks (shoots a bullet) using this gun.
     */
    api.attack = function (){
        
        var that = this;
        
        if (!that.drawn) { 
            
            that.drawn = true;
            
            this.getSize(21, 35);            
            this.user.addChild(this);
            
            setTimeout(function () {
                
                that.unrender();
                
                that.drawn = false;
                
            }, 250);
            
        }
        
    };   
    
    ExCalibur.prototype = api;
    
    ns.set('app.classes.game.weapons.ExCalibur', ExCalibur);

})();