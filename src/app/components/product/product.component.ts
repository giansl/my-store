import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: ''
  }

  // eslint-disable-next-line  @angular-eslint/no-output-on-prefix
  @Output() onAddToCartClicked = new EventEmitter<Product>();

  constructor() { }

  onAddToCart() {
    this.onAddToCartClicked.emit(this.product);
  }

}
