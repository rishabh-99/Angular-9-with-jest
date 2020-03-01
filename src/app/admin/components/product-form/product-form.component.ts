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
  categories$;
  product: Product = new Product();
  properties: FormArray = this.fb.array([]);
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe((p: Product) => {
        this.product = p;
        if (p.property) {
          for (let i = 0; i < p.property.length; i++) {
            this.properties.push(this.reCreateProperty(p.property[i]));
          }
        }
      });
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

}
