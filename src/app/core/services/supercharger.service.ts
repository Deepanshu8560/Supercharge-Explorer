import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Supercharger } from '../models/supercharger.model';

@Injectable({
    providedIn: 'root'
})
export class SuperchargerService {

    private mockSuperchargers: Supercharger[] = [];

    constructor() {
        this.generateMockData();
    }

    private generateMockData() {
        const majorCities = [
            { name: 'New York, NY', lat: 40.7128, lng: -74.0060 },
            { name: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437 },
            { name: 'Chicago, IL', lat: 41.8781, lng: -87.6298 },
            { name: 'Houston, TX', lat: 29.7604, lng: -95.3698 },
            { name: 'Phoenix, AZ', lat: 33.4484, lng: -112.0740 },
            { name: 'Philadelphia, PA', lat: 39.9526, lng: -75.1652 },
            { name: 'San Antonio, TX', lat: 29.4241, lng: -98.4936 },
            { name: 'San Diego, CA', lat: 32.7157, lng: -117.1611 },
            { name: 'Dallas, TX', lat: 32.7767, lng: -96.7970 },
            { name: 'San Jose, CA', lat: 37.3382, lng: -121.8863 },
            { name: 'Austin, TX', lat: 30.2672, lng: -97.7431 },
            { name: 'Jacksonville, FL', lat: 30.3322, lng: -81.6557 },
            { name: 'Fort Worth, TX', lat: 32.7555, lng: -97.3308 },
            { name: 'Columbus, OH', lat: 39.9612, lng: -82.9988 },
            { name: 'Charlotte, NC', lat: 35.2271, lng: -80.8431 },
            { name: 'San Francisco, CA', lat: 37.7749, lng: -122.4194 },
            { name: 'Indianapolis, IN', lat: 39.7684, lng: -86.1581 },
            { name: 'Seattle, WA', lat: 47.6062, lng: -122.3321 },
            { name: 'Denver, CO', lat: 39.7392, lng: -104.9903 },
            { name: 'Washington, DC', lat: 38.9072, lng: -77.0369 },
            { name: 'Boston, MA', lat: 42.3601, lng: -71.0589 },
            { name: 'El Paso, TX', lat: 31.7619, lng: -106.4850 },
            { name: 'Nashville, TN', lat: 36.1627, lng: -86.7816 },
            { name: 'Detroit, MI', lat: 42.3314, lng: -83.0458 },
            { name: 'Oklahoma City, OK', lat: 35.4676, lng: -97.5164 },
            { name: 'Portland, OR', lat: 45.5152, lng: -122.6784 },
            { name: 'Las Vegas, NV', lat: 36.1699, lng: -115.1398 },
            { name: 'Memphis, TN', lat: 35.1495, lng: -90.0490 },
            { name: 'Louisville, KY', lat: 38.2527, lng: -85.7585 },
            { name: 'Baltimore, MD', lat: 39.2904, lng: -76.6122 },
            { name: 'Milwaukee, WI', lat: 43.0389, lng: -87.9065 },
            { name: 'Albuquerque, NM', lat: 35.0844, lng: -106.6504 },
            { name: 'Tucson, AZ', lat: 32.2226, lng: -110.9747 },
            { name: 'Fresno, CA', lat: 36.7378, lng: -119.7871 },
            { name: 'Mesa, AZ', lat: 33.4151, lng: -111.8314 },
            { name: 'Sacramento, CA', lat: 38.5816, lng: -121.4944 },
            { name: 'Atlanta, GA', lat: 33.7490, lng: -84.3880 },
            { name: 'Kansas City, MO', lat: 39.0997, lng: -94.5786 },
            { name: 'Colorado Springs, CO', lat: 38.8339, lng: -104.8214 },
            { name: 'Miami, FL', lat: 25.7617, lng: -80.1918 },
            { name: 'Raleigh, NC', lat: 35.7796, lng: -78.6382 },
            { name: 'Omaha, NE', lat: 41.2565, lng: -95.9345 },
            { name: 'Long Beach, CA', lat: 33.7701, lng: -118.1937 },
            { name: 'Virginia Beach, VA', lat: 36.8529, lng: -75.9780 },
            { name: 'Oakland, CA', lat: 37.8044, lng: -122.2711 },
            { name: 'Minneapolis, MN', lat: 44.9778, lng: -93.2650 },
            { name: 'Tulsa, OK', lat: 36.1540, lng: -95.9928 },
            { name: 'Tampa, FL', lat: 27.9506, lng: -82.4572 },
            { name: 'Arlington, TX', lat: 32.7357, lng: -97.1081 },
            { name: 'New Orleans, LA', lat: 29.9511, lng: -90.0715 }
        ];

        const allAmenities = ['coffee', 'restroom', 'wifi', 'shopping', 'dining', 'lounge', 'lodging'];
        const statuses: ('online' | 'busy' | 'offline')[] = ['online', 'online', 'online', 'busy', 'offline'];

        let idCounter = 1;

        majorCities.forEach(city => {
            // Generate 2-4 chargers around each major city
            const numChargers = Math.floor(Math.random() * 3) + 2;

            for (let i = 0; i < numChargers; i++) {
                // Add random offset to lat/lng (approx 5-15km radius)
                const latOffset = (Math.random() - 0.5) * 0.15;
                const lngOffset = (Math.random() - 0.5) * 0.15;

                // Random amenities (pick 2-5)
                const numAmenities = Math.floor(Math.random() * 4) + 2;
                const shuffledAmenities = [...allAmenities].sort(() => 0.5 - Math.random());
                const selectedAmenities = shuffledAmenities.slice(0, numAmenities);

                this.mockSuperchargers.push({
                    id: (idCounter++).toString(),
                    name: `${city.name} - Supercharger ${idCounter}`,
                    location: {
                        lat: city.lat + latOffset,
                        lng: city.lng + lngOffset
                    },
                    stalls: Math.floor(Math.random() * 20) + 8, // 8-28 stalls
                    available: Math.floor(Math.random() * 8),
                    power: Math.random() > 0.5 ? 250 : 150,
                    amenities: selectedAmenities,
                    busyHours: [],
                    status: statuses[Math.floor(Math.random() * statuses.length)]
                });
            }
        });
    }

    getSuperchargers(): Observable<Supercharger[]> {
        return of(this.mockSuperchargers).pipe(delay(500)); // Simulate network latency
    }

    getSuperchargerById(id: string): Observable<Supercharger | undefined> {
        const charger = this.mockSuperchargers.find(s => s.id === id);
        return of(charger).pipe(delay(300));
    }
}
