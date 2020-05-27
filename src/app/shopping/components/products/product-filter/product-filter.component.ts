import { BrandService } from './../../../../shared/services/brand.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { concatAll } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  brands$;
  minVal;
  maxVal;
  catArray = [];
  brandArray = [];
  main;
  allCheckBox;
  allCategoryChecked;
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

  constructor(private categoryService: CategoryService, brandService: BrandService, private router: Router, private route: ActivatedRoute) {



    route.queryParamMap.subscribe(param => {
      if (param) {
        this.main = param.get('main') || 'Biometric';
        const main = param.get('main') || 'Biometric';
        const category = param.get('category') || 'all';
        this.catArray = category.split(',')

        this.categoryService.getl(main).subscribe(data => {
          let obj = data[0].payload.val()
          this.categories$ = Object.keys(obj).map((key) => {
            // Using obj[key] to retrieve key value 
            let rd = obj[key]
            rd.$key = key;

            if (this.catArray.indexOf(rd.name) > -1) {
              rd.checked = true;
            } else {
              rd.checked = false;
            }
            return rd;
          });
          if (this.brand === 'all') {
            this.allCheckBox = true;
          }
          if (this.catArray.indexOf('all') > -1) {
            this.allCategoryChecked = true;
          }
        })
      }
    })

  }

  ngOnInit() {
    if (this.brand === 'all') {
      this.allCheckBox = true;
    }
    if (this.catArray.indexOf('all') > -1) {
      this.allCategoryChecked = true;
    }

  }

  catOnClick(category, checked) {
    console.log(this.catArray.indexOf('all'))
    if (this.catArray.indexOf('all') > -1) {
      this.catArray.splice(this.catArray.indexOf('all', 0), 1);
    }
    this.allCategoryChecked = false;
    if (checked === false) {
      // this.catArray.splice(this.catArray.indexOf('all'),1)
      this.catArray.push(category)
    }
    if (checked === true) {
      let index = this.catArray.indexOf(category, 0);
      this.catArray.splice(index, 1)
    }
    this.route.queryParamMap.subscribe(param => {
      if (param) {
        const main = param.get('main') || 'Biometric';
        this.router.navigate(['/product-list/'], { queryParams: { main, category: this.catArray.toString(), brand: 'all' } })
      }
    });
  }

  allBrand() {
    this.route.queryParamMap.subscribe(param => {
      if (param) {
        const main = param.get('main') || 'Biometric';
        this.router.navigate(['/product-list'], { queryParams: { main, category: this.catArray.toString(), brand: 'all' } })
      }
    })

  }
  brandOnClick(brand, checked) {
    this.allCheckBox = false;
    console.log(checked)
    if (checked === false) {
      this.brandArray.push(brand)
    }
    else if (checked === true) {
      let index = this.catArray.indexOf(brand, 0);
      this.brandArray.splice(index, 1);
      if (this.brandArray.length === 0) {
        this.brandArray.push('all')
      }
    }

    this.route.queryParamMap.subscribe(param => {
      if (param) {
        const main = param.get('main') || 'Biometric';
        this.router.navigate(['/product-list'], { queryParams: { main, category: this.catArray.toString(), brand: this.brandArray.toString() } })
      }
    })
  }

}
