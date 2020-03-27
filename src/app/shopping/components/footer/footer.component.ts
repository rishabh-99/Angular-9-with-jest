import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/admin/services/home.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  imgUrl;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
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
  

}
