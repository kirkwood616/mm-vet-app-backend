import { ObjectId } from "mongodb";

interface Service {
  _id?: ObjectId;
  serviceId: Number;
  serviceName: String;
  serviceRoute: String;
  serviceImagePath: String;
  serviceDescription: String;
  serviceBody: String;
}

export default Service;
