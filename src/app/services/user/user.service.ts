import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.development';
import { User } from '../../model/user.model';
import { CustomSnackbarService } from '../customSnackbar/custom-snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);

  constructor(
    private customSnack: CustomSnackbarService,
  ) {

  }

  signupUser(user: User) {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`, user);
  }
}
