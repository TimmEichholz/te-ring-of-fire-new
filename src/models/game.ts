export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCard: string[] = [];
    public currentPlayer: number = 0;
 public  pickCardAnimation = false;
  public  currentCard: string | any = "";
  public playerPictures: string[]=[];
  public distance: number=322;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('hearts_' + i)
            this.stack.push('ace_' + i)
            this.stack.push('clubs_' + i)
            this.stack.push('diamonds_' + i)
        }

        shuffle(this.stack)
    }
    public toJson() {
        return {
            players: this.players,
            playerPictures: this.playerPictures,
            stack: this.stack,
            playedCard: this.playedCard,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
            distance: this.distance
       
        }
    }
}

function shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}