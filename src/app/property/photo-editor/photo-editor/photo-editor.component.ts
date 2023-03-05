import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { HousingService } from 'src/app/Services/housing.service';
import { Photo } from 'src/app/model/photo';
import { Property } from 'src/app/model/property';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() property: Property;
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();

  uploader: FileUploader
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.baseUrl;
  maxAllowedFileSize=1*1024*1024;

  response: string;


  constructor(private housingService: HousingService, private toastr: ToastrService) { }
  
  public fileOverBase(e: any): void{
    this.hasBaseDropZoneOver = e;
  }

  initializeFileUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl +'/property/add/photo/'+ String(this.property.id),
      authToken: 'Bearer' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType:['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: this.maxAllowedFileSize
    })

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
        if(response){
          const photo = JSON.parse(response);
          this.property.photos.push(photo);
        }
    }

    this.uploader.onErrorItem = (item, response, status, headers) => {
       let errorMessage = 'Some unknown error occured';
       if(status === 401){
        errorMessage = 'Your session has expired, login again'
       }
       if(response){
        errorMessage = response;
       }

       this.toastr.error(errorMessage);

    }
  }

  mainPhotoChanged(url: string){
    this.mainPhotoChangedEvent.emit(url);
  }

  ngOnInit(): void {
    this.initializeFileUploader();
  }

  setPrimaryPhoto(propertyId: number, photo: Photo){
    this.housingService.setPrimaryPhoto(propertyId,photo.publicId).subscribe(()=> {
      this.mainPhotoChanged(photo.imageUrl);
      this.property.photos.forEach(p => {
         if(p.isPrimary){p.isPrimary = false;}
         if(p.publicId === photo.publicId) {p.isPrimary = true;}
      });
    });
    
  }

  deletePhoto(propertyId: number, photo: Photo){
    this.housingService.deletePhoto(propertyId,photo.publicId).subscribe(() => {
      this.property.photos = this.property.photos.filter(p => 
         p.publicId !== photo.publicId
        );
    });
  }

}
