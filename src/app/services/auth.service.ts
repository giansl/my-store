import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, CreateUserDTO } from '../models/user.model';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password })
    .pipe(
      tap(auth => this.tokenService.saveToken(auth.access_token))
    );
  }

  profile(){
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  logout(){
    this.tokenService.removeToken();
  }
}
