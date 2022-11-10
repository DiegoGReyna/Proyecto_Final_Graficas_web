export class Player{

    score; strikeCounter; barrelCounter; lose; inmunidad; inmunidadCounter; win = false;

    constructor(score, strikeCounter, barrelCounter, lose, inmunidad, inmunidadCounter){
        this.score = score;
        this.strikeCounter = strikeCounter;
        this.barrelCounter = barrelCounter;
        this.lose = lose;
        this.inmunidad = inmunidad;
        this.inmunidadCounter = inmunidadCounter;
    }
    
    
}