/* global app, ns */

(function () {

    /**
     * @class A base RedBane class.
     * 
     * @param {app.player} user 
     */
    function RedBane (user) {
        
        // calling super
        app.classes.game.weapons.Weapon.call(this, user);
        this.group.add(RedBane.GROUP);
        
        this.ammo = Number.POSITIVE_INFINITY;

    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.weapons.RedBane
     */
    RedBane.GROUP = 'redbane';
    
    /**
     * @type app.classes.game.weapons.RedBane.prototype
     */
    var api = new app.classes.game.weapons.Weapon;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = RedBane;
    
    /**
     * Attacks (shoots a bullet) using this gun.
     */
    api.attack = function (){
        
        var that = this;
        
        if (!that.drawn) { 
            
            that.drawn = true;
            
            this.setSize(48, 24);
            this.user.addChild(this);
            
            function clear () {
                
                that.unrender();
                
                that.drawn = false;
                
            }
            
            this.element.addEventListener('webkitAnimationEnd',clear, false); 
            
        }
        
    };
    
    RedBane.prototype = api;
    
    ns.set('app.classes.game.weapons.RedBane', RedBane);

})();