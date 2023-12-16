import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HallService } from '../hall.service';

@Component({
  selector: 'app-hall-details',
  templateUrl: './hall-details.page.html',
  styleUrls: ['./hall-details.page.scss'],
})
export class HallDetailsPage implements OnInit {
id:any;
hall:any=null;
  constructor(public activatedR:ActivatedRoute,public hallsrv:HallService) {
    this.id=this.activatedR.snapshot.paramMap.get("hall");
    this.hallsrv.getHallById(this.id).subscribe(res=>{
      this.hall = res;
    });
   }

  ngOnInit() {

  }

}
