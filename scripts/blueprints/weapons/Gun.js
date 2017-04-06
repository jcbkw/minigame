(function (Weapon, Bullet) {

    function Gun (player) {

        Weapon.call(this, player);

        this.ammo = Number.POSITIVE_INFINITY;

    }

    Gun.prototype = new Weapon();

    Gun.prototype.attack =  function () {

        var bullet;

        if (this.ammo > 0) {
            
            bullet = new Bullet(this);

            bullet.fire();

            this.ammo--;

        }

    };
    
    Gun.prototype.constructor = Gun;
    app.blueprints.weapons.Gun = Gun;

})(app.blueprints.weapons.Weapon,
   app.blueprints.weapons.Bullet);