/* global app */

(function () {
    
    function RaidAi () {}

    RaidAi.prototype = {
        
        constructor: RaidAi,
        
        personalSpace: 10,
        
        raid: function (count){
            
            var bot,
                i;
            
            for (i = 0; i < count; i += 1 ) {
                
                bot = new app.blueprints.Bot();
                bot.render(app.stage.element);
                bot.moveTo((bot.width * i) + (this.personalSpace * i), 0);
                // bot.stepSize = 1 + Math.round(Math.random() * 4);
                bot.walk(0, app.stage.height);
                
            }
            
        }
        
        
    };
    
    
    
    app.blueprints.ais.RaidAi = RaidAi;
    
    
})();