import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { HomeService } from '../../services/home.service';
import { AngularFireStorage } from '@angular/fire/storage/';
import { finalize } from 'rxjs/operators';

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

  imageUrl = []
  selectedImage = []
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
    })
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
    this.categoryService.addMain(this.newMainCat, this.newMainCatDesc)
  }

  removeMainCategory() {
    this.categoryService.removeMain(this.toBeRemovedMainCat);
  }

  addnewCategory() {
    this.categoryService.addCat(this.chosenMainCat, this.newCat);
  }
  removeCategory() {
    this.categoryService.removeCat(this.chosenMainCat, this.chosenCat);
  }

  addBrand() {
    this.categoryService.addBrand(this.chosenMainCat, this.chosenCat, this.newBrandName);
  }

  removeBrand() {
    this.categoryService.removeBrand(this.chosenMainCat, this.chosenCat, this.chosenBrand);
  }
}
