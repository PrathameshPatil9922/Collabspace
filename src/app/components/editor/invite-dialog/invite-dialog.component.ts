import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
})
export class InviteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: string }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
