import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Bebida } from '../../commons/bebida';
import { Platillo } from '../../commons/platillo';

/**
 * Generated class for the VerDetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-detalles',
  templateUrl: 'ver-detalles.html',
})
export class VerDetallesPage {
  bebida: Bebida;
  platillo: Platillo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    let tempPlatillo = navParams.get("platillo");
    let tempBebida = navParams.get("bebida");

    if(tempPlatillo){
      this.platillo = tempPlatillo;
    } else if(tempBebida){
      this.bebida = tempBebida;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerDetallesPage');
  }

  close(){
    this.navCtrl.pop();
  }
}
