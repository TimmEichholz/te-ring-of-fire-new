import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { collection, doc, getDoc, setDoc, getDocs, addDoc, updateDoc, onSnapshot } from 'firebase/firestore';
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
 
  item$: Observable<Item[]> | any;
  game!: Game;

  coll = collection(this.firestore, 'games');


  gameId!: string;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public firestore: Firestore) {


  }
  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      console.log("params:", params['id']);
      this.gameId = params['id'];



      this.item$ = collectionData(this.coll)

      this.item$ = collectionData(this.coll, params['id'])


/*
      this
        .item$
        .subscribe((gameUpdates: any) => {
          console.log("game Infos:", gameUpdates);

         


        })
*/
const unsub = onSnapshot(doc(this.firestore, "games", this.gameId), (doc) =>{

  const gameUpdate:any = doc.data()
  console.log("game Infos:", gameUpdate);
  this.game.currentPlayer = gameUpdate['currentPlayer']
  this.game.players = gameUpdate['players']
  this.game.stack = gameUpdate['stack']
  this.game.playedCard = gameUpdate['playedCard']
  this.game.pickCardAnimation =gameUpdate['pickCardAnimation']
  this.game.currentCard =gameUpdate['currentCard']

})

    })



  }

  newGame() {
    this.game = new Game();


    /*
        const docRef = await addDoc(collection(this.firestore, 'games', ),
          {
            "currentPlayer":this.game.toJson().currentPlayer,
              "playedCard": this.game.toJson().playedCard,
                "players": this.game.toJson().players,
                  "stack": this.game.toJson().stack,
        })
       console.log("docRef", docRef['id']);
     /*
        
       const docRef = await addDoc(collection(this.firestore, "cities"), {
        name: "Tokyo",
        country: "Japan"
      });
      console.log("Document written with ID: ", docRef.id);
    */




  }

  pickCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true
      this.saveGame()

      if(this.game.players.length >= 1){
      this.game.currentPlayer++;
      //% = Modulu operator. Rest wert überprüfung. Sobald der erste operator durch den zweiten operator teilbar ist wird dieser wieder auf 0 gesetzt.
      //bsp x = x % 2
      // 0 = 0 % 2
      // 1 = 1 % 2
      // 0 = 2 % 2


      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
     }
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCard.push(this.game.currentCard)
        this.saveGame()
      }, 1500)

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAppPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        console.log("vor save", this.game);

        this.game.players.push(name)
        this.saveGame()
        console.log("nach save", this.game);

      }
    });
  }

  saveGame() {
    updateDoc(doc(this.firestore, "games", this.gameId), {
      "currentPlayer": this.game.toJson().currentPlayer,
      "playedCard": this.game.toJson().playedCard,
      "players": this.game.toJson().players,
      "stack": this.game.toJson().stack,
      "pickCardAnimation":this.game.toJson().pickCardAnimation,
      "currentCard":this.game.toJson().currentCard,

    })
  }
}
