import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent {
  @Output() planTrip = new EventEmitter<any>();

  tripForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tripForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      vehicleModel: ['Model 3', Validators.required]
    });
  }

  onSubmit() {
    if (this.tripForm.valid) {
      this.planTrip.emit(this.tripForm.value);
    }
  }
}
