import { Injectable, Inject } from "@angular/core";

import { Http, Headers, Response} from "@angular/http";

import { Trip } from "../models/trip";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { AuthResponse } from "../models/authresponse";
import { BROWSER_STORAGE } from "../storage";

@Injectable()
export class TripDataService {
  constructor(
    private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = "http://localhost:3000/api/";
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => response.json() as AuthResponse)
      .catch(this.handleError);
  }

  public addTrip(formData: Trip): Promise<Trip[]> {
    console.log("Inside TripDataService#addTrip");
    const token = localStorage.getItem('travlr-token');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    })

    return (
      this.http
        .post(this.tripUrl, formData, {headers:headers})
        .toPromise()
        //.then(response => response.json() as Trip[])
        .catch(this.handleError)
    );
  }

  public getTrips(): Promise<Trip[]> {
    console.log("Inside TripDataService#getTrips");
    return this.http
      .get(this.tripUrl)
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  public getTrip(tripCode: string): Promise<Trip> {
    console.log("Inside TripDataService#getTrip(tripCode)");
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then((response) => response.json() as Trip)
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log("Inside TripDataService#updateTrip");
    const token = localStorage.getItem('travlr-token');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    })
    return this.http
      .put(this.tripUrl + formData.code, formData, {headers:headers})
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  public deleteTrip(tripCode: string): Promise<Trip> {
    console.log("Inside TripDataService#deleteTrip");
    const token = localStorage.getItem('travlr-token');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    })
    return this.http
      .delete(this.tripUrl + tripCode,{headers:headers})
      .toPromise()
      .then((response) => response.json() as Trip[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
