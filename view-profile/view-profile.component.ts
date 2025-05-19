import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, UserProfile } from '../../services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  isLoading = false;
  errorMessage = '';
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Get the user ID from the route parameters or query params
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id'];
        this.loadUserProfile();
      }
    });

    // If not in route params, check query params
    if (this.userId === 0) {
      this.route.queryParams.subscribe(params => {
        if (params['userId']) {
          this.userId = +params['userId'];
          this.loadUserProfile();
        }
      });
    }

    // If still no userId, try to get from localStorage or a default value
    if (this.userId === 0) {
      // You might want to get the current logged-in user ID from a service or localStorage
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.userId = +storedUserId;
        this.loadUserProfile();
      } else {
        this.errorMessage = 'No user ID provided.';
      }
    }
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getUserProfile(this.userId).subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load user profile. Please try again.';
        console.error('Error loading user profile:', error);
        this.isLoading = false;
      }
    });
  }
}
