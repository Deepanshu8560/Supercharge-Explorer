import { Component, Input } from '@angular/core';
import { Trip } from 'src/app/core/models/trip.model';

@Component({
  selector: 'app-route-summary',
  templateUrl: './route-summary.component.html',
  styleUrls: ['./route-summary.component.scss']
})
export class RouteSummaryComponent {
  @Input() trip: Trip | null = null;
}
