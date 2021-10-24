import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit {

  complexForm: FormGroup;
  patientDetails = new Patient;
  result;
  complexFormControl;
  today: string;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyFirstname = 'You must include a first name.';
  minlengthFirstname = 'Your first name must be at least 3 characters long.';
  maxlengthFirstname = 'Your first name cannot exceed 20 characters.';
  emptyLastname = 'You must include a last name.';
  minlengthLastname = 'Your last name must be at least 3 characters long.';
  maxlengthLastname = 'Your last name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  noEmail = 'You must include a valid email.';
  patternEmail = 'Pattern does not match.';

  ngOnInit() {
    // this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor( fb: FormBuilder,private datePipe: DatePipe,private route: Router, private dataService: DataService){
    this.complexForm = fb.group({
      'firstName' : ['',Validators.required,Validators.minLength(3),Validators.maxLength(20)],
      'lastName': ['',Validators.required,Validators.minLength(3),Validators.maxLength(20)],
      'gender' : ['',,Validators.required],
      'dob' : ['',Validators.required],
      'mobile' : ['',Validators.required,Validators.pattern(/^[1-9][0-9]{9}$/),Validators.maxLength(10)],
      'email' : ['',Validators.required,Validators.pattern('^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')],
      'description' : ''
    });
    this.complexFormControl = this.complexForm.controls;
  }

  submitForm(value: any){

    // assign new date object to reportedTime
    this.patientDetails.registeredTime = new Date();
    // should reister new patient using service
    this.dataService.registerPatient(this.patientDetails).subscribe({next: (response)=>{
      // if added successfully should redirect to 'patientList' page
      this.route.navigateByUrl('/patientList');
    }})
    
    
  }

}
