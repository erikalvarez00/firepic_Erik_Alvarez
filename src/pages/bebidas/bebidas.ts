import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators';
import { Bebida } from '../../commons/bebida';
import { ModalController } from 'ionic-angular';
import { VerDetallesPage } from '../ver-detalles/ver-detalles';

@Component({
  selector: 'page-bebidas',
  templateUrl: 'bebidas.html',
})
export class BebidasPage {

  private itemsCollection: AngularFirestoreCollection<Bebida>;

  bebidas: Observable<Bebida[]>;

  constructor(private readonly afs: AngularFirestore,
              private modalCtrl:ModalController) {
    this.itemsCollection = afs.collection<Bebida>('bebidas');
    this.bebidas = this.itemsCollection.snapshotChanges().pipe(
                  map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Bebida;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                  }))
                );   
  }

  verDetalles(bebida: Bebida){
    const modal = this.modalCtrl.create(VerDetallesPage, { bebida:bebida });
    modal.present();
  }
}
