import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hall, HallService } from '../hall.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.page.html',
  styleUrls: ['./halls.page.scss'],
})
export class HallsPage implements OnInit {

  constructor(
    public hallsrv:HallService,
    public firestore:Firestore
  ) { 

  }

  ngOnInit() {
    console.log("Hall page");
  }

  update(hall:Hall){
    this.hallsrv.updateHall(hall)
    .then(()=>{
      console.log("updated successfully");
    })
    .catch(()=>{
      console.log("update unsuccessfull");
    });
  }

  del(hall:Hall){
    this.hallsrv.deleteHall(hall)
    .then(()=>{
      console.log("deleted successfully");
    })
    .catch(()=>{
      console.log("delete  unsuccessfull");
    });
  }

}
