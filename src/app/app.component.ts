import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Nicolas';
  age = 18;
  img = '';
  btnDisabled = false;
  person = {
    name: 'Nicolas',
    age: 18,
    avatar: ''
  }
}
