/* global app */

(function (Weapon) {
    
    function ExCalibur (player) {
        
        // calling Weapon's super constructor.
        Weapon.call(this, player);
        
    }
    
    // inheriting from Weapon (e.g. ExCalibur is thus a Weapon)
    ExCalibur.prototype = new Weapon();
    
    ExCalibur.prototype.attack = function (){
        
        var that = this;
        
        if (!that.drawn) { 
            
            that.drawn = true;
            
            this.element = document.createElement('div');
            this.element.classList.add('excalibur');
            this.element.style.width = 21 + "px";
            this.element.style.height = 32 + "px";
            
            this.player.element.appendChild(this.element);
            
            setTimeout(function () {
                
                that.element.parentNode.removeChild(that.element);
                
                that.drawn = false;
                
            }, 250);
            
        }
        

    };   
    
    // keeping a reference to the constructor in the
    // objects that are going to be created.
    
    ExCalibur.prototype.constructor = ExCalibur;
    
    // publicly exposing the constructor for future references.
    app.blueprints.weapons.ExCalibur = ExCalibur;
        
})(app.blueprints.weapons.Weapon);