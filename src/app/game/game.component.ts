import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogAppPlayerComponent } from '../dialog-app-player/dialog-app-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string | any = "";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);

  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true

this.game.currentPlayer++;
//% = Modulu operator. Rest wert überprüfung. Sobald der erste operator durch den zweiten operator teilbar ist wird dieser wieder auf 0 gesetzt.
//bsp x = x % 2
// 0 = 0 % 2
// 1 = 1 % 2
// 0 = 2 % 2


this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCard.push(this.currentCard)
      }, 1500)

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAppPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      if(name &&name.length>0){
this.game.players.push(name)   
}});
  }
}
