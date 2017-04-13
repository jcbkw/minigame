/* global app, ns */

(function () {
    
    var BaseClass = app.classes.game.characters.DisplayGauge,
    
        /**
         * @lends app.classes.game.characters.LifeBar.prototype
         */
        api = new BaseClass;
    
    /**
     * Creates a LifeBar instance
     * 
     * @class
     * 
     * @augments app.classes.game.characters.DisplayGauge
     * 
     * @param {DisplayObject} container
     */
    function LifeBar (container) {
        
        var height = 5,
            width = 25,
            x = (container.width / 2) - (width / 2),
            y = -(height * 2);
           
        BaseClass.call(this, container, x, y, width, height);
        this.group.add(LifeBar.GROUP);
        
        createMeter(this);
       
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.characters.LifeBar
     */
    LifeBar.GROUP = 'lifebar';
    
    /**
     * @type {app.classes.display.DisplayObject}
     */
    api.meter = null;
    
    /**
     * Set this gauge's life points.
     * 
     * @param {Number} value
     */
    api.setLife = function (value) {
        
        BaseClass.prototype.setLife.call(this, value);
        
        if (this.meter) {
            
            var percent  = app.etc.calc.toPercent(this.getLife(), this.getMax());
            var newWidth = app.etc.calc.ofPercent(this.width, percent);
            
            this.meter.setSize(newWidth, this.height);
           
            
            console.log(newWidth + 'px');
            console.log('enemy hit. life now ' + this.getLife());
            
        }
        
    };
    
    function createMeter (lifeBar) {
        
        lifeBar.meter = new app.classes.display.DisplayObject(lifeBar, 0, 0, 
        lifeBar.width, lifeBar.height);
        
        lifeBar.meter.group.add("lifebar-meter");
        
        lifeBar.meter.render();
    }
    
    LifeBar.prototype = api;
    
    ns.set("app.classes.game.characters.LifeBar", LifeBar);
    
})();