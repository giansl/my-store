import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img: string = '';
  @Output() imgLoaded = new EventEmitter<string>();
  imgDefault: string = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
  constructor() {
    // before render
    // NO Async -- one time
    //console.log('ImgComponent constructor', 'imgValue => ', this.img);
  }
/*
  ngOnChanges(): void {
    // before render
    // changes inputs - times
    console.log('ngOnChanges', 'imgValue => ', this.img);
  }
*/
  ngOnInit(): void {
    // before render
    // async -- fetch -- one time
    //console.log('ngOnInit', 'imgValue => ', this.img);
    let consol = true;
  }
/*
  ngAfterViewInit(): void {
    // after render
    // handle DOM children
    console.log('ngAfterViewInit', 'imgValue => ', this.img);
  }

  ngOnDestroy(): void {
    //delte
    console.log('ngOnDestroy', 'imgValue => ', this.img);
  }*/

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoad() {
   // console.log('Imagen cargada');
    //this.img = this.img;
    this.imgLoaded.emit(this.img);
  }

}
