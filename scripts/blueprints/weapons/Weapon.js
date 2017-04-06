(function () {

    /**
     * @class Weapon The base Weapon class
     * @param {app.player} player 
     */
    function Weapon (player) {

        this.player = player;

    }

    /**
     * 
     */
    Weapon.prototype.attack =  function () {};

    Weapon.prototype.getPlayer  =  function () {

        return this.player;

    };

    Weapon.prototype.constructor = Weapon;
    app.blueprints.weapons.Weapon = Weapon;

})();