import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total: number = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 1, 21);
  showProductDetail = false;
  limit = 10;
  offset = 0;
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

  ngOnInit(): void {
    this.loadMoreProducts();
  }

  onAddToCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();

  }

  toogleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productsService.getProduct(id).subscribe(
      (product: Product) => {
        console.log(product);
        this.product = product;
        this.toogleProductDetail();
      });
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
    this.productsService.getAllProducts(this.limit, this.offset).subscribe(
      (products: Product[]) => {
        this.products = this.products.concat(products);
        this.offset += this.limit;
      }
    );
  }

}
