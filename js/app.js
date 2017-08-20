'use strict';

// global variables for points
var score = 0;
var hits = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // starting place for the enemies
    var x = [-200, -100, -50, 0];
    var y = [60, 145, 225];
    this.x = x[Math.floor(Math.random() * 4)];
    this.y = y[Math.floor(Math.random() * 3)];
  
    // setting random speed
    this.s = [200, 250, 300, 500, 600];
    this.speed = this.s[Math.floor(Math.random() * 5)];

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // resetting the enemy positions and different speeds
    var x = [-600, -500, -400, -300, -200, -100];
    var yLoc = [60, 145, 225];

    
    // new enemy location
    this.x += this.speed * dt;

    // relocate the enemy if it is outside the canvas
    if(this.x >= 500){
      this.x = x[Math.floor(Math.random() * 6)];
      this.y = yLoc[Math.floor(Math.random() * 3)];
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function() {

    // if the player reaches the river(top position), set it back to the initial position
    if (this.y <= 50){
      this.y = 400;
      score += 100;
    }

    // check for collision and relocate the player
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.x + 70 >= allEnemies[i].x && this.x <= allEnemies[i].x + 70) && (this.y + 70 >= allEnemies[i].y && this.y <=      allEnemies[i].y + 70)) {
              console.log("Hit");
              this.x = 200;
              this.y = 400;
              hits++;
        }
    }
};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillText(score, 35, 575);  // display score
    ctx.fillText(hits, 450, 575);  // display hits
};

Player.prototype.handleInput = function(key) {
   // put the player inside the canvas

    if (key === 'left'){
      if (this.x >= 50){
        this.x -= 100;
      }
    }

    else if (key === 'up'){
      if (this.y >= 50){
        this.y -= 85;
      }
    }

    else if (key === 'right'){
      if (this.x <= 300){
        this.x += 100;
      }
    }

    else if (key === 'down'){
      if (this.y < 400){
        this.y += 85;
      }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
