import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hall, HallService } from '../hall.service';
import { Firestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
// Mohsen Work 
halls:any=[];
// Mohsen Work End
  LoginForm:FormGroup;
  newhall:Hall = {};
  constructor(public hallsrv:HallService,public formbuilder:FormBuilder,public firestore:Firestore,public alertCtrl:AlertController) {
    this.LoginForm! = formbuilder.group({
      name:['',Validators.compose([Validators.required])],
      capacity:['',Validators.compose([Validators.required])],
      numberOfBoothFiting:['',Validators.compose([Validators.required])],
      avaliability:['',Validators.compose([Validators.required])],
      contactTeam:['',Validators.compose([Validators.required])],
    });
        // Mohsen Work
        this.hallsrv.halls$?.subscribe(res=>{
          console.log(res);
          this.halls=res;
        });
        // Mohsen Work End
  }//constructor
  ngOnInit(){
         // we use this array to set the limit of the days in the calander 
    // Call the function to generate the highlighted dates
    this.sevenDays=this.getNextDays(7);
    // we need a method to get the blue and red dates from the firebase instead using this static lists
    this.generateHighlightedDates(this.blueList,this.redList); 
  }

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
// Mohsen Work 
  // declaring variables
  tdy=new Date();
  oneWeek=new Date(this.tdy.getFullYear(), this.tdy.getMonth(), this.tdy.getDate()+7);
  oneDayStr=this.formatDate2(this.tdy);
  oneWeekStr=this.formatDate2(this.oneWeek);
  startDate = new Date(this.tdy.getFullYear(), this.tdy.getMonth(), this.tdy.getDate() + 1);
  endDate =this.oneWeek;
  showfilter=false;
  result='';
  errorMsg='Enter a Valid Date';
  sortMethod='alHalls';
  options:any;
  sevenDays=[];
  highlightedDates: any[] = [];
  blueList = ['2023-12-20', '2023-12-26', '2023-12-28'];// for testing purpose
  redList = ['2023-12-23', '2023-12-27', '2023-12-29'];// for testing purpose
// Methods

  filterBox(){ // this method created to show and hide the filter 
    this.showfilter=!this.showfilter;
    this.result='Results From : '+this.formatDate(this.startDate)+' To '+this.formatDate(this.endDate);
    if(!this.showfilter){
      this.resetFiltervalues();
    }
  }
  // this method will reset the values of sortMethod, start and end days
  resetFiltervalues(){  
    this.sortMethod='alHalls';
    this.startDate = new Date(this.tdy.getFullYear(), this.tdy.getMonth(), this.tdy.getDate() + 1);
    this. endDate =this.oneWeek;
  }
  // this is alert method it will be used in some of the methods bellow after editing the error message.
  async dateStatus(){ 
    const alert = await this.alertCtrl.create({
      header: 'Information',
      message: this.errorMsg,
      buttons: ['Ok'],
    });
    await alert.present();
    }
    // this method created to update the start date then call the check method
  onStartDateChange(event: CustomEvent) {
    this.startDate = new Date(event.detail.value);
    this.checkD()
  }
  // this method created to update the end date then call the check method
  onEndDateChange(event: CustomEvent) {
    this.endDate = new Date(event.detail.value);
    this.checkD()
  }
  // this method will chack the range of the dates if there's something wrong the dates
  //  will be reset to the default values and an error message will appear
  checkD(){
    if(this.endDate<=this.startDate||this.startDate<=this.tdy){
      this.startDate = new Date(this.tdy.getFullYear(), this.tdy.getMonth(), this.tdy.getDate() + 1);
      this.endDate = new Date(this.tdy.getFullYear(), this.tdy.getMonth(), this.tdy.getDate() + 2);
      this.result='Results From : '+this.formatDate(this.startDate)+' To '+this.formatDate(this.endDate);
      this.errorMsg='Enter a Valid Date';
      this.dateStatus();
    }
    else{
      this.result='Results From : '+this.formatDate(this.startDate)+' To '+this.formatDate(this.endDate);
      this.errorMsg='The date Updated Successfully';
      this.dateStatus();
    }
  }
  // This method will change the date format to 'mm/dd/yyyy' to let the user see the date in readable way
  //  an dit will be used by some of the methods here
  formatDate(date: Date): string {
    this.options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString(undefined, this.options);
  }
    // This method will return a string date in this format '2023-12-31T23:59:59'
    //  and we will use this format to assign the minmum and max day in the calander
  formatDate2(date: Date): string {
    const formattedDate = date.toISOString().slice(0, 19);
    return formattedDate; // Output: 2023-12-31T23:59:59
  }
// This method will take date as input and retuen the day as string 
// example : Input: 2023-12-31T23:59:59  || Output: 31
  takeDayFromDate(date: Date): string {
    const day = date.toISOString().slice(8,10);
    return day; // Input: 2023-12-31T23:59:59  || Output: 31
  }
  // This method will take a number and retuen the days after that day as array of strings
// example : suppose today's date is 2022-04-17 and the Input: num=3  then the Output: arr[18,19,20]
  getNextDays(num:number){
    let arr:any=[];
    for (let i=2; i<num+2; i++){
      const newday=new Date(this.tdy.getFullYear(), this.tdy.getMonth(), this.tdy.getDate()+i);
      arr.push(this.takeDayFromDate(newday));
    }
    return arr;
  }
//this method will take two arrays containing dates one for the blue and red dates in the calander and it 
// will push the vlues of the arrays in the highlightedDates array which we use in datetime in the html 
generateHighlightedDates(blueArray:any,redArray:any) {
  for(let i=0; i<blueArray.length; i++){
    this.highlightedDates.push({
      date: blueArray[i],
      textColor: 'var(--ion-color-secondary-contrast)',
      backgroundColor: 'var(--ion-color-secondary)',
    })
    for(let i=0; i<redArray.length; i++){
      this.highlightedDates.push({
        date: redArray[i],
        textColor: '#FFFFFF',
        backgroundColor: 'rgb(255, 0, 0)',
      })
    }
  }
}
  //End of Mohsen Work 

}
