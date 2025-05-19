import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  email: string;
  passwordHash: string; // Will be received but not displayed
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  roleId: number; // Will be received but not displayed
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7195/api';

  constructor(private http: HttpClient) { }

  getUserProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/User/GetUserProfile?userId=${userId}`);
  }
}
