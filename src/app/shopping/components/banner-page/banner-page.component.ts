import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { HomeService } from 'src/app/admin/services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-page',
  templateUrl: './banner-page.component.html',
  styleUrls: ['./banner-page.component.css']
})
export class BannerPageComponent implements OnInit {

  products$ = [];
  imgUrl;


  constructor(private productService: ProductService, private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getEverything().subscribe(data => {
      let obj = data.reverse()
      this.products$ = Object.keys(obj).map((key) => {

        // Using obj[key] to retrieve key value 
        let rd = obj[key]
        return rd;
      });
      console.log(this.products$)
    })
    this.homeService.getEverything().subscribe(data => {
      this.imgUrl = (data.payload.val() as any).imageUrl;
      console.log(this.imgUrl)
      // this.imgUrl = Object.keys(obj).map((key) => {

      //   // Using obj[key] to retrieve key value 
      //   let rd = obj[key]
      //   return rd;
      // });
    })
  }
  nav(key) {
    this.router.navigate([`/shared/products/${key}`])
  }

}
