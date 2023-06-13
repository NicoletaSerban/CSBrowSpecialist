import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getCurrentLocation(): Observable<LatLngLiteral>{
    return new Observable((observ) => {
      // we check if the browser supports the geolocation
      if (!navigator.geolocation) return;

      return navigator.geolocation.getCurrentPosition(
        (pos) => {
          observ.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        (error) => {
          observ.error(error)
        }
      )
    })
  }
}
