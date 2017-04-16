/* global app, ns */

(function () {
    
    /**
     * @type app.classes.display.DisplayObject
     */
    var Super = app.classes.display.DisplayObject,
        
        /**
         * @Lends app.classes.game.entities.Block.prototype
         */
        api = new Super;

    /**
     * Creates a Block which has a neutral (0), positive or
     * negative life point;
     * 
     * @class Entity
     * 
     * @param {DisplayObject} [container]
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Entity (container, x, y, width, height) {
        
        // call to super
        Super.call(this, container, x, y, width, height);
        
        this.lifePoints = 0;
        
    }
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Entity;
    
    /**
     * @type {Number} The entity's hit points.
     */
    api.lifePoints = 0;
    
    /**
     * Handle the collision of this entity with another
     * 
     * @param {app.classes.game.entities.Entity} entity
     */
    api.handleCollision = function (entity) {
        
        
        
    };
    
    /**
     * Returns the entity object's hit points.
     * @returns {Number}
     */
    api.getLifePoints = function () {
        
        return this.lifePoints;
        
    };
    
    /**
     * Set the entity object's hit points.
     * @param {Number} value
     */
    api.setLifePoints = function (value) {
        
        this.lifePoints = value;
        
    };
    
    Entity.prototype = api;
    
    ns.set('app.classes.game.entities.Entity', Entity);
    
})();