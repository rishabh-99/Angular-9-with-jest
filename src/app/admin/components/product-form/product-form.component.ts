import { Product } from './../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/take';
import { FormArray, FormGroup, Validators, FormBuilder, Form, AbstractControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface Tags {
  name: string;
}
// tslint:disable: curly
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$ = [];
  mainCategories = [];
  brand$ = [];
  product: Product = new Product();
  properties: FormArray = this.fb.array([]);
  id;
  img: any[] = []
  title = 'Product Form';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedImage: any[] = []
  imgAvail = false;
  currFileName;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('myPond') myPond: any;

  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Image size is {400px} × {400px}',
    acceptedFileTypes: 'image/jpeg, image/png',
    allowImageValidateSize: true,
    imageValidateSizeMaxWidth: 400,
    imageValidateSizeMaxHeight: 400,
    imageValidateSizeLabelImageSizeTooBig: 'Image is too big',
    imageValidateSizeLabelExpectedMaxSize: 'Maximum size is {400px} × {400px}',

    server: {
      process: (fieldName, file: File, metadata, load, error, progress, abort, transfer, options) => {
        if (this.product.imageUrl.length <= 2) {
          let tempUrl;
          // tslint:disable-next-line: max-line-length
          const imagePath = `${this.product.mainCategory}/${this.product.category}/${this.product.title}/${new Date().getTime()}_${file.name}`;
          this.currFileName = imagePath;
          const ref = this.storage.ref(imagePath);
          const task = ref.put(file);

          task.percentageChanges().subscribe(percentage => {
            progress(1, percentage, 100);
          });

          task.then((snap) => {
            load('Success');
            ref.getDownloadURL().subscribe(url => {
              if (this.product.imageUrl.length <= 2) {
                this.product.imageUrl.push(url);
                if (this.id) this.productService.update(this.id, this.product);
                else this.productService.create(this.product);
              } else {
                alert('There are already 4 images!');
              }
            });
          });

          task.catch((err) => {
            error('Error!');
          })

          return {
            abort: () => {
              // This function is entered if the user has tapped the cancel button
              // imgRef.
              task.cancel();
              alert('Image is removed');
              // Let FilePond know the request has been cancelled
              abort();
            }
          };
        } else {
          error('Cannot Upload any more files');
          alert('There are already 4 images!');
          return;
        }
      }
    }
  }

  pondFiles = [
    // 'index.png',
  ]


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private http: HttpClient
  ) {

    // categoryService.getA().subscribe(data => {
    //   console.log(data[0].payload.toJSON());
    //   this.categories$ = data;
    // });

    categoryService.getMainCategories().subscribe(data => {
      this.mainCategories = data;
    });


    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).subscribe(data => {
        this.product = data.payload.val() as Product;

        for (const url of this.product.imageUrl) {
          this.imgAvail = true;
        }
        this.fillCategory(this.product.mainCategory, true)
        this.fillBrand(this.product.category, true)
        if (this.product.property) {
          for (const row of this.product.property) {
            this.properties.push(this.reCreateProperty(row));
          }
        }
      });
    }

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (!this.product.tags)
        this.product.tags = [];
      this.product.tags.push({ name: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tags): void {
    const index = this.product.tags.indexOf(tag);

    if (index >= 0) {
      this.product.tags.splice(index, 1);
    }
  }
  aa() {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAA')
  }

  loadPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.product.imageUrl[0] = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage[0] = event.target.files[0];
    }
    else {
      this.selectedImage[0] = null;
    }
  }

  loadPreview2(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.product.imageUrl[1] = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage[1] = event.target.files[0];
    }
    else {
      this.selectedImage[1] = null;
    }
  }
  loadPreview3(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.product.imageUrl[2] = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage[2] = event.target.files[0];
    }
    else {
      this.selectedImage[2] = null;
    }
  }
  loadPreview4(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.product.imageUrl[3] = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage[3] = event.target.files[0];
    }
    else {
      this.selectedImage[3] = null;
    }
  }

  save() {

    this.product.property = this.properties.value;
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
  }

  createProperty(): FormGroup {
    return this.fb.group({
      propertyId: ['', Validators.required],
      propertyName: ['', Validators.required]
    })
  }

  reCreateProperty(elem): FormGroup {
    if (!elem.propertyId || !elem.propertyName)
      return null;
    return this.fb.group({
      propertyId: [`${elem.propertyId}`, Validators.required],
      propertyName: [`${elem.propertyName}`, Validators.required]
    });
  }

  removePropertyClick(index) {
    this.properties.removeAt(index);
  }

  ngOnInit() {
  }

  fillBrand(cat, con?) {
    if (cat === 'addNew') {
      this.addNew()
      this.product.category = '';
    } else {
      if (!con)
        this.product.brand = ''

      for (const category of this.categories$) {
        if (category.$key === cat) {
          let obj = category.brands;
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

  fillCategory(mainCat, con?) {
    if (mainCat === 'addNew') {
      this.addNew()
      this.product.mainCategory = '';
    } else {
      if (!con)
        this.product.category = ''
      for (const mc of this.mainCategories) {
        if (mc.payload.key === mainCat) {
          let obj = mc.payload.val().categories;
          console.log(obj)
          if (obj === undefined) {
            obj = { noCategory: { name: 'No Category', $key: 'noCategory' } }
          }
          this.categories$ = Object.keys(obj).map((key) => {

            // Using obj[key] to retrieve key value
            const rd = obj[key];
            rd.$key = key;
            return rd;
          });
          console.log(this.categories$)
        }
      }
    }
  }

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event.file.file);
  }

  removeImage(url) {
    const index = this.product.imageUrl.findIndex(u => {
      if (u === url) {
        return true;
      } else {
        return false;
      }
    });
    this.product.imageUrl.splice(index, 1);
    this.storage.storage.refFromURL(url).delete();
    if (this.id) this.productService.update(this.id, this.product);
    else this.productService.create(this.product);
  }

  addNew() {
    this.router.navigate([]).then(result => {  window.open( `/admin/home/`, '_blank'); });
  }

  checkNew(name) {
    if (name === 'addNew') {
      this.addNew()
      this.product.brand = '';
    }
  }
}
