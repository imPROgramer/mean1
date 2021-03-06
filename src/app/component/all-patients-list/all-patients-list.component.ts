import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
import {ActivatedRoute, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-all-patients-list',
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.css']
})
export class AllPatientsListComponent implements OnInit {

  allPatients;
  patient;
  constructor(private route: Router, private dataService: DataService) { }

  ngOnInit() {

    // get all patients list from service
    this.allPatients = this.dataService.getAllPatientsList();

  }

  view(patientId) {
      this.route.navigateByUrl('/patientList/'+patientId);
    // should navigate to 'patientList' page with selected patientId
    
  }
}
