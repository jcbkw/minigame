 /* global app, ns */

(function () {
    
    /**
     * @type app.classes.game.entities.characters.Attacker
     */
    var Super = app.classes.game.entities.characters.Attacker,
        
        /**
         * @lends app.classes.game.entities.characters.Enemy.prototype
         */
        api = new Super;
        
    /**
     * @class Enemy A base Enemy Class
     * 
     * @augments app.classes.game.entities.characters.Attacker
     * 
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Enemy (x, y, width, height) {
        
        // call to super
        Super.call(this, x, y, width, height);
                
        this.lifeGauge = new app.classes.game.utils.LifeBar();
        
        this.addChild(this.lifeGauge);
        this.group.add(Enemy.GROUP);
        
        this.setLifeImpact(-1);
        
    }
        
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.entities.characters.Enemy
     */
    Enemy.GROUP = 'enemy';
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Enemy;
    
    /**
     * Handles the collision of this entity with another
     * 
     * @param {app.classes.game.entities.base.Entity} entity
     */
    api.handleCollision = function (entity) {
        
        // call super mehtod
        Super.prototype.handleCollision.call(this, entity);
                
        if (entity instanceof Enemy) {
            
            if (app.classes.game.entities.base.Character.areWhithinCollisionThreshold(this, entity)) {
                
                // also behave like a boundary
                app.classes.game.utils.Collisions.entityWithBoundary.call(this, entity);
                
            }
            
        }
        else {
            
            // check harmful or helpful entity
            app.classes.game.utils.Collisions.characterUpdateLife.call(this, entity);
            
        }
        
        if (!this.isAlive()) {
            
            this.uncross();
            this.remove();
            
        }
        
    };
    
    Enemy.prototype = api;
    
    ns.set('app.classes.game.entities.characters.Enemy', Enemy);
    
 })();