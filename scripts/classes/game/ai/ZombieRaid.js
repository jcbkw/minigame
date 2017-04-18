/* global ns, app */

(function () {
    
    /**
     * @class ZombieRaid A Zombie Raid AI class
     * @param {type} stage
     */
    function ZombieRaid (stage) {
        
        app.classes.game.ai.Ai.call(this, stage);
        
    }
    
    /**
     * @type app.classes.game.ai.ZombieRaid.prototype
     */
    var api = new app.classes.game.ai.Ai;
    
    /**
     * Starts the AI computations
     */
    api.start = function () {
        
        var zombie = new app.classes.game.entities.characters.Enemy(75, 75, 32, 32);
        
        zombie.group.add('zombie', 'zombie4');
                        
        this.stage.addChild(zombie);
        
        zombie.pace().circle(40);
        
        this.characters.push(zombie);
        
        
        
        zombie = new app.classes.game.entities.characters.Enemy(0, -32, 32, 32);
        
        zombie.group.add('zombie', 'zombie1');
                        
        this.stage.addChild(zombie);
        
        zombie.pace().straight(100, true /*vertical*/);
                
        this.characters.push(zombie);
        
        
        zombie = new app.classes.game.entities.characters.Enemy(100, 32, 32, 32);
        
        zombie.group.add('zombie', 'zombie2');
                        
        this.stage.addChild(zombie);
        
        zombie.pace().straight(100, false /*vertical*/);
                
        this.characters.push(zombie);
        
        
        zombie = new app.classes.game.entities.characters.Enemy(175, 175, 32, 32);
        
        zombie.group.add('zombie', 'zombie3');
                        
        this.stage.addChild(zombie);
        
        zombie.pace().square(100);
                
        this.characters.push(zombie);
        
    };
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = ZombieRaid;
    
    ZombieRaid.prototype = api;
    
    ns.set('app.classes.game.ai.ZombieRaid', ZombieRaid);
    
})();