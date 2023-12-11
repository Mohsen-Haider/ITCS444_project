import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hall, HallService } from '../hall.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  LoginForm:FormGroup;
  newhall:Hall = {};
  constructor(public hallsrv:HallService,public formbuilder:FormBuilder,public firestore:Firestore) {
    this.LoginForm! = formbuilder.group({
      name:['',Validators.compose([Validators.required])],
      capacity:['',Validators.compose([Validators.required])],
      numberOfBoothFiting:['',Validators.compose([Validators.required])],
      avaliability:['',Validators.compose([Validators.required])],
      contactTeam:['',Validators.compose([Validators.required])],
    })
  }//constructor


  Login(LoginForm:FormGroup){
    if(this.LoginForm.valid){
      //do nothing
    }
    else{
      console.log("something wrong with the inputs");
    }
  }

  add(){
    this.newhall.name = this.LoginForm.controls['name'].value;
    this.newhall.capacity = this.LoginForm.controls['capacity'].value;
    this.newhall.numberOfBoothFiting= this.LoginForm.controls['numberOfBoothFiting'].value;
    this.newhall.avaliability= this.LoginForm.controls['avaliability'].value;
    this.newhall.contactTeam = this.LoginForm.controls['contactTeam'].value;
    this.hallsrv.addHall(this.newhall).then((res)=>{
      console.log("added successfully");
      // Reset the form after adding
      this.LoginForm.reset();
    })
    .catch((err)=>{
      console.log("operation not successfull");
      
    });

  }


}
