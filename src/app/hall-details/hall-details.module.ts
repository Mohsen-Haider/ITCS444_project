import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HallDetailsPageRoutingModule } from './hall-details-routing.module';

import { HallDetailsPage } from './hall-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HallDetailsPageRoutingModule
  ],
  declarations: [HallDetailsPage]
})
export class HallDetailsPageModule {}
