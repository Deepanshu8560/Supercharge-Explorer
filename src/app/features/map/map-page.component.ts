import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supercharger } from 'src/app/core/models/supercharger.model';
import { SuperchargerService } from 'src/app/core/services/supercharger.service';

@Component({
  selector: 'app-map-page',
  template: `
    <div class="page-container">
      <div class="sidebar">
        <h2>Filters</h2>
        <app-filter-panel (filterChange)="onFilterChange($event)"></app-filter-panel>
      </div>
      <div class="map-wrapper">
        <app-map-view 
          [superchargers]="filteredSuperchargers$ | async">
        </app-map-view>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      display: flex;
      height: 100%;
    }
    .sidebar {
      width: 300px;
      background: var(--secondary-color);
      padding: 1rem;
      z-index: 10;
      box-shadow: 2px 0 5px rgba(0,0,0,0.5);
    }
    .map-wrapper {
      flex: 1;
      position: relative;
    }
  `]
})
export class MapPageComponent implements OnInit {
  // Source data
  private superchargersSubject$ = new BehaviorSubject<Supercharger[]>([]);
  // Filter state
  private filtersSubject$ = new BehaviorSubject<any>({
    minPower: 0,
    amenities: { coffee: false, restroom: false, wifi: false, shopping: false, dining: false },
    onlyAvailable: false
  });

  filteredSuperchargers$!: Observable<Supercharger[]>;

  constructor(private superchargerService: SuperchargerService) { }

  ngOnInit(): void {
    // Load initial data
    this.superchargerService.getSuperchargers().subscribe(data => {
      this.superchargersSubject$.next(data);
    });

    // Combine data and filters
    this.filteredSuperchargers$ = combineLatest([
      this.superchargersSubject$,
      this.filtersSubject$
    ]).pipe(
      map(([chargers, filters]) => {
        return chargers.filter(charger => {
          // Filter by Power
          if (charger.power < filters.minPower) return false;

          // Filter by Availability
          if (filters.onlyAvailable && charger.available === 0) return false;

          // Filter by Amenities
          // Check if EVERY selected amenity exists in the charger's amenities list
          const selectedAmenities = Object.keys(filters.amenities).filter(k => filters.amenities[k]);
          const hasAllAmenities = selectedAmenities.every(a => charger.amenities.includes(a));
          if (!hasAllAmenities) return false;

          return true;
        });
      })
    );
  }

  onFilterChange(filters: any): void {
    this.filtersSubject$.next(filters);
  }
}
