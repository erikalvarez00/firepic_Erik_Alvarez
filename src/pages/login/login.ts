import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../shared/models/user";
import { HomePage } from '../home/home';

import { LoginUserProvider } from '../../providers/login-user/login-user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: User = { email: "", password: "" };

  constructor(private luService: LoginUserProvider,
    public afAuth: AngularFireAuth,
    public navCtrl: NavController) {
  }

  login(user: User){
    this.luService.login(user).then(() => {
      if(this.luService.sesionIniciada){
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  register(user: User){
    this.luService.register(user).then(() => {
      if(this.luService.sesionIniciada){
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  /*

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
 
  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }
    } catch (e) {
      console.error(e);
    }
  }
  */
}
