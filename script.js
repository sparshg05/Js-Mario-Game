score = 0;
cross = true;
displayWelcome=true;

audiogo=new Audio("gameover.mp3");
audio=new Audio('music.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e){                                //Using event to get key
    console.log("Key Code: ", e.keyCode);
    if (e.keyCode == 32) {
        mario = document.querySelector('.mario');               //selecting the mario class
        mario.classList.add('animateMario');                   //When this class is added , then mario will jump
        setTimeout(() => {                                    //It is used to do a particular task after a particular time i.e. 700ms
            mario.classList.remove('animateMario');
        }, 500);
    }
    // if(e.keyCode==32 && displayWelcome==true){
    //     welcome.style.visibility='hidden';
    //     displayWelcome= false;
    // }
    if (e.keyCode == 39) {
        mario = document.querySelector('.mario');               //selecting the mario class
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));       //Taken the left value of mario 
        mario.style.left = marioX + 112 + 'px';
    }
    if (e.keyCode == 37) {
        mario = document.querySelector('.mario');               //selecting the mario class
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));       //Taken the left value of mario 
        mario.style.left = (marioX - 112) + 'px';
    }
}

setInterval(() => {                            //This function checks for the given time
    mario = document.querySelector('.mario');
    gameOver = document.querySelector('.gameOver');
    dragon = document.querySelector('.dragon');

    mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));             //Will give current X val of mario
    my = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));              //current top val of mario 

    dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));

    offsetX = Math.abs(mx - dx);
    offsetY = Math.abs(my - dy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.style.visibility = 'visible';                    //Display Game Over
        dragon.classList.remove('dragonAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();                                   //music will pause after 1 sec
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {                               //Making cross true after 1 second
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parsefloat(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));  //Getting the animation-duration property of dragon 
            newDur = aniDur - 0.1;                                               //Increasing dragon speed with time
            dragon.style.animationduration = newDur + 's';
        }, 500);

    }
}, 10);

function updateScore(score) {
    scoreCnt.innerHTML = 'Your Score : ' + score;
}