import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../../model/user.model';


interface JwtRequest {
  email: string;
  password: string;
}

interface JwtResponse {
  token: string;
  refreshToken: string;
  user: User;
  isOnline: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authState = signal(false);  // Authentication state signal
  private isOnlineState = signal(false);
  private token: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    this.refreshToken = localStorage.getItem('refreshToken');
    this.authState.set(!!this.token);
    const storedUser = localStorage.getItem('user');
    const isOnlineStored = localStorage.getItem('isOnline');
    if (storedUser && isOnlineStored !== null) {
      this.isOnlineState.set(isOnlineStored === 'true');  // Check if user was online
    }
  }

  isAuthenticated(): boolean {
    return this.authState();
  }

  getToken(): string | null {
    return this.token;
  }

  isOnline(): Signal<boolean> {
    return this.isOnlineState;
  }

  login(email: string, password: string): Observable<JwtResponse> {
    const credentials: JwtRequest = { email, password };
    return this.http.post<JwtResponse>('http://localhost:8080/auth/generate-token', credentials).pipe(
      tap(response => {
        // Save tokens and user data after successful login
        this.saveTokens(response.token, response.refreshToken, response.user);
        localStorage.setItem('isOnline', 'true'),
          this.isOnlineState.set(true);

      })
    );
  }

  saveTokens(token: string, refreshToken: string, user: User) {

    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isOnline', 'true');
    this.token = token;
    this.refreshToken = refreshToken;
    this.authState.set(true);  // Update signal state to authenticated
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.token = null;
    this.refreshToken = null;
    this.authState.set(false);  // Update signal state to not authenticated
    this.router.navigate(['/login']);
  }

  // Regenerate JWT using refresh token
  regenerateToken(): Observable<JwtResponse> {
    return this.http.post<JwtResponse>('http://localhost:8080/auth/regenerate-token', { refreshToken: this.refreshToken });
  }

}
