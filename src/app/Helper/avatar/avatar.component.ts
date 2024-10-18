import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  @Input() name!: string;
  @Input() profileImage: string | null = null;
  @Input() isOnline: boolean = true;

  // Function to get initials if no profile image
  get initials(): string {
    if (this.name) {
      return this.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return '';
  }

}
