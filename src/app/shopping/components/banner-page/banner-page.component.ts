import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { HomeService } from 'src/app/admin/services/home.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-banner-page',
  templateUrl: './banner-page.component.html',
  styleUrls: ['./banner-page.component.css']
})
export class BannerPageComponent implements OnInit {

  products$ = [];
  imgUrl;
  categories$ = [];
  catProd: Array<Array<any>> = [];

  constructor(private productService: ProductService, private homeService: HomeService, private router: Router, private catService: CategoryService) { }

  ngOnInit(): void {
    this.productService.getEverything().subscribe(data => {
      let obj = data.reverse();
      console.log({ b: data[0].payload.val() })
      this.products$ = Object.keys(obj).map((key) => {

        // Using obj[key] to retrieve key value 
        let rd = obj[key]
        return rd;
      });
      this.catService.getMainCategories().subscribe(data => {
        this.categories$ = data;
        this.catProd = []
        for (const c of data) {
          console.log(c.key)
          this.catProd.push(this.products$.filter(data2 => data2.payload.val().mainCategory === c.key))
          // this.catProd.push();
        }
        console.log(this.catProd[0][0])
      });
      // this.products$.filter()
    });
    this.homeService.getEverything().subscribe(data => {
      this.imgUrl = (data.payload.val() as any).imageUrl;
      // this.imgUrl = Object.keys(obj).map((key) => {

      //   // Using obj[key] to retrieve key value 
      //   let rd = obj[key]
      //   return rd;
      // });
    });

   
  }
  nav(key) {
    this.router.navigate([`/shared/products/${key}`])
  }

}
