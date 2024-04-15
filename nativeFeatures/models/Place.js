export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    // this.address = address;
    this.location = location; // {lat: 0.1231, lng: 127.121}
    this.id = id; //new Date().toString() + Math.random().toString();
  }
}
