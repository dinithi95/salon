import {Appointment} from "../appointment/Appointment";

export interface Invoice {
  id: string;
  code: string;
  date: string;
  price: string;
  status: string;
  appointment: Appointment;
}
