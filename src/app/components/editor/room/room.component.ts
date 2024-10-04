import { Component, inject } from '@angular/core';
import { WebSocketService } from '../../../service/web-socket.service';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { InviteDialogComponent } from '../invite-dialog/invite-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MenuComponent } from '../menu/menu.component';
import { CodeEditorComponent } from "../code-editor/code-editor.component";

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [DialogModule, MatSidenavModule, MatNavList, MatListModule, MenuComponent, CodeEditorComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  roomId: string = '';

  http = inject(HttpClient);

  constructor(private websocketService: WebSocketService, public dialog: MatDialog) { }

  createRoom() {
    this.roomId = Math.random().toString(36).substring(2, 8);
    console.log('Room ID:', this.roomId);
    // Add logic to notify others or store this ID if needed
  }

  inviteFriends() {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      width: '250px',
      data: { roomId: this.roomId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Invite dialog was closed');
    });
  }

  toggleSidebar() {
    // Logic to toggle the sidebar
  }
} import { HttpClient } from '@angular/common/http';

