import { ObjectId } from "mongodb";

interface Service {
  _id?: ObjectId;
  serviceName: String;
  serviceRoute: String;
  serviceImagePath: String;
  serviceDescription: String;
  serviceBody: String;
}

export default Service;
