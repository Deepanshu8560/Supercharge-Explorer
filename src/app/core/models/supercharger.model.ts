export interface GeoPoint {
    lat: number;
    lng: number;
}

export interface TimeRange {
    start: string; // HH:mm
    end: string;
}

export interface Supercharger {
    id: string;
    name: string;
    location: GeoPoint;
    stalls: number;
    available: number;
    power: number; // kW
    amenities: string[];
    busyHours: TimeRange[];
    status: 'online' | 'offline' | 'busy';
}
