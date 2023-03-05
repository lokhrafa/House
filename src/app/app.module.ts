import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AddPropertyComponent } from './property/add-property/add-property/add-property.component';
import { PhotoEditorComponent } from './property/photo-editor/photo-editor/photo-editor.component';
import { PropertyCardComponent } from './property/property-card/property-card/property-card.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail/property-detail.component';
import { PropertyListComponent } from './property/property-list/property-list/property-list.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { UserRegisterComponent } from './user/user-register/user-register/user-register.component';
import { UserLoginComponent } from './user/user-register/user-login/user-login/user-login.component'


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FilterPipe,
    SortPipe,
    AddPropertyComponent,
    PhotoEditorComponent,
    PropertyCardComponent,
    PropertyDetailComponent,
    PropertyListComponent,
    UserRegisterComponent,
    UserLoginComponent,
    
  ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    TabsModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    BsDatepickerModule,
    FileUploadModule,
    NgxGalleryModule
 

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
