import { Product } from './../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import { FormArray, FormGroup, Validators, FormBuilder, Form, AbstractControl } from '@angular/forms';
// tslint:disable: curly
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$ = [];
  brand$ = [];
  product: Product = new Product();
  properties: FormArray = this.fb.array([]);
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder) {
    // categoryService.getAll().query.on('value', (data) => { this.categories$ = data.val(); });
    categoryService.getA().then(data => {
      var i = 0;
      data.forEach(data => {
        this.categories$[i] = data.val()
        i++;
      })
    })
    console.log(this.categories$)

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).query.once('value', a => {
        this.product = a.val()
        if (this.product.property) {
          for (const row of this.product.property) {
            this.properties.push(this.reCreateProperty(row))

          }
        }
      })
      // .subscribe((p: Product) => {
      //   console.log(p)
      //   this.product = p;
      //   if (p.property) {
      //     for (let i = 0; i < p.property.length; i++) {
      //       this.properties.push(this.reCreateProperty(p.property[i]));
      //     }
      //   }
      // });
    };

  }

  save() {
    this.product.property = this.properties.value;
    console.log(this.product)
    if (this.id) this.productService.update(this.id, this.product);
    else this.productService.create(this.product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  addProperty() {
    this.properties.push(this.createProperty())
    console.log(this.properties)
  }

  createProperty(): FormGroup {
    return this.fb.group({
      propertyId: ['', Validators.required],
      propertyName: ['', Validators.required]
    })
  }

  reCreateProperty(elem): FormGroup {
    return this.fb.group({
      propertyId: [`${elem.propertyId}`, Validators.required],
      propertyName: [`${elem.propertyName}`, Validators.required]
    });
  }

  removePropertyClick(index) {
    this.properties.removeAt(index)
  }

  ngOnInit() {
  }

  fillBrand(category) {
    console.log(this.categories$)
    for (let i = 0; i < this.categories$.length; i++) {
      if (this.categories$[i].name === category) {
        let obj = this.categories$[i].brands;
        console.log(obj)
        if (obj === undefined) {
          obj = { noBrand: { name: 'No Brands', $key: 'noBrand' } }
        }
        this.brand$ = Object.keys(obj).map((key) => {

          // Using obj[key] to retrieve key value
          const rd = obj[key];
          rd.$key = key;
          return rd;
        });
      }
    }
    console.log(this.brand$);
  }

}
