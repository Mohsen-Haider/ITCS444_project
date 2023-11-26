import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, collectionData, CollectionReference, DocumentReference, Firestore } from '@angular/fire/firestore';
import { getDocs, doc, deleteDoc, updateDoc, docData, setDoc, addDoc, query, getFirestore } from '@angular/fire/firestore';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail
} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public db = getFirestore();
  public email: string = '';
  public password: string = '';

  constructor(public auth: Auth, public firestore: Firestore) { }

  async createAccount(email: string, password: string) {
    this
    return await createUserWithEmailAndPassword(this.auth, email, password)
  }

  async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signout() {
    signOut(this.auth)
      .then((userCredential) => {
        // Signed Out 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  async getProfile() {
    return await this.auth.currentUser?.uid;
  }

  async createUserDetails(email: string, id: string) {
    // return setDoc(doc(this.firestore, 'Users', id), {
    //   'email': email,
    // });
    return await setDoc(doc(this.firestore, 'Users', id), { 
      email: email,
      });

  }

}
