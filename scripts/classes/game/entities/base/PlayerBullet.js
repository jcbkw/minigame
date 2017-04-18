/* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.base.Bullet
     */
    var Super = app.classes.game.entities.base.Bullet,
    
        /**
         * @lends app.classes.game.entities.weapons.PlayerBullet.prototype
         */
        api = new Super;
    
    /**
     * Creates a bullet that cannot harm
     * the player.
     * 
     * @class
     * 
     * @param {Weapon} weapon
     * @param {Number} [angle=0]
     * @param {Number} [speed=0]
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function PlayerBullet (weapon, angle, speed, x, y, width, height) {
        
        // call to super
        Super.call(this, weapon, angle, speed, x, y, width, height);
        
    }
    
    /**
     * Tells whether this entity can be collided
     * with the provided entity.
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     * @returns {Boolean}
     */
    api.isCollidableWith = function (entity) {
                
        return     Super.prototype.isCollidableWith.call(this, entity)
               && !(entity instanceof app.classes.game.entities.characters.Player);
        
    };
    
    PlayerBullet.prototype = api;
    
    ns.set('app.classes.game.entities.base.PlayerBullet', PlayerBullet);

})();