var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

document.addEventListener("keydown", moveUp);

function moveUp() {
    pos_y-=25;
    fly.play();
}

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

var score = 0;
//bird posotion

var pos_x = 10;
var pos_y = 150;

var grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);
    
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(pos_x + bird.width >= pipe[i].x 
            && pos_x <= pipe[i].x + pipeUp.width 
            && (pos_y <= pipe[i].y + pipeUp.height 
                || pos_y + bird.height >= pipe[i].y + pipeUp.height + gap)
                || pos_y + bird.height >= cvs.height - fg.height){
                    ctx.font = "24 Veranda";
                    ctx.fillText("You lost!" + score, cvs.width/2, cvs.height/2);
                    
                    document.addEventListener("keydown", reloading);

                        function reloading() {
                            location.reload();
                        }    
        }

        if (pipe[i].x == 5){
            score++;
            score_audio.play();
        }
    }   
    
ctx.drawImage(fg, 0, cvs.height - fg.height);
ctx.drawImage(bird, pos_x, pos_y);

pos_y += grav;

ctx.fillStyle = "#000";
ctx.font = "24px Veranda";
ctx.fillText("Score: " + score, 10, cvs.height - 20);

requestAnimationFrame(draw);

}


pipeBottom.onload = draw; 