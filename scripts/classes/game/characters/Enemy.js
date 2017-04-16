 /* global app, ns */

(function () {
     
    /**
     * @class Enemy A base Enemy Class
     * 
     * @param {DisplayObject} stage
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Enemy (stage, x, y, width, height) {
        
        // call to super
        app.classes.game.characters.Attacker.call(this, stage, x, y, width, height);
                
        this.lifeGauge = new app.classes.game.characters.LifeBar(this);
        
        this.lifeGauge.render();
        
        this.setLifePoints(-1);
        
        this.group.add(Enemy.GROUP);
        
    }
        
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.characters.Enemy
     */
    Enemy.GROUP = 'enemy';
    
    /**
     * @type app.classes.game.characters.Enemy.prototype
     */
    var api = new app.classes.game.characters.Attacker;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Enemy;
    
    Enemy.prototype = api;
    
    ns.set('app.classes.game.characters.Enemy', Enemy);
    
 })();