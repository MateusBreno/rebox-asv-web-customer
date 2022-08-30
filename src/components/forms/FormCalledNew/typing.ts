// ./src/components/forms/FormCalledNew/typing.ts
export interface ISelect {
  label: string;
  value: string;
}
export interface IFormCalled {
  license_plate: string;
  services_id: string;
  vehicle_situation: string;
  source_address: string;
  destination_address: string;
  location_type: string;
  appointment_date: string;
  description: string;
}
export interface IGoogleCoordinates {
  lat: number;
  lng: number;
}
export interface IGoogleMapsDirectionRoutesLegs {
  arrival_time: {
    text: string;
    time_zone: string;
    value: number;
  };
  departure_time: {
    text: string;
    time_zone: string;
    value: number;
  };
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  end_address: string;
  end_location: IGoogleCoordinates;
  start_address: string;
  start_location: IGoogleCoordinates;
  steps: any[];
}
export interface IGoogleMapsDirectionRoutes {
  bounds: {
    northeast: IGoogleCoordinates;
    southwest: IGoogleCoordinates;
  };
  copyrights: string;
  legs: IGoogleMapsDirectionRoutesLegs[];
  overview_polyline: any;
  summary: string;
  warnings: string[];
  waypoint_order: any[];
}
export interface IGoogleMapsDirection {
  geocoded_waypoints: any[];
  routes: IGoogleMapsDirectionRoutes[];
  status: string;
}
export interface IGeocoderAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
