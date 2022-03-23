import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total: number = 0;
  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter();
  today = new Date();
  date = new Date(2021, 1, 21);
  showProductDetail = false;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  product: Product = {
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

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();

  }

  toogleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe(
      (product: Product) => {
        console.log(product);
        this.product = product;
        this.toogleProductDetail();
        this.statusDetail = 'success';
      }, errorMessage => {
        window.alert(errorMessage);
        this.statusDetail = 'error';
      });
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
    .pipe(
      switchMap(product => {
        return this.productsService.update(product.id, {
          title: 'chamge'
        })
      })
    )
    .subscribe(
      (product: Product) => {

    });

    zip(
      this.productsService.getProduct(id),
      this.productsService.update(id, {title: 'chamge'})
    ).subscribe(response => {
      console.log(response[0]);
      console.log(response[1]);
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      price: 1550,
      images: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F624790873524098982%2F&psig=AOvVaw2X_Z_7Z_X_Z_X_QZ_X_X_&ust=1589788240580000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjq-u-_eoCFQAAAAAdAAAAABAE'],
      description: 'Nuevo producto',
      categoryId: 1
    }
    this.productsService.create(product).subscribe(
      (product: Product) => {
        console.log(product);
        this.products.unshift(product);
      }
    );
  }

  updateProduct() {
    const changes = {
      title: 'Nuevo Producto',
    }

    const id = this.product.id;
    this.productsService.update(id, changes).subscribe(
      (product: Product) => {
        const productId = this.products.findIndex(p => p.id === id);
        this.products[productId] = product;
        this.product = product;
       console.log(product);
    });

  }

  deleteProduct() {
    const id = this.product.id;
    this.productsService.delete(id).subscribe(
      (result: boolean) => {
        const productId = this.products.findIndex(p => p.id === id);
        this.products.splice(productId, 1);
        this.showProductDetail = false;
        this.product = {
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
      }
    );
  }

  loadMoreProducts() {
    this.loadMore.emit();
  }

}
function subscribe(arg0: (response: any) => void) {
  throw new Error('Function not implemented.');
}

