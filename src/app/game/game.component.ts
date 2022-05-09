import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';
import { DialogAppPlayerComponent } from '../dialog-app-player/dialog-app-player.component';

interface Item {
  name: string;
}


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string | any = "";
  item$: Observable<Item[]> | any;

  constructor(
    private route: ActivatedRoute, 
    public dialog: MatDialog, 
    public firestore: Firestore) {

  }

  ngOnInit(): void {
    this.newGame();
   
    this.route.queryParams.subscribe((params)=>{
      console.log(params);

     

    const coll = collection(this.firestore, 'games');
    this.item$ = collectionData(coll)
    this.item$.subscribe((gameUpdates: any) => {
      console.log("game Infos:", gameUpdates);
      



    })
    })

 
    console.log(this.item$);

  }

  newGame() {
    this.game = new Game();


     const coll = collection(this.firestore, "games")
      setDoc(doc(coll),
      {
        "currentPlayer":this.game.toJson().currentPlayer,
        "playedCard":this.game.toJson().playedCard,
        "player":this.game.toJson().player,
        "stack":this.game.toJson().stack,
    })
    console.log("collection.id:",coll.id);
    



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

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name)
      }
    });
  }
}
