import { BrandService } from './../../../../shared/services/brand.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  brands$;
  minVal;
  maxVal;
  @Input('category') category;
  @Input('brand') brand;
  @Input('brands') brands;
  @Output() priceChange = new EventEmitter();
  @Output() discountApplied = new EventEmitter();

  minValue: number = 0;
  maxValue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 10000,
    step: 1000,
    showTicks: true,
    translate: (value: number, label: LabelType): string => {

      switch (label) {
        case LabelType.Low:
          this.minVal = value;
          this.priceChanged();
          return '<b>Min:</b> &#8377;' + value;
        case LabelType.High:
          this.maxVal = value;
          this.priceChanged();
          return '<b>Max:</b> &#8377;' + value;
        default:
          this.priceChanged();
          return `&#8377;` + value;
      }
    }
  };
  priceChanged() {
    this.priceChange.emit({ min: this.minVal, max: this.maxVal });
  }

  discountOnClick() {
    let dis: HTMLInputElement = <HTMLInputElement>document.getElementById('hasDiscount');
    if (dis.checked) {
      this.discountApplied.emit({ min: this.minVal, max: this.maxVal, state: true });
    }
    else {
      this.discountApplied.emit({ min: this.minVal, max: this.maxVal, state: false });
    }

  }

  constructor(private categoryService: CategoryService, brandService: BrandService) {

    console.log(this.categories$)
    this.categoryService.getll().on('value', data => {
      let obj = data.toJSON();
      this.categories$ = Object.keys(obj).map((key) => {

        // Using obj[key] to retrieve key value 
        let rd = obj[key]
        rd.$key = key;
        return rd;
      });

      console.log(this.categories$)
    })


  }

  ngOnInit() {

  }

}
