import { ObjectId } from "mongodb";
import Pet from "./Pet";

export default interface User {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  address: Object[];
  phone: string;
  email: string;
  pets: Pet[];
}

export default interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}
