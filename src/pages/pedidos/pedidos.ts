import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import swal from 'sweetalert';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  public NOME: string;
  public PEDIDO: string;
  public loader;
  public dados: any;
  public retorno: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
  }


  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Enviando..."
    });
    this.loader.present();
  }



FechaCarregando(){
  this.loader.dismiss();
}

EnviarPedido(name,ped){
  return this.http.get("http://bnctecnologia.com.br/appradio/agitosfm/receber.php?nome=" + name + '&pedido=' + ped);
}

enviar(){

  this.AbreCarregando();
  this.EnviarPedido(this.NOME,this.PEDIDO).subscribe(
    data=>{
      let retorno = (data as any)._body;
      this.dados = JSON.parse(retorno);

      this.retorno = this.dados.D.RETORNO;
      if(this.retorno == "1"){
        this.FechaCarregando();
        swal("Obrigado!", "Em breve vamos atender o seu pedido.", "success").then(() => {
          this.navCtrl.pop();
        });


      }else{
        this.FechaCarregando();
        swal("Opa...", "Algo de errado aconteceu, por favor verifique sua internet.", "error");
      }

    }, error =>{
       console.log(error);
    }
  )
 }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosPage');
  }

}
