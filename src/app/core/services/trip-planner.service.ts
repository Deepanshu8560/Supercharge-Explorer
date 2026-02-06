import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Trip, ChargingStop } from '../models/trip.model';
import { GeoPoint } from '../models/supercharger.model';

@Injectable({
    providedIn: 'root'
})
export class TripPlannerService {

    constructor() { }

    planTrip(origin: GeoPoint, destination: GeoPoint, vehicleModel: string): Observable<Trip> {
        // Mock routing logic
        const mockTrip: Trip = {
            origin,
            destination,
            vehicleModel,
            currentCharge: 90,
            totalDistance: 350,
            totalDuration: 210, // minutes
            stops: [
                {
                    stationId: '2',
                    stationName: 'Mountain View - Showers Dr',
                    arrivalCharge: 20,
                    targetCharge: 80,
                    durationMinutes: 25,
                    location: { lat: 37.401, lng: -122.114 }
                }
            ],
            routePoints: [
                origin,
                { lat: 37.401, lng: -122.114 }, // Stop
                destination
            ]
        };

        return of(mockTrip).pipe(delay(1500)); // Simulate complex calculation
    }
}
