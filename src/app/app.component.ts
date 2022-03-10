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

}
