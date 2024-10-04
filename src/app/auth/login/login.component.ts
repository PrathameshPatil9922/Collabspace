import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { CustomSnackbarService } from '../../custom-snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title: string = "CollabSpace";


  email: string = '';
  password: string = '';

  constructor(private router: Router, public custom_snackbar: CustomSnackbarService) {
  }


  onSubmit() {
    // Create the payload with the form data
    const loginData = {
      email: this.email,
      password: this.password
    };

    console.log("email: ", this.email);
    console.log("pass: ", this.password);

    // Send the data to your backend or API
    // this.http.post('your-api-url-here', loginData).subscribe({
    //  next: (response) => {
    //  console.log('Login successful:', response);
    // Navigate to the main dashboard or another page after successful login

    if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      console.log("Hello");

      //alert("Login Successful");
      this.openCustomSnackbar("User with email " + this.email + " loggedIn Successfully ", "Okay", "success");
      this.router.navigate(['/main_dash']);
    } else {
      console.log("Login Failed");
      this.openCustomSnackbar("Login Failed", "Try Again", "Error")
      //this.router.navigate(['/login']);
    }
  }

  openCustomSnackbar(message: string, action: string, type: string) {
    (type == 'success') ?
      this.custom_snackbar.openSuccessSnackbar(message, action) :
      this.custom_snackbar.openErrorSnackbar(message, action);
  }


}
