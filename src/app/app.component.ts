import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  token: string = '';
  imgUpl:string = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fileService: FilesService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.authService.profile()
      .subscribe();
    }
  }

  createUser(){
    this.usersService.create({
      name: 'John Doe',
      email: 'giansolis@gmail.com',
      password: '123456',
      role: 'customer'
    })
    .subscribe(user => {
      console.log(user);
    });
  }

  downloadPdf(){
    this.fileService.getFile('test.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe(data => {
        console.log(data);
    });
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file)
        .subscribe(data => {
          this.imgUpl = data.location;
        });
    }
  }
}
