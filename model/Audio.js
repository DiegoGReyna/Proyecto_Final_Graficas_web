export class Sound{
    musicGame;
    getBarrelSound;
    loseSound;

    constructor(){
        this.musicGame = new Audio("./sound/music.mp3");
        this.getBarrelSound = new Audio("./sound/getBarrel.mp3");
        this.loseSound = new Audio("./sound/lose.mp3");
    }

    playMusic(vol){
        this.musicGame.loop = true;
        this.musicGame.volume = (vol/100);
        this.musicGame.play();
    }

    playgetBarrel(){
        this.getBarrelSound.volume = 1;
        this.getBarrelSound.play();
    }
}