let Game = true;

var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png'; //declared
    this.height = 65;
    this.width = 95;
    this.collision = false;
};
Enemy.prototype.update = function (dt) {
    //  this.x += 150 * dt;
    if (this.x > ctx.canvas.width + this.width) {
        this.x = - 200 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += 150 * dt;
    }
    //Vehicle-player collision resets the game
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.collision = true;

        if (player) {
            player.x = 202;
            player.y = 400;
        }
    } else {
        this.collision = false;
    }
};
//Vehicle-player collisions happen logically (not too early or too late)
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function (x, y, sprite) { // add parameterss
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.update = function (dt) {
    if (Game && player.y < 40) {
        Game = false;
        congratulation(); // Something happens when player wins
    }
};
//Player can not move off screen
Player.prototype.handleInput = function (direction) {
    const h = 100,
        v = 83;
    if (direction === 'left' && this.x - h >= 0) {
        this.x -= h;
    } else if (direction === 'right' && this.x + h < ctx.canvas.width - 100) {  //content of canvas width 505 height 606
        this.x += h;
    } else if (direction === 'down' && this.y + v < ctx.canvas.height - 200) {
        this.y += v;
    } else if (direction === 'up' && this.y + v > ctx.canvas.height - 500) {
        this.y -= v;
    }
}
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
const player = new Player(200, 400, 'images/char-pink-girl.png'); //player character  possition = x
const enemyAreaPosition = [55, 140, 230];  // position y
let allEnemies = enemyAreaPosition.map((y, index) => {
    return new Enemy((-200 * (index + 1)), y);
});
function congratulation() { // create winning function
    gameReset();
    alert('congratulation ! you won');
}
function gameReset() {
    allEnemies = [];
}
//  create function for Vehicle-player collisions happen logically (not too early or too late)
function collision(player_x, player_y, player_w, player_ht, enemy_x, enemy_y, enemy_w, enemy_ht) {
    return (Math.abs(player_x - enemy_x) * 2 < player_w + enemy_w) && (Math.abs(player_y - enemy_y) * 2 < player_ht + enemy_ht);
}