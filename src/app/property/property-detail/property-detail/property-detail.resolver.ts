import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { HousingService } from 'src/app/Services/housing.service';
import { Property } from 'src/app/model/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolver implements Resolve<Property> {

  constructor(private router: Router, private housingService: HousingService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property> {
     const propId = route.params['id'];
     return this.housingService.getProperty(propId).pipe(
      catchError(error => {
          this.router.navigate(['/']);
          return of (null)
      })
      
      );
     
  }
}
