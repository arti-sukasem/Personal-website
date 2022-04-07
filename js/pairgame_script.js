"use strict";

class AudioController {
    constructor() {
        this.bgMusic = new Audio('files/Audio/background.wav');
        this.flipMusic = new Audio('files/Audio/flip.wav');
        this.matchMusic = new Audio('files/Audio/match.wav');
        this.victorySound = new Audio('files/Audio/victory.wav');
        this.gameOverSound = new Audio('files/Audio/gameover.wav');
        this.bgMusic.volume = 0.05;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipMusic.play();
    }
    match() {
        this.matchMusic.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.totalMatch = 0;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('timer');
        this.ticker = document.getElementById('fliptimes');
        this.audioController = new AudioController();
        this.matched = document.getElementById('matched');
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        this.shuffleCards();
        this.showAllCard();
        setTimeout(() => {
            this.audioController.startMusic();
            this.hideAllCard();
            this.busy = false;
        }, 1000)
        this.timer.innerHTML = this.timeRemaining;
    }    
    showAllCard() {
        this.cardsArray.forEach(card => {
            card.classList.add('visible');
        })
    }
    hideAllCard() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
        })
    }
    flipCard(card) {
        if(this.canFlipCard(card)){
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerHTML = this.totalClicks;
            card.classList.add('visible');
            if(this.cardToCheck){
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card){
        if(this.getCardType(card) === this.getCardType(this.cardToCheck)){
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMisMatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }
    cardMatch(card1, card2){
        this.totalMatch ++;
        this.matched.innerHTML = this.totalMatch;
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        console.log(this.cardsArray.length)
        console.log(this.matchedCards.length)
        if (this.cardsArray.length === this.matchedCards.length){
            this.victory();
        }
    }
    cardMisMatch(card1, card2){
        this.busy = true
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false
        }, 500);
    }
    getCardType(card){
        return card.getElementsByClassName('font-logo')[0].src; 
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let new_i = Math.floor(Math.random() * (i+1));
            this.cardsArray[new_i].style.order = i;
            this.cardsArray[i].style.order = new_i;
        }
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerHTML = this.timeRemaining;
            if (this.timeRemaining === 0) this.gameOver();
        }, 1000)
    }
    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('gameover-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }
}

function ready() {
    let duration = 100;
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(duration, cards);
    let audioController = new AudioController();

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        })
    })
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        })
    })
}

const disableselect = () => {  
    return false  
  }  
document.onselectstart = disableselect  


if(document.readyState === 'loading'){
    document.addEventListener('DOMContLoaded', ready());
} else {
    ready();
}

