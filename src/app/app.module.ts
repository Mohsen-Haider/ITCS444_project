import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
