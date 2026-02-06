import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
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
        <div *ngIf="loading" class="loading-overlay">
          <div class="spinner"></div>
          <span>Locating Superchargers...</span>
        </div>
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
    .loading-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.7);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .spinner {
      border: 4px solid #333;
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
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

  loading = true; // Start loading

  constructor(private superchargerService: SuperchargerService) { }

  ngOnInit(): void {
    // Load initial data
    this.superchargerService.getSuperchargers()
      .pipe(finalize(() => this.loading = false)) // Stop loading when done
      .subscribe(data => {
        this.superchargersSubject$.next(data);
      });

    // ... (rest of combineLatest logic is fine, but we need to ensure finalize is imported)
    this.filteredSuperchargers$ = combineLatest([
      this.superchargersSubject$,
      this.filtersSubject$
    ]).pipe(
      map(([chargers, filters]) => {
        // ... (existing filter logic)
        return chargers.filter(charger => {
          if (charger.power < filters.minPower) return false;
          if (filters.onlyAvailable && charger.available === 0) return false;
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
