import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../helper/custom-snackbar/custom-snackbar.component';

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
