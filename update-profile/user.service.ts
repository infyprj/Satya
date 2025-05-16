import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface UserProfile {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get user profile by ID
  getUserProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/api/User/${userId}`);
  }

  // Update user profile
  updateUserProfile(userProfile: UserProfile): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/api/User/UpdateUserDetails`, userProfile);
  }
}

