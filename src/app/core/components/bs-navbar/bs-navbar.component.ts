import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  value;
  mainCategories = [];
  imgUrl;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService, private categoryService: CategoryService,
    private route: ActivatedRoute, private router: Router) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser: AppUser) => { this.appUser = appUser; });
    this.cart$ = await this.shoppingCartService.getCart();
    this.categoryService.getMainCategories().subscribe(data => {
      let obj = data;
      this.mainCategories = Object.keys(obj).map((key) => {

        // Using obj[key] to retrieve key value 
        let rd = obj[key]
        rd.$key = key;
        return rd;
      });

      for (const i of this.mainCategories) {
        let obj = i.payload.val().categories;
        i.categories = Object.keys(obj).map((key) => {

          // Using obj[key] to retrieve key value 
          let rd = obj[key]
          rd.$key = key;
          return rd;
        });
      }
    })
  }

  logout() {
    this.auth.logout();
  }
  navigate(main, category) {
    this.route.queryParamMap.subscribe(param => {
      if (param) {
        const brand = param.get('brand') || 'all';
        this.router.navigate(['/product-list/'], { queryParams: { main, category, brand: 'all' } })
      }
    })
  }

  doSomething(event) {
    if(event.target.value != ''){
    this.router.navigate(['/product-list/'], { queryParams: { q:event.target.value } })
    }
  }
}
