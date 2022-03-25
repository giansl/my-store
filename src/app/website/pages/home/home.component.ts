import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string  | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.OnLoadMoreProducts();
    this.route.queryParamMap.subscribe(parans => {
      this.productId = parans.get('product');
    })
  }

  OnLoadMoreProducts() {
    this.productsService.getAllProducts(this.limit, this.offset).subscribe(
      (products: Product[]) => {
        this.products = this.products.concat(products);
        this.offset += this.limit;
      }
    );
  }

}
