import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
images=['1.webp','2.png', 'ace_1.png'];
picture:any;
constructor(private dialogRef: MatDialogRef<EditPlayerComponent>) { }
  
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

 
}

