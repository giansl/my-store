import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu: boolean = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.login('giansolis@gmail.com', '123456')
      .subscribe(
        (rta: Auth) => {
        this.getProfile();
    });
  }

  getProfile(){
    this.authService.profile()
      .subscribe(
        (user:User) => {
        this.profile = user;
    });
  }

  getAllCategories(){
    this.categoriesService.getAll()
      .subscribe(
        (categories: Category[]) => {
          this.categories = categories;
    });
  }

}
