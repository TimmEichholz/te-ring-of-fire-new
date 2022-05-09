import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-app-player',
  templateUrl: './dialog-app-player.component.html',
  styleUrls: ['./dialog-app-player.component.scss']
})
export class DialogAppPlayerComponent implements OnInit {
  name:string='';
  constructor(private dialogRef: MatDialogRef<DialogAppPlayerComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
