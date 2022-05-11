import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {
  game!: Game;
  constructor(private router: Router, private firestore: Firestore) { }

  ngOnInit(): void {
  }
  async newGame(){
    //start game
    this.game = new Game();



    const docRef = await addDoc(collection(this.firestore, 'games'),
      {
        "currentPlayer":this.game.toJson().currentPlayer,
          "playedCard": this.game.toJson().playedCard,
            "players": this.game.toJson().players,
            "playerPictures": this.game.toJson().playerPictures,

              "stack": this.game.toJson().stack,
              "pickCardAnimation":this.game.toJson().pickCardAnimation,
              "currentCard":this.game.toJson().currentCard,
              "distance":this.game.distance,
    })



   this.router.navigateByUrl('game/'+docRef.id)
  }
}
