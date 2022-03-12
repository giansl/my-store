import { Component } from '@angular/core';
import { Product } from './product.model';
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
  products: Product[] = [
    {
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg',
      category: 'all',
    },
    {
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
    {
      name: 'Casa para perro',
      price: 34,
      image: './assets/images/house.jpg'
    },
    {
      name: 'Gafas',
      price: 3434,
      image: './assets/images/glasses.jpg'
    }
  ]
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
