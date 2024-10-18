import { Component, computed, HostListener, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../../helper/Custom_Search_Bar/search-bar/search-bar.component';
import { DarkModeService } from '../../../services/darkMode/dark-mode.service';
import { LoginService } from '../../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../helper/avatar/avatar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SearchBarComponent, CommonModule, AvatarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = "CollabSpace";

  darkModeService: DarkModeService = inject(DarkModeService);
  private authService = inject(LoginService);
  private router = inject(Router);

  isLoggedIn = computed(() => this.authService.isAuthenticated());
  isUserDetailsVisible = signal(false);
  isUserOnline = this.authService.isOnline();

  userSignal: WritableSignal<{ userName: string, userImg: string, userEmail: string }> = signal({
    userName: '',
    userImg: '',
    userEmail: '',
  });



  constructor() {
    // Load the persisted login state on initialization
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      const userInfo = JSON.parse(savedUser); // Parse the saved user data from string
      this.userSignal.set({
        userName: userInfo.name,
        userImg: userInfo.profileImage,
        userEmail: userInfo.email,
      });
    }
  }

  toggleDarkMode() {
    this.darkModeService.updateDarkMode();
  }

  toggleUserDetails() {
    this.isUserDetailsVisible.update((visible) => !visible);
    this.isUserDetailsVisible.set(true);

    // Delay closing popup to allow DOM to render
    setTimeout(() => {
      this.isUserDetailsVisible.update(visible => !visible);
    }, 0);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get userName(): string {
    return this.userSignal().userName;
  }

  get profileImage(): string {
    return this.userSignal().userImg;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const avatarElement = document.querySelector('.relative');
    const popupElement = document.querySelector('.absolute'); // Adjust the selector based on your popup class
    if (
      avatarElement && !avatarElement.contains(targetElement) &&
      popupElement && !popupElement.contains(targetElement)
    ) {
      this.isUserDetailsVisible.set(false);
    }
  }
}

