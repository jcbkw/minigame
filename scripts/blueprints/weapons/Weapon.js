(function () {

    /**
     * @class Weapon The base Weapon class.
     * 
     * @param {app.player} player 
     */
    function Weapon (player) {

        this.player = player;

    }

    /**
     * Executes an attack with the current weapon.
     */
    Weapon.prototype.attack =  function () {};

    /**
     * Returns the player whom this weapon is assigned to.
     * 
     * @return {app.player}
     */
    Weapon.prototype.getPlayer  =  function () {

        return this.player;

    };

    Weapon.prototype.constructor = Weapon;
    app.blueprints.weapons.Weapon = Weapon;

})();