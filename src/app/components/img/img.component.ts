import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img: string = '';
  @Output() imgLoaded = new EventEmitter<string>();
  imgDefault: string = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';

  constructor() { }

  ngOnInit(): void {
  }

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoad() {
    console.log('Imagen cargada');
    //this.img = this.img;
    this.imgLoaded.emit(this.img);
  }

}
