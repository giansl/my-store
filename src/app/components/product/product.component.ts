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
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  }

  // eslint-disable-next-line  @angular-eslint/no-output-on-prefix
  @Output() onAddToCartClicked = new EventEmitter<Product>();
  @Output() onShowDetailClicked = new EventEmitter<string>();

  constructor() { }

  onAddToCart() {
    this.onAddToCartClicked.emit(this.product);
  }

  onShowDetail() {
    this.onShowDetailClicked.emit(this.product.id);
  }

}
