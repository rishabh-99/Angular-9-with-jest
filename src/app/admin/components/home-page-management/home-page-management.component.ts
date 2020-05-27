import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { HomeService } from '../../services/home.service';
import { AngularFireStorage } from '@angular/fire/storage/';
import { finalize } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Tags } from '../product-form/product-form.component';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-home-page-management',
  templateUrl: './home-page-management.component.html',
  styleUrls: ['./home-page-management.component.css']
})
export class HomePageManagementComponent implements OnInit {

  constructor(private categoryService: CategoryService, private homeService: HomeService, private storage: AngularFireStorage) { }

  categories$ = [];
  newMainCat;
  newMainCatDesc;
  toBeRemovedMainCat;
  chosenMainCat;
  newCat;
  chosenCat;
  newBrandName;
  img = [];
  catArray = [];
  brandArray = [];
  chosenBrand;
  newPin: number;
  remPin: number;
  pincodes = [];
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  oldPincodes = [];

  imageUrl = []
  selectedImage = []
  urls = [];

  @ViewChild('myPond') myPond: any;

  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    allowImageValidateSize: true,
    imageValidateSizeMaxWidth: 1280,
    imageValidateSizeMaxHeight: 300,
    imageValidateSizeLabelImageSizeTooBig: 'Image is too big',
    imageValidateSizeLabelExpectedMaxSize: 'Maximum size is {1280px} × {300px}',

    server: {
      process: (fieldName, file: File, metadata, load, error, progress, abort, transfer, options) => {
        if (this.urls.length <= 2) {
          let tempUrl;
          // tslint:disable-next-line: max-line-length
          const imagePath = `home/${new Date().getTime()}_${file.name}`;
          const ref = this.storage.ref(imagePath);
          const task = ref.put(file);

          task.percentageChanges().subscribe(percentage => {
            progress(1, percentage, 100);
          });

          task.then((snap) => {
            load('Success');
            ref.getDownloadURL().subscribe(url => {
              this.urls.push(url)
              this.homeService.save(this.urls)

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

  ngOnInit(): void {
    this.categoryService.getMainCategories().subscribe(data => {
      let obj = data;
      this.categories$ = Object.keys(obj).map((key) => {

        // Using obj[key] to retrieve key value
        const rd = obj[key].payload.val();
        rd.$key = obj[key].payload.key;
        return rd;
      });
      console.log(this.categories$)
    });

    this.categoryService.fetchAll().subscribe(data => {
      this.oldPincodes = [];
      for (const d of data) {
        this.oldPincodes.push({ name: `${d.key}` });
      }
      console.log(this.oldPincodes);
      this.oldPincodes.sort()
    });

    this.homeService.getUrls().subscribe(data => {
      this.urls = [];
      for (const d of data) {
        this.urls.push(d.payload.val());
      }
      console.log(this.urls)
    })

  }

  removeImg(url) {
    const index = this.urls.findIndex(u => {
      if (u === url) {
        return true;
      } else {
        return false;
      }
    });

    this.urls.splice(index,1);
    this.homeService.save(this.urls);

    this.storage.storage.refFromURL(url).delete();
  }

  loadPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageUrl[0] = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage[0] = event.target.files[0];
    }
    else {
      this.selectedImage[0] = null;
    }
  }

  loadPreview1(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageUrl[1] = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage[1] = event.target.files[0];
    }
    else {
      this.selectedImage[1] = null;
    }
  }

  loadPreview2(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageUrl[2] = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage[2] = event.target.files[0];
    }
    else {
      this.selectedImage[2] = null;
    }
  }

  save() {
    alert('Saving Please Wait!');

    let imagePath = `home/${new Date()}_${this.selectedImage[0].name}`;
    let imgRef = this.storage.ref(imagePath);
    this.storage.upload(imagePath, this.selectedImage[0]).snapshotChanges().pipe(
      finalize(() => {
        imgRef.getDownloadURL().subscribe((url: string) => {
          this.imageUrl[0] = url.valueOf();

          if (this.selectedImage[1]) {
            let imagePath = `home/${new Date()}_${this.selectedImage[1].name}`;
            let imgRef = this.storage.ref(imagePath);
            this.storage.upload(imagePath, this.selectedImage[1]).snapshotChanges().pipe(
              finalize(() => {
                imgRef.getDownloadURL().subscribe((url: string) => {
                  this.imageUrl[1] = url.valueOf();
                  if (this.selectedImage[2]) {
                    let imagePath = `home/${new Date()}_${this.selectedImage[2].name}`;
                    let imgRef = this.storage.ref(imagePath);
                    this.storage.upload(imagePath, this.selectedImage[2]).snapshotChanges().pipe(
                      finalize(() => {
                        imgRef.getDownloadURL().subscribe((url: string) => {
                          this.imageUrl[2] = url.valueOf();
                          this.homeService.save(this.imageUrl)

                        });
                      })
                    ).subscribe();
                  } else {
                    this.homeService.save(this.imageUrl);
                  }
                });
              })
            ).subscribe();
          } else {
            this.homeService.save(this.imageUrl)

          }
        });
      })
    ).subscribe();
  }

  fillCatArray() {
    const obj = this.categories$[this.categories$.findIndex(cat => cat.name === this.chosenMainCat)].categories;
    this.catArray = Object.keys(obj).map((key) => {

      // Using obj[key] to retrieve key value
      const rd = obj[key]
      return rd;
    });
    console.log(this.catArray);
  }

  fillBrandArray() {
    const obj = this.catArray[this.catArray.findIndex(cat => cat.name === this.chosenCat)].brands;
    this.brandArray = Object.keys(obj).map((key) => {

      // Using obj[key] to retrieve key value
      const rd = obj[key]
      return rd;
    });
    console.log(this.brandArray)
  }

  addMainCategory() {
    this.categoryService.addMain(this.newMainCat, this.newMainCatDesc);
    alert('Main Category Added');
  }

  removeMainCategory() {
    this.categoryService.removeMain(this.toBeRemovedMainCat);
    alert('Main Category Removed');
  }

  addnewCategory() {
    this.categoryService.addCat(this.chosenMainCat, this.newCat);
    alert('Category Added');
  }
  removeCategory() {
    this.categoryService.removeCat(this.chosenMainCat, this.chosenCat);
    alert('Category Removed');
  }

  addBrand() {
    this.categoryService.addBrand(this.chosenMainCat, this.chosenCat, this.newBrandName);
    alert('Brand Added');
  }

  removeBrand() {
    this.categoryService.removeBrand(this.chosenMainCat, this.chosenCat, this.chosenBrand);
    alert('Brand Removed');
  }

  addPin() {
    for (const pin of this.pincodes) {
      this.categoryService.addPincode(pin.name);
    }
    alert('Pincodes Added!');
    this.pincodes = [];
    // console.log(this.pincodes)
  }

  removePin() {
    this.categoryService.remPin(this.remPin);
    this.remPin = null;
    alert(`Pincode ${this.remPin} removed`);
  }

  remove(tag: Tags): void {
    const index = this.pincodes.indexOf(tag);

    if (index >= 0) {
      this.pincodes.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;



    if ((value || '').trim()) {
      if (!this.pincodes) {
        this.pincodes = [];
      }
      if (value.match(/^[0-9]+$/) === null) {
        alert('Invalid Pincode: Cannot Contain Alphabets');
      } else if (value.length !== 6) {
        alert('Invalid Pincode: Should contain 6 digits');
      } else if (this.pincodes.findIndex(data => data.name === value.trim()) !== -1) {
        alert('Pincode is already added!');
      } else {
        console.log(this.pincodes.findIndex(data => data.name === value.trim()))
        this.pincodes.push({ name: value.trim() });
      }
    }

    if (input) {
      input.value = '';
    }

  }

  add2(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;



    if ((value || '').trim()) {
      if (!this.oldPincodes) {
        this.oldPincodes = [];
      }
      if (value.match(/^[0-9]+$/) === null) {
        alert('Invalid Pincode: Cannot Contain Alphabets');
      } else if (value.length !== 6) {
        alert('Invalid Pincode: Should contain 6 digits');
      } else if (this.oldPincodes.findIndex(data => data.name === value.trim()) !== -1) {
        alert('Pincode is already added!');
      } else {
        console.log(this.oldPincodes.findIndex(data => data.name === value.trim()))
        this.oldPincodes.push({ name: value.trim() });
      }
    }

    if (input) {
      input.value = '';
    }

  }

  remove2(tag: Tags): void {
    const index = this.oldPincodes.indexOf(tag);

    if (index >= 0) {
      this.oldPincodes.splice(index, 1);
    }
  }

  modifyPin() {
    this.categoryService.modifyPin(this.oldPincodes);
    alert('Pincodes Modified!')
  }
  // removePin() {
  //   if (this.newPin.toString().length === 6) {
  //     this.categoryService.addPincode(this.remPin);
  //   } else { alert('Invalid Pincode')}
  // }

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event.file.file);
  }
}
