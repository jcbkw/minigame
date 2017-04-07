/* global app */

(function (Weapon) {
    
    function RedBane (player) {
        
        // calling Weapon's super constructor.
        Weapon.call(this, player);
        
    }
    
    // inheriting from Weapon (e.g. RedBane is thus a Weapon)
    RedBane.prototype = new Weapon();
    
    RedBane.prototype.attack = function (){
        
        var that = this;
        
        if (!that.drawn) { 
            
            that.drawn = true;
            
            this.element = document.createElement('div');
            this.element.classList.add('redbane');
            this.element.style.width = 48 + "px";
            this.element.style.height = 24 + "px";
            
            this.player.element.appendChild(this.element);
            
            function clear () {
                
                that.element.parentNode.removeChild(that.element);
                
                that.drawn = false;
                
            }
            
            this.element.addEventListener('webkitAnimationEnd',clear, false); 
            
        }
        

    };   
    
    // keeping a reference to the constructor in the
    // objects that are going to be created.
    
    RedBane.prototype.constructor = RedBane;
    
    // publicly exposing the constructor for future references.
    app.blueprints.weapons.RedBane = RedBane;
        
})(app.blueprints.weapons.Weapon);