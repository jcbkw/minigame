/* global app, ns */

(function () {
    
    function RaidAi () {}

    RaidAi.prototype = {
        
        constructor: RaidAi,
        
        personalSpace: 10,
        
        raid: function (count){
            
            var i, that = this;;
            
            for (i = 0; i < count; i += 1 ) {
                
                (function (index) {
               var bot = new app.classes.Bot();
                bot.render(app.stage.element);
                bot.moveTo((bot.width * index) + (that.personalSpace * index), 0);
                // bot.stepSize = 1 + Math.round(Math.random() * 2);
                // bot.walk(0, app.stage.height);
                
                var playerPosition = getPlayerPositionString();
                var botStopper     = bot.walkTo(app.player.x, app.player.y);
                
               app.onTick(function () {
                   
                    if (playerPosition !== getPlayerPositionString()) {
                        
                        botStopper();
                        
                        playerPosition = getPlayerPositionString();
                        botStopper     = bot.walkTo(app.player.x, app.player.y);
                        
                    }
                    
                });
                })(i);
                
                
            }
            
            function getPlayerPositionString () {
                
                return app.player.x + '' + app.player.y;
                
            }
            
           /* app.onTick(function () {
                
               if (app.utils.areColliding(bot, app.player)) {
                   
                   console.log('colliding');
                   
               }
               else {
                   
                   console.log('not colliding');
                   
               }
                
            });*/
            
        }
        
        
    };
    
    ns.set('app.classes.game.ai.RaidAi', RaidAi);
    
})();