import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-category',
  template: `<app-products [products]="products" (loadMore)="OnLoadMoreProducts()"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  categoryId: string | null = null;

  constructor(
    private route : ActivatedRoute,
    private productsService: ProductsService
    ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsService.getAllByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];
      })
    )
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }

  OnLoadMoreProducts() {
    if(this.categoryId){
      this.productsService.getAllByCategory(this.categoryId, this.limit, this.offset).subscribe(
        (products: Product[]) => {
          this.products = this.products.concat(products);
          this.offset += this.limit;
        }
      );
    }

  }

}
