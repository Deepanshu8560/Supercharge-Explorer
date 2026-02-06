import { Component } from '@angular/core';
import { TripPlannerService } from 'src/app/core/services/trip-planner.service';
import { Trip } from 'src/app/core/models/trip.model';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-trip-page',
    template: `
    <div class="trip-page">
      <div class="form-container">
        <app-trip-form (planTrip)="onPlanTrip($event)"></app-trip-form>
      </div>
      
      <div class="results-container">
        <div *ngIf="loading" class="loading">Calculating best route...</div>
        <app-route-summary [trip]="trip$ | async"></app-route-summary>
      </div>
    </div>
  `,
    styles: [`
    .trip-page {
      display: flex;
      padding: 2rem;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .form-container {
      flex: 0 0 350px;
    }
    .results-container {
      flex: 1;
    }
    .loading {
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 1rem;
    }
  `]
})
export class TripPageComponent {
    trip$!: Observable<Trip>;
    loading = false;

    constructor(private tripPlanner: TripPlannerService) { }

    onPlanTrip(formData: any) {
        this.loading = true;
        // Mock geocoding for now (service takes GeoPoint)
        // We'll pass dummy points based on text input just to trigger the flow
        const origin = { lat: 37.77, lng: -122.41 };
        const dest = { lat: 34.05, lng: -118.24 };

        this.trip$ = this.tripPlanner.planTrip(origin, dest, formData.vehicleModel)
            .pipe(finalize(() => this.loading = false));
    }
}
