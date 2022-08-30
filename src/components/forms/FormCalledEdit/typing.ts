// ./src/components/forms/FormCalledNew/typing.ts
import Called from '@models/Called';

export interface IProps {
  called: Called;
  refresh(): void;
}

export interface ISelect {
  label: string;
  value: string;
}
export interface IFormCalled {
  date_created: string;
  appointment_date: string;
  type: string;
  services_id: string;
  license_plate: string;
  vehicle_situation: string;
  source_address: string;
  destination_address: string;
  location_type: string;
  description: string;
  budget_amount: string;
  status: string;
  call_initiation_date: string;
  estimated_hours_for_initiation: string;
  service_start_date: string;
  estimated_hours_for_service_start: string;
  closing_date: string;
  field_type_provider: string;
  who_is_answering: string;
  field_type_motorist: string;
  who_is_performing_the_service: string;
  technical_report: string;
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
