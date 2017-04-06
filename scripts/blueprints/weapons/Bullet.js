(function () {

    function Bullet (weapon) {

        this.weapon     = weapon;
        this.element    = null;
        this.speed      = 5;
        this.height     = 5;
        this.width      = 5;
        this.x          = 0;
        this.y          = 0;

    }

    Bullet.prototype.fire = function () {

        var player      = this.weapon.getPlayer(),
            stance      = player.stance();

        this.speed      = this.speed + player.stepSize;
        this.element    = document.createElement('div');

        this.element.classList.add('bullet');

        this.element.style.width    = this.width  + "px";
        this.element.style.height   = this.height + "px";
        
        // position the bullet at the center of the player
        this.x          = player.x + (player.width  / 2);
        this.y          = player.y + (player.height / 2);

        this.element.style.top   = this.y + "px";
        this.element.style.left  = this.x + "px";

        app.stage.element.appendChild(this.element);

        shoot(
            this,

            app.stage.width,
            app.stage.height,

            stance && stance.indexOf(app.player.direction.UP)     !== -1,
            stance && stance.indexOf(app.player.direction.DOWN)   !== -1,
            stance && stance.indexOf(app.player.direction.LEFT)   !== -1,
            stance && stance.indexOf(app.player.direction.RIGHT)  !== -1
        );

    };

    Bullet.prototype.clear = function () {

        if (this.element) {

            this.element.parentNode.removeChild(this.element);

            this.weapon     = 
            this.element    = null;

        }

    }

    function shoot (bullet, rightLimit, bottomLimit, up, down, left, right) {

        app.onTick(function bulletTick () {
            
            if (down) {

                bullet.y               += bullet.speed;
                
            }

            if (up) {

                bullet.y               -= bullet.speed;

            }

            if (left) {

                bullet.x               -= bullet.speed;

            }
            if (right) {

                bullet.x               += bullet.speed;

            }
            
            // if out of bounds
            if (

                    bullet.y <= 0
                ||  bullet.x <= 0
                ||  bullet.x >= rightLimit
                ||  bullet.y >= bottomLimit

            ) {

                // remove
                bullet.clear();
                app.unTick(bulletTick);

            }
            else {

                // push forward
                bullet.element.style.top   = bullet.y + "px";
                bullet.element.style.left  = bullet.x + "px";
                
            }

        });
        
    }

    Bullet.prototype.constructor = Bullet;
    app.blueprints.weapons.Bullet = Bullet;

})();