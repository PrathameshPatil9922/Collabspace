import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CustomSnackbarService } from '../../services/customSnackbar/custom-snackbar.service';
import { LoginService } from '../../services/auth/login.service';
import { ToastrService } from 'ngx-toastr';

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
  error: string | null = null;

  loginService = inject(LoginService);


  constructor(private router: Router, public custom_snackbar: CustomSnackbarService,
    private toastr: ToastrService
  ) {
  }


  onSubmit() {
    // Create the payload with the form data
    /* const loginData = {
       email: this.email,
       password: this.password
     };
 
     console.log("email: ", this.email);
     console.log("pass: ", this.password);*/

    // Send the data to your backend or API
    // this.http.post('your-api-url-here', loginData).subscribe({
    //  next: (response) => {
    //  console.log('Login successful:', response);
    // Navigate to the main dashboard or another page after successful login

    /* if (this.email === 'admin@gmail.com' && this.password === 'admin') {
       console.log("Hello");
 
       //alert("Login Successful");
       this.openCustomSnackbar("User with email " + this.email + " loggedIn Successfully ", "Okay", "success");
       //this.toastr.success("User with email " + this.email + " loggedIn Successfully");
       this.router.navigate(['/user']);
     } else {
       console.log("Login Failed");
       this.openCustomSnackbar("Login Failed", "Try Again", "Error")
       //this.router.navigate(['/login']);
     }*/
    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.loginService.saveTokens(response.token, response.refreshToken, response.user);
        this.toastr.success("Login Successfull");
        this.router.navigate(['/user']);
      },
      error: (error) => {
        this.error = 'Invalid email or password';
      },
      complete: () => {
        console.log('Login process complete');
      }
    });
  }


  openCustomSnackbar(message: string, action: string, type: string) {
    (type == 'success') ?
      this.custom_snackbar.openSuccessSnackbar(message, action) :
      this.custom_snackbar.openErrorSnackbar(message, action);
  }
}
