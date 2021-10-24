import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  isLoggedIn = false;
  isLogIn: BehaviorSubject<boolean>;
  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(username: string, password: string): Observable<boolean> {

    // store 'userId' from response as key name 'userId' to the localstorage
    this.api.checkLogin(username,password).subscribe(res=>{
      localStorage.setItem('userId',res.userId+'');
      this.isLogIn.next(true);
      return Observable.of(true);
    })
    // return true if user authenticated
    if(localStorage.getItem('userId') != null){
      this.isLogIn.next(true);
      return Observable.of(true);
    }
    // return false if user not authenticated 

    return Observable.of(false);
  }

  getAuthStatus(): Observable<boolean> {
    return this.isLogIn.asObservable();
    // return;
  }
  doLogOut() {
    // remove the key 'userId' if exists
    localStorage.removeItem('userId');
    this.isLogIn.next(false);

  }

  getUserDetails(userId: number): Observable<Users> {

    // should return user details retrieved from api service
    return this.api.getUserDetails(userId);

    
  }

  updateProfile(userDetails): Observable<boolean> {

    // should return the updated status according to the response from api service
    let u;
    this.api.updateDetails(userDetails).subscribe(
      res => {
        u=res;
      }
    );
    if(u)
    return Observable.of(true);

    return Observable.of(false);
  }

  registerPatient(patientDetails): Observable<any> {


    // should return response retrieved from ApiService

    // handle error 

    return this.api.registerPatient(patientDetails);

  }

  getAllPatientsList(): Observable<any> {


    // should return all patients list retrieved from ApiService

    // handle error 

    return this.api.getAllPatientsList();

  }

  getParticularPatient(id): Observable<any> {

    // should return particular patient details retrieved from ApiService

    // handle error 

    return this.api.getParticularPatient(id);
  }
  
  getDiseasesList(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.getDiseasesList();
  }

  bookAppointment(appointmentDetails): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.bookAppointment(appointmentDetails);
  }

  getAppointments(patientId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.getAppointments(patientId);
  }

  deleteAppointment(appointmentId): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.deleteAppointment(appointmentId);
  }

  requestedAppointments(): Observable<any> {

    // should return response retrieved from ApiService

    // handle error 

    return this.api.requestedAppointments();
  }

  getUserId(): number {

    // retrieve 'userId' from localstorage
    const userId =  parseInt(localStorage.getItem('userId')) || -1;
    if(!this.isLogIn.getValue() && userId){
      return -1;
    }
    return userId;
  }


}


