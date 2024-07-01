/// variaveis globais
var DIRECTION = (
    IDLE: 0
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
);

var rounds = [5,5,3,3,2];
var colors = ['#labc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59d6'];

var Ball = {
    new: function (incrementedSpeed) {
        return {
        width:18,
        height:18,
        x: (this.canvas.width / 2) -9,
        y: (this.canvas.height / 2) - 9,
        moveX: DIRECTION.IDLE, moveY: DIRECTION.IDLE, speed: incrementedSpeed || 7
        };
    }
};


var Ai = {
    new: function (side) {
        return {
            width:18, 
            height: 180,
            x: side === 'left'? 150 : this.canvas.width - 18,
            y: (this.canvas.height / 2) - 35,
            move: DIRECTION.IDLE, 
            speed: 8,
        };
    }
}; 

var Game ={
    initialize: function() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = 1400;
        this.canvas.height = 10000;

        this.canvas.style.width = (this.canvas.width/2) + 'px';
        this.canvas.style.height = (this.canvas.height/2) + 'px';

        this.player = Ai.new.call(this, 'left');
        this.ai = Ai.new.call(this, 'right');
        this.ball = Ball.new.call(this);

        this.ai.speed = 5;
        this.running = this.over=false;
        this.turn = this.ai;
        this.time = this.round = 0;
        this.color = '#8c52ff' 
        
        Pong.menu();
        Pong.listen();
},

endGameMenu: function(text){
    Pong.context.font = '45px Courier New';
    Pong.context.fillStyle = this.color;

    Pong.context.fillRect(Pong.canvas.width/2 - 300, Pong.canvas.height/2 - 48, 700, 100);
    Pong.context.style.fill = '#ffffff';

    Pong.context.fillText(text, Pong.canvas.getWidth/2, Pong.canvas.getHeight/2 + 15);

    setTimeout(function() {
        Pong = Object.assign({}, Game);
        Pong.initialize();
    }, 3000);
},

menu: function() {
    Pong.draw();

    this.context.font = '50px Courier New';
    this.context.fillStyle = this.color;

    this.context.fillRect(Pong.canvas.width/2 - 350, Pong.canvas.height/2 - 48, 700, 100);
    
    this.context.style.fill = '#ffffff';

    this.context.fillText('Press any key to begin', this.canvas.width / 2, this.canvas.height / 2 + 15);

},

update: function (){
    if (!this.over) {
        if (this.ball.x <= 0) {
            Pong._resetTurn.call(this, this.ai, this.player);
        }
        if(this.ball.y >= this.canvas.width - this.ball.width) {
            Pong._resetTurn.call(this, this.player, this.ai);
        }
        if(this.ball.y <=0) {
            this.ball.moveY = DIRECTION.DOWN;
        }
        if(this.ball.y >= this.canvas.height - this.ball.height) {
            this.ball.moveY = DIRECTION.UP;
        }
}
