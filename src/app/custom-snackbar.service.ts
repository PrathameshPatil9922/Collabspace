import { Injectable } from '@angular/core';
import { CustomSnackbarComponent } from './utility/custom-snackbar/custom-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {

  constructor(private _snackbar: MatSnackBar) { }

  openSuccessSnackbar(message: string, action: string) {
    this._snackbar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: message,
        action: action,
        icon: 'done',
        snackbar: this._snackbar
      },
      duration: 2000,
      panelClass: 'success-snackbar'
    });
  }

  openErrorSnackbar(message: string, action: string) {
    this._snackbar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: message,
        action: action,
        icon: 'report_problem',
        snackbar: this._snackbar
      },
      duration: 2000,
      panelClass: 'success-snackbar'
    });
  }
}
