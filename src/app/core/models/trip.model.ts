import { GeoPoint } from './supercharger.model';

export interface ChargingStop {
    stationId: string;
    stationName: string;
    arrivalCharge: number;
    targetCharge: number;
    durationMinutes: number;
    location: GeoPoint;
}

export interface Trip {
    origin: GeoPoint;
    destination: GeoPoint;
    vehicleModel: string;
    currentCharge: number;
    stops: ChargingStop[];
    totalDistance: number; // km
    totalDuration: number; // minutes
    routePoints: GeoPoint[]; // For drawing polyline
}
