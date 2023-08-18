const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.querySelector('.score');

let jumpCount = 0;
let advanceCount = 0;
let isJumping = false;
let hasCollided = false;

const som_Jump = new Audio ();
som_Jump.src = './soundeffect/Jump.mp3';

const som_Fim = new Audio ();
som_Fim.src = './soundeffect/Fim.mp3';

const som_Fundo = new Audio ();
som_Fundo.src ='soundeffect/Fundo.mp3';
som_Fundo.loop = true;

document.addEventListener('DOMContentLoaded', () => {
    som_Fundo.play();

});

const jump = () => {
    if (!isJumping && !hasCollided) {
        isJumping = true;
        som_Jump.play();
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
            isJumping = false;
        }, 500);
    }
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        clearInterval(loop);
        som_Fim.play();

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './assets/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '50px';

        som_Jump.pause();
        som_Jump.currentTime = 0;
        som_Fundo.pause();
        som_Fundo.currentTime = 0;
        hasCollided = true;
    }

    if (pipePosition <= 0) {
        updateScore('advance');
    }
}, 110);

const updateScore = (action) => {
    if (action === 'advance') {
        advanceCount++;
    }

    scoreDisplay.textContent = `${advanceCount}`;
}

document.addEventListener('keydown', jump);