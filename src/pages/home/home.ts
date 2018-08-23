import { Component } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators';
import { Platillo} from '../../commons/platillo'
import { NavController } from 'ionic-angular';
import { BebidasPage } from '../bebidas/bebidas';
import { ModalController } from 'ionic-angular';
import { AgregarPage } from '../agregar/agregar';

import { LoginUserProvider } from '../../providers/login-user/login-user';
import { VerDetallesPage } from '../ver-detalles/ver-detalles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private itemsCollection: AngularFirestoreCollection<Platillo>;

  platillos: Observable<Platillo[]>;

  constructor(private luProvider: LoginUserProvider,
    private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    public modalCtrl: ModalController) {

    this.itemsCollection = afs.collection<Platillo>('platillos');
    this.platillos = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Platillo;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  verDetalles(platillo: Platillo){
    const modal = this.modalCtrl.create(VerDetallesPage, { platillo:platillo });
    modal.present();
  }

  iraBebidas() {
    this.navCtrl.push(BebidasPage);
  }

  irAgregar() {
    const modal = this.modalCtrl.create(AgregarPage);
    modal.present();
  }

}
