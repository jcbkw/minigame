/* global app, ns */

(function () {

    /**
     * @class A base Gun class.
     * 
     * @param {DisplayObject} [container]
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Gun (container, x, y, width, height) {
        
        // calling super
        app.classes.game.weapons.Weapon.call(this, container, x, y, width, height);
        this.group.add(Gun.GROUP);
        
        this.ammo = Number.POSITIVE_INFINITY;

    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.weapons.Gun
     */
    Gun.GROUP = 'gun';
    
    /**
     * @type app.classes.game.weapons.Gun.prototype
     */
    var api = new app.classes.game.weapons.Weapon;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Gun;
    
    /**
     * Attacks (shoots a bullet) using this gun.
     */
    api.attack =  function () {
        
        var bullet,
            user;

        if (this.ammo > 0) {
            
            user = this.getUser();
            
            if (user) {
                
                bullet = new app.classes.game.weapons.Bullet(this, user.container);

                bullet.fire();

                this.ammo--;
                
            }

        }
        
        bullet = user = null;

    };
    
    Gun.prototype = api;
    
    ns.set('app.classes.game.weapons.Gun', Gun);

})();