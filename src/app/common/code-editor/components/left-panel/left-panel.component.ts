import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatListModule, MatIconModule],
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
})
export class LeftPanelComponent {
  isDarkMode = false;
  searchTerm = '';
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'file',
      label: 'File',
      route: '',
    },
    {
      icon: 'logout',
      label: "Logout",
      route: '',
    },
    {
      icon: 'Collaborate',
      label: 'Collaborate',
      route: '',
    }
    // Add more items as needed
  ]);

  picImg = computed(() => this.sideNavCollapsed() ? '32' : '100');

  filteredMenuItems() {
    return this.menuItems().filter(item =>
      item.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectItem(item: MenuItem) {
    console.log('Selected Item:', item);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  logout() {
    // Implement logout functionality
    console.log("User logged out");
  }
}
