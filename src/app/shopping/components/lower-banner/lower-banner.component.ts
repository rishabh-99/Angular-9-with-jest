import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lower-banner',
  templateUrl: './lower-banner.component.html',
  styleUrls: ['./lower-banner.component.css']
})
export class LowerBannerComponent implements OnInit {

  @Input() imgUrl;
  constructor() { }

  ngOnInit(): void {
  }

}
