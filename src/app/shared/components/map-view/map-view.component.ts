import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Supercharger } from 'src/app/core/models/supercharger.model';
import * as L from 'leaflet';

// Fix for default marker icons in Leaflet with Webpack
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map-view',
  template: '<div #mapContainer class="map-container"></div>',
  styles: [`
    .map-container {
      width: 100%;
      height: 100%;
      min-height: 400px;
    }
  `]
})
export class MapViewComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @Input() superchargers: Supercharger[] | null = [];
  @Input() center: L.LatLngExpression = [39.8283, -98.5795]; // Center of US
  @Input() zoom = 4;

  private map: L.Map | undefined;
  private markers: L.LayerGroup = L.layerGroup();

  private customIcon = L.icon({
    iconUrl: 'assets/icons/location-icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['superchargers'] && this.map) {
      this.updateMarkers();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.zoom,
      zoomControl: false // Custom controls if needed
    });

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.markers.addTo(this.map);
    this.updateMarkers();

    // Invalidate size after init to handle container resize
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }

  private updateMarkers(): void {
    if (!this.map) return;

    this.markers.clearLayers();

    if (this.superchargers) {
      this.superchargers.forEach(charger => {
        const marker = L.marker([charger.location.lat, charger.location.lng], { icon: this.customIcon })
          .bindPopup(`
            <div style="font-family: 'Segoe UI', sans-serif; min-width: 200px;">
              <h3 style="margin: 0 0 8px; color: #e82127;">${charger.name}</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.9em;">
                <div><strong>Stalls:</strong> ${charger.available}/${charger.stalls}</div>
                <div><strong>Power:</strong> ${charger.power}kW</div>
              </div>
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #ccc;">
                <strong>Amenities:</strong><br>
                ${charger.amenities.map(a => `<span style="background: #eee; padding: 2px 6px; border-radius: 4px; margin-right: 4px; display: inline-block; margin-top: 4px;">${a}</span>`).join('')}
              </div>
            </div>
          `);

        // Custom icon logic based on availability/status can go here

        this.markers.addLayer(marker);
      });
    }
  }
}
