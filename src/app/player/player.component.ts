import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name!:string;
  @Input() playerActive:boolean = false;
  @Input() playerLeft: boolean = false;
  @Input() playerRight: boolean = false;
  @Input() profil ="1.webp"

  constructor() { }

  ngOnInit(): void {
  }

}
