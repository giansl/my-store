import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  token: string = '';
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  createUser(){
    this.usersService.create({
      name: 'John Doe',
      email: 'giansolis@gmail.com',
      password: '123456'
    })
    .subscribe(user => {
      console.log(user);
    });
  }

}
