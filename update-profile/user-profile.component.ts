import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile = {
    userId: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  };
  
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // In a real app, you would get the userId from authentication service or route params
    const userId = 6; // Using the example userId from your API request
    
    this.isLoading = true;
    this.userService.getUserProfile(userId).subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading user profile', error);
        this.errorMessage = 'Failed to load user profile. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.updateUserProfile(this.userProfile).subscribe({
      next: (result) => {
        this.isSubmitting = false;
        if (result) {
          this.successMessage = 'Profile updated successfully!';
        } else {
          this.errorMessage = 'Failed to update profile. Please try again.';
        }
      },
      error: (error) => {
        console.error('Error updating profile', error);
        this.errorMessage = 'An error occurred while updating your profile. Please try again later.';
        this.isSubmitting = false;
      }
    });
  }
}
