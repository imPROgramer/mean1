import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
import { Patient } from '../../models/patient';
// import * as alertify from 'alertify.js';


@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {

  patient;
  names;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse;
  ScheduledAppointmentResponse;
  appointmentFormControls;
  constructor(fb: FormBuilder,private route: Router, private datePipe: DatePipe, 
    private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    // add necessary validators
    this.appointmentForm = fb.group({
      'selectDisease' : [null, Validators.required],
      'tentativeDate' : [null, Validators.required],
      'priority' : [null, Validators.required]
    })

   }

  ngOnInit() {
    this.appointmentFormControls = this.appointmentForm.controls;
    // get selected patient id
      const userId = localStorage.getItem('userId');//this.dataService.getUserId();
    // get Particular Patient from service using patient id and assign response to patient property
      this.dataService.getParticularPatient(userId).subscribe(
        user => {
          this.patient =user;
        }
      );
  }

  bookAppointment() {
    // get diseases list from service
    this.dataService.getDiseasesList().subscribe(diseases => {
      this.names = diseases;
    });

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
      this.isBookAppointment=true;
      this.isFormEnabled=true;
      this.isScheduledAppointment=false;
      this.isTableEnabled=false;
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, patientFirstName, patientLastName, disease, priority, tentativedate, registeredTime
    this.appointmentDetails.patientId = this.patient.id;
    this.appointmentDetails.patientFirstName = this.patient.firstName;
    this.appointmentDetails.disease = "";
    this.appointmentDetails.priority = "";
    this.appointmentDetails.tentativedate = null;
    this.appointmentDetails.registeredTime = null;
    this.isBookAppointment =false;
    this.dataService.bookAppointment(this.appointmentDetails).subscribe(
      res => {
        // if booked successfully should redirect to 'requested_appointments' page
        this.route.navigateByUrl('requested_appointments');
      }
    )

    
    
  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.isBookAppointment = false;
    this.isFormEnabled=false;
    this.isScheduledAppointment = true;
    this.isTableEnabled=true;
    // get particular patient appointments using getAppointments method of DataService 
    this.dataService.getAppointments(this.patient.id).subscribe(
      appointments => {
        this.appointmentDetails = appointments;
      }
    )

  }

  cancelAppointment(id) {

    // delete selected appointment uing service
      this.dataService.deleteAppointment(id).subscribe(res=>{
        console.log('appoitment deleted');
      }).add(tearDown =>{
        this.dataService.getAppointments(this.patient.id).subscribe(
          appointements =>{
            this.bookedAppointmentResponse = appointements;
          }
        )}
      );
    // After deleting the appointment, get particular patient appointments
      // this.dataService.getAppointments(this.patient.id).subscribe(
      //   appointements =>{
      //     this.bookedAppointmentResponse = appointements;
      //   }
      // )
  }
  
}

