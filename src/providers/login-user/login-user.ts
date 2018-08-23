//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../shared/models/user';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';

/*
  Generated class for the LoginUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class LoginUserProvider {
  esAdmin: boolean;
  sesionIniciada: boolean;

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello LoginUserProvider Provider');
  }

  login(user: User){
    this.sesionIniciada = false;
    this.esAdmin = false;

    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(result => {
      if(result){
        this.sesionIniciada = true;
        if(user.email === "erikalvarez00@gmail.com"){
          this.esAdmin = true;
        }
      }
    });
  }

  register(user: User){
    this.sesionIniciada = false;
    this.esAdmin = false;
    
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(result => {
      if(result){
        this.sesionIniciada = true;
      }
    });
  }
}
