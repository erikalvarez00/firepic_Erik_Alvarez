import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

// Plugins de camara
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//plugins angularfire2

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';  
import { map } from 'rxjs/operators';
import { Platillo} from '../../commons/platillo';

@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {
  private itemsCollection: AngularFirestoreCollection<Platillo>;
  private imagePreview: string;

  platillos: Observable<Platillo[]>;
  
  nombre:any;
  tipo:any;
  img:any;

  constructor(public readonly afs: AngularFirestore,
     public viewCtrl: ViewController,
     public navParams: NavParams,
     public toastCtrl: ToastController,
     public camara: Camera) {
  }

  agregarPlatillo() {
    console.log("platillo agregado");

    this.itemsCollection = this.afs.collection<Platillo>('platillos');
    /* this.platillos = this.itemsCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => {
         const data = a.payload.doc.data() as Platillo;
         const id = a.payload.doc.id;
         return { id, ...data };
       }))
     ); */

    const id = this.afs.createId();
    if (this.nombre != null && this.tipo != null && this.img != null) {
      const plato: Platillo = { 'nombre': this.nombre, 'tipo': this.tipo, 'img': this.img }
      console.table(plato);
      this.afs.collection('platillos').doc(id).set(plato);
      this.presentToast();
      this.viewCtrl.dismiss();

    } else {
      this.presentToastError();
    }

  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Platillo creado exitosamente',
      duration: 1000
    });
    toast.present();
  }

  presentToastError() {
    const toast = this.toastCtrl.create({
      message: 'Faltan campos por llenar!',
      duration: 1000
    });
    toast.present();
  }

  close(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPage');
  }


  showCamera(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camara.DestinationType.FILE_URI,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }
    
    this.camara.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.imagePreview = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log("Error en cámara", JSON.stringify(err));
    });
  }

  showGalery(){
    const options: ImagePickerOptions = {
      quality: 50,
      outputType: 1,
      maximumImagesCount: 1
    }
  }
}
