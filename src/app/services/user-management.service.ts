import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/environment.prod';
import { userModel } from '../features/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }
  
  createUser(user: userModel): Observable<any> {
    const url = `${environment.apiUrl}/users/`; 
    return this.http.post<any>(url, user);
  }

}
