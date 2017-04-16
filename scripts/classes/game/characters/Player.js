 /* global app, ns */

(function () {
     
    /**
     * @class Player A base Player Class
     * 
     * @param {DisplayObject} stage
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [width=0]
     * @param {Number} [height=0]
     */
    function Player (stage, x, y, width, height) {
        
        // call to super
        app.classes.game.characters.Attacker.call(this, stage, x, y, width, height);
        this.group.add(Player.GROUP);
        
        this.joystick = new app.classes.game.Joystick();
        
        var that = this;
                
        function onJoystickButtonPress (button) {

            if (button === app.classes.game.Joystick.buttons.ACTION) {

                that.attack();

            }

        };
        
        function onEachAnimationFrame () {

            onAnimationFrames(that);

        };

        app.onTick(onEachAnimationFrame);
        this.joystick.onButtonPressed(onJoystickButtonPress);
        
    }
    
    /**
     * The display object's group.
     * 
     * @static
     * @name GROUP
     * @type String
     * @memberOf app.classes.game.characters.Player
     */
    Player.GROUP = 'player';
        
    /**
     * @type app.classes.game.characters.Player.prototype
     */
    var api = new app.classes.game.characters.Attacker;
    
    /**
     * @property {Function} constructor Constructor
     */
    api.constructor = Player;
    
    /**
     * This gets called on each application tick.
     * It checks the directions listed by the joystick
     * and moves the player towards them.
     * 
     * The function also assigns the correct position
     * classes to the player so that the correct sprites
     * get displayed.
     * 
     * @private
     * @param {app.classes.game.chracters.Player} player
     */
    function onAnimationFrames (player) {
        
//        var character = app.ai.hitsCharacter(player);
//            
//            if (character) {
//                
//                // remove
//                //bullet.clear();
//                console.log('nice');
//                
//            }
            

        var count = player.joystick.directions.length,
            i;
        
        if (count === 0) {
            
            player.setInMotion(false);

        }
        else {
            
            player.setInMotion(true);
            player.setStance(resolveDirection(player.joystick.directions));

            for (i = 0; i < count; i += 1) {

                player.step(player.joystick.directions[i]);

            }

        }

    }

    /**
     * Computes the directional attribute to use
     * based on the provided directions array.
     * 
     * @private
     * @param {String[]} directions 
     */
    function resolveDirection (directions) {

        var result;

        // check for diagonals
        if (directions.indexOf(app.classes.geom.Direction.LEFT) !== -1) {

            if (directions.indexOf(app.classes.geom.Direction.UP) !== -1) {

                // diagonal leftup
                result = app.classes.geom.Direction.LEFT + app.classes.geom.Direction.UP;

            }
            else if (directions.indexOf(app.classes.geom.Direction.DOWN) !== -1) {

                // diagonal leftdown
                result = app.classes.geom.Direction.LEFT + app.classes.geom.Direction.DOWN;

            }

        }
        else if (directions.indexOf(app.classes.geom.Direction.RIGHT) !== -1) {

            if (directions.indexOf(app.classes.geom.Direction.UP) !== -1) {

                // diagonal rightup
                result = app.classes.geom.Direction.RIGHT + app.classes.geom.Direction.UP;

            }
            else if (directions.indexOf(app.classes.geom.Direction.DOWN) !== -1) {

                // diagonal rightdown
                result = app.classes.geom.Direction.RIGHT + app.classes.geom.Direction.DOWN;

            }

        }

        // no diagonal found
        if (!result) {

            // then use the last item
            result = directions[directions.length - 1];

        }

        return result || "";

    }
    
    Player.prototype = api;
    
    ns.set('app.classes.game.characters.Player', Player);
    
 })();