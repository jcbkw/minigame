/* global app, ns */

(function () {
    
    /**
     * @class A Bullet class.
     * 
     * @param {Weapon} weapon
     * @param {DisplayObject} container
     */
    function Bullet (weapon, container) {
        
        // call to super
        app.classes.game.entities.Entity.call(this,
                                               container, 
                                               /*x*/0, /*y*/0, 
                                               /*width*/5, /*height*/5);
        
        this.weapon     = weapon;
        this.tickFn     = null;
        this.speed      = 5;
        
        this.setLifePoints(-5);
        
        this.group.add(Bullet.GROUP);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.weapons.Bullet
     */
    Bullet.GROUP = 'bullet';
    
    /**
     * @type app.classes.game.weapons.Bullet
     */
    var api = new app.classes.game.entities.Entity;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Bullet;

    /**
     * Fires this bullet accross the stage.
     */
    api.fire = function () {

        var attacker    = this.weapon.getUser(),
            stance      = attacker.getStance();
            
        this.speed      = this.speed + attacker.stepSize;
        
        this.setBounds(this.container.toBounds());
        
        // position the bullet at the center of the attacker
        this.setPosition(attacker.x + (attacker.width  / 2),
                         attacker.y + (attacker.height / 2));
        
        this.container.addChild(this);
        
        shoot(
            this,            
            stance && stance.indexOf(app.classes.geom.Direction.UP)     !== -1,
            stance && stance.indexOf(app.classes.geom.Direction.DOWN)   !== -1,
            stance && stance.indexOf(app.classes.geom.Direction.LEFT)   !== -1,
            stance && stance.indexOf(app.classes.geom.Direction.RIGHT)  !== -1
        );

    };

    /**
     * Removes this bullet from the stage
     */
    api.clear = function () {

        this.unrender();
            
        this.weapon         = null;

        if (this.tickFn) {

            app.unTick(this.tickFn);
            
            this.tickFn     = null;

        }

    };

    function shoot (bullet, up, down, left, right) {

        bullet.tickFn = function () {
            
            /////////
            // todo this is just to test
            var character = app.ai.hitsCharacter(bullet);
            
            if (character) {
                
                if (character instanceof app.classes.game.characters.Enemy) {
                    
                    character.handleCollision(bullet);
                    
                    if (!character.isAlive()) {
                        
                        character.uncross();
                        character.unrender();
                        
                    }
                    
                }
                
                // remove
                bullet.clear();
                
            }
            ////////////
            ////////////
            
            if (down) {

                bullet.y               += bullet.speed;
                
            }

            if (up) {

                bullet.y               -= bullet.speed;

            }

            if (left) {

                bullet.x               -= bullet.speed;

            }
            
            if (right) {

                bullet.x               += bullet.speed;

            }
            
            // if out of bounds
            if (bullet.isOutOfBounds()) {

                // remove
                bullet.clear();
                
            }
            else {

                // push forward
                bullet.setPosition(bullet.x, bullet.y);
                
            }

        };

        app.onTick(bullet.tickFn);
        
    }

    Bullet.prototype = api;
    
    ns.set('app.classes.game.weapons.Bullet', Bullet);

})();