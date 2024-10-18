import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-collab-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './collab-dialog.component.html',
  styleUrl: './collab-dialog.component.css'
})
export class CollabDialogComponent {

  roomId: any = '';

  sendInvite() {
    // Logic to send email invites
  }

  copyRoomId() {
    navigator.clipboard.writeText(this.roomId);
    // Notify user that Room ID is copied
  }

  addMoreCollaborators() {

  }

}
