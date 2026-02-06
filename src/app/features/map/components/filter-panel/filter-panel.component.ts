import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-filter-panel',
    templateUrl: './filter-panel.component.html',
    styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent {
    @Output() filterChange = new EventEmitter<any>();

    filters = {
        minPower: 0,
        amenities: {
            coffee: false,
            restroom: false,
            wifi: false,
            shopping: false,
            dining: false
        },
        onlyAvailable: false
    };

    onFilterChange() {
        this.filterChange.emit(this.filters);
    }
}
