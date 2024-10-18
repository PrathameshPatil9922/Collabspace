import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title: string = "CollabSpace";

  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      interests: ['EDUCATION', Validators.required],
      profileImage: ['', Validators.required]
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName); // Use string indexing to access form controls
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length for ${controlName} is 3 characters`;
    }
    if (control?.hasError('maxlength')) {
      return 'Password must be between 4 and 8 characters';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.toastr.error('Please fill in the required fields');
      return;
    }

    const userData = this.signupForm.value;
    this.userService.signupUser(userData).subscribe({
      next: (response) => {
        this.toastr.success('Account created successfully!');
        this.router.navigate(['/login']); // Redirect to login after successful registration
      },
      error: (err) => {
        this.toastr.error('Failed to create account');
      }
    });
  }


}
