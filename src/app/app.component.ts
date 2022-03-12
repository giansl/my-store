import { Component } from '@angular/core';
import { Product } from './models/product.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  img: string = 'https://th.bing.com/th/id/OIP.jkfj3RRhE4S34BK4-NqXSgHaH3?pid=ImgDet&rs=1';


  onLoaded(img: string) {
    console.log('Imagen cargada Padre', img);
  }
  /*
  register = {
    name: '',
    email: '',
    password: '',
  }
  name = 'Nicolas';
  age = 18;
  img = '';
  btnDisabled = false;
  person = {
    name: 'Nicolas',
    age: 18,
    avatar: ''
  }

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  increaseAge() {
    this.person.age++;
  }

  onScroll(event: Event) {
    console.log(event);
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  changeName(event: Event) {
    this.person.name = (event.target as HTMLInputElement).value;
  }

  onRegister() {
    console.log(this.register);
  }
*/
}
