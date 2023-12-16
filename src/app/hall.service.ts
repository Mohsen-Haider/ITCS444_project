import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
// AngularFire 
//collections, document references are also imported
import {collectionData, CollectionReference, DocumentReference } from '@angular/fire/firestore';
//all functions imported
import { getDocs, doc, deleteDoc, updateDoc, docData, setDoc, addDoc, query } from '@angular/fire/firestore'; 
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Hall{
  id?:string;
  name?:string;
  capacity?:string;
  numberOfBoothFitting?:string;
  avaliability?:boolean;
  contactTeam?:string;
}
@Injectable({
  providedIn: 'root'
})
export class HallService {
  //object 
  hall:Hall={};

  //observable array
  public halls$:Observable<Hall[]>|undefined;

  //Collection reference
  hallCollection: CollectionReference<DocumentData>;

  constructor(public firestore:Firestore) {

     //Get the actual refrence to the memberCollection 
     this.hallCollection = collection(this.firestore,'Halls');
     this.getHalls();// get courses as observable
   }

   //get every document we created
  //this is an observable so every time things change in the database update it
  async getHalls()
  {
    const q = query(collection(this.firestore,'Halls'));
    this.halls$ = collectionData(q, {   idField: 'id',  }) as Observable<Hall[]>; //using the query we observe the data
  }
  getHallById(id:any):Observable<Hall>{ // getting data for only one element
    const noteDocRef = doc(this.firestore,`Halls/${id}`);// The name 'halls' is the same name in the firebase coll.
    return docData(noteDocRef,{idField:'id'}) as Observable<Hall>; // idField is a keyword and id is a variable get save the id value
  }

  // Create Data in Firestore with Add()
  addHall(hall:Hall): Promise<DocumentReference>{
    return addDoc( collection(this.firestore, 'Halls'), hall);
   }
  
  // Create Course in Firestore with updateDoc()
  updateHall(hall:Hall): Promise<void>{
    const hallCollection = collection(this.firestore,'Halls')
    const courseRef = doc(hallCollection,hall.id);
    
    //update doc returns a void , it just updates the document that is inside the collection
    return updateDoc(courseRef, { 
      id:hall.id,
      name:hall.name,
      capacity:hall.capacity,
      numberOfBoothFitting:hall.numberOfBoothFitting,
      avaliability:hall.avaliability,
      contactTeam:hall.contactTeam,
         });
      
    } //updateCourse - end
  
  // Delete Document Data in Firestore with deleteDoc()
  deleteHall(hall:Hall): Promise<void> {
    const courseRef = doc(collection(this.firestore,'Halls'), hall.id);
     return deleteDoc(courseRef);
    }




}// end of the hall service
