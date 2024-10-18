import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  authService = inject(LoginService);

  isLoggedIn = computed(() => this.authService.isAuthenticated());

}
