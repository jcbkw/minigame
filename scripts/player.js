app.player = {

    /**
     * Draws the game player
     * @param {Element} parentElement 
     */
    render: function (parentElement) {

        var playerElement = document.createElement('div');

        playerElement.classList.add('player');
        
        playerElement.style.width = "25px";
        playerElement.style.height = "25px";

        parentElement.appendChild(playerElement);

    }

}