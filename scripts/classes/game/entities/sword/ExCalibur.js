/* global app, ns */

(function () {
    
    var Super = app.classes.game.entities.base.Weapon,
    
        /**
         * @lends app.classes.game.entities.weapons.ExCalibur.prototype
         */
        api = new Super;

    /**
     * @class A base ExCalibur class.
     * 
     * @param {app.player} user 
     */
    function ExCalibur (user) {
        
        // calling super
        Super.call(this, user);
        this.group.add(ExCalibur.GROUP);
        
        this.ammo = Number.POSITIVE_INFINITY;

    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.weapons.ExCalibur
     */
    ExCalibur.GROUP = 'excalibur';
    
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
            
            this.setSize(21, 35);            
            this.user.addChild(this);
            
            setTimeout(function () {
                
                that.remove();
                
                that.drawn = false;
                
            }, 250);
            
        }
        
    };   
    
    ExCalibur.prototype = api;
    
    ns.set('app.classes.game.entities.weapons.ExCalibur', ExCalibur);

})();