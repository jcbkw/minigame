app.player = {

    /**
     * The player element
     * @type Element
     */
    element: null,

    /**
     * The player width
     * @type Number
     */
    width: 25,

    /**
     * The player height
     * @type Number
     */
    height: 25,

    /**
     * Horizontal position of the player on the stage.
     * @type Number  
     */
    x: 10, 
    
    /**
     * Vertical position of the player on the stage.  
     * @type Number
     */
    y: 20, 

    /**
     * Draws the game player
     * @param {Element} parentElement 
     */
    render: function (parentElement) {
        
        var playerElement = document.createElement('div');

        playerElement.classList.add('player');
        
        playerElement.style.width = this.width + "px";
        playerElement.style.height = this.height + "px";
        
        playerElement.style.top = this.y + "px";
        playerElement.style.left = this.x + "px";

        parentElement.appendChild(playerElement);

    }

}