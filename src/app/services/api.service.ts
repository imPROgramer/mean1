import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { map, tap } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ApiService {

  API_URL: String;
  AUTH_API_URL = '/auth/server/';
  baseUrl;
  constructor(private http: HttpClient) {
    this.API_URL = 'api';
    this.baseUrl = this.API_URL + this.AUTH_API_URL;
  }

  public checkLogin(username: string, password: string): Observable<Credentials> {
    
    let user;
    // should return response from server
    return this.http.post(this.baseUrl ,{username:username,password:password}).pipe(
      map((response:Credentials)=> response)      
    );
    // handle error 
    // (login:Credentials) => {
    //   user = login;
    // },
    // this.handleError

    
  }

  public getUserDetails(userId: number): Observable<Users> {
    
    const  reqURL = this.API_URL + '/users/' + userId;
    let user;
    // should return user details retireved from server
    return this.http.get(reqURL).pipe(
      map((u:Users)=>u),
      catchError((err)=>throwError(err))
    )
  }

  public updateDetails(userDetails: Users): Observable<Users> {
    
    let u;
    const requestUrl = this.API_URL + '/users/' + userDetails.userId;
    // should return user details if successfully updated the details
    return this.http.put(requestUrl ,userDetails).pipe(
      map((u:Users)=>u),
      catchError((err)=>throwError(err))
    )
  
  }

  public registerPatient(patientDetails: any): Observable<any> {

    // should return response from server if patientDetails added successfully

    // handle error 
    let u;
    const requestUrl = this.API_URL + '/allpatients';
    return this.http.post(requestUrl ,patientDetails).pipe(
      map(u=>u)
    );
  
  }

  public getAllPatientsList(): Observable<any> {

    // should return all patients from server

    // handle error 
    let u;
    const reqURL = this.API_URL + '/allpatients';
    return this.http.get(reqURL).pipe(
      map(u=>u)
    );
  }

  public getParticularPatient(id): Observable<any> {

    // should return particular patient details from server

    // handle error 
    let u;
    const reqURL = this.API_URL + '/allpatients/' + id;
    return this.http.get(reqURL).pipe(
      map(users => users)
    )
  }

  public getDiseasesList(): Observable<any> {

    // should return diseases from server

    // handle error 
    
    const reqURL = this.API_URL + '/diseases';
    return this.http.get(reqURL).pipe(
      map(users => users)
    );

  }

  public bookAppointment(appointmentDetails: any): Observable<any> {

    // should return response from server if appointment booked successfully

    // handle error 

    let u;
    const requestUrl = this.API_URL + '/reqappointments';
    return this.http.post(requestUrl, appointmentDetails).pipe(
      map(users => users)
    )

  }

  public requestedAppointments(): Observable<any> {

    // should return all requested appointments from server

    // handle error 
    let u;
    const requestUrl = this.API_URL + '/reqappointments';
    return this.http.get(requestUrl).pipe(
      map(users => users)
    );
  }

  public getAppointments(userId): Observable<any> {

    // should return appointments of particular patient from server

    // handle error 

    let u;
    const reqURL = this.API_URL + '/reqappointments?patientId=' + userId;
    return this.http.get(reqURL).pipe(
      map(users => users)
    );
  }

  public deleteAppointment(appointmentId): Observable<any> {

    // should delete the appointment

    // handle error

    let u;
    const reqURL = this.API_URL + '/reqappointments/' + appointmentId;
    return this.http.delete(reqURL).pipe(
      map(users => users)  
    )
    

    
  }

  private handleError(error: HttpErrorResponse) {
    // handle error
    return error;
  }
  
}
