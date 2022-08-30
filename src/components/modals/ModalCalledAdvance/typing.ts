// ./src/components/modals/ModalCalledAdvance/typing.ts
export interface IFormDataInProgress {
  estimated_hours_for_initiation: string;
  field_type_provider: string;
  who_is_answering: string;
}

export interface IFormDataInAttendance {
  estimated_hours_for_service_start: string;
}

export interface IFormDataDone {
  technical_report: string;
}
