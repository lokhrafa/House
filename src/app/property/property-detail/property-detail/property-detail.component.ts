import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { HousingService } from 'src/app/Services/housing.service';
import { Property } from 'src/app/model/property';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public propertyId: number;
  public mainPhotoUrl: string = null;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
     private router: Router, private housingService: HousingService) { }

  ngOnInit(): void {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
        console.log(this.property.photos);
      }
    );

    this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn);

    this.galleryOptions = [{
      width: '100%',
      height: '465px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: true
    }];

    this.galleryImages = this.getPropertyPhotos();
  }

  changePrimaryPhoto(mainPhotoUrl: string){
    this.mainPhotoUrl = mainPhotoUrl;

  }
   
  getPropertyPhotos(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];
    for(const photo of this.property.photos){
      if(photo.isPrimary){
        this.mainPhotoUrl = photo.imageUrl;
      } else {
        photoUrls.push(
          {
            small: photo.imageUrl,
            medium: photo.imageUrl,
            big: photo.imageUrl
          }
        )
      }
    }
    return photoUrls;
  }

}
