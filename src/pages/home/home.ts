import { Component } from '@angular/core';
import { Alert, LoadingController, NavController } from 'ionic-angular';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { Http } from '@angular/http';
import { normalizeURL } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  public loader;
  public feed: any;
  public apy: any;
  public tocando: any;
  public DADOS: any;
  public LIVE: any;
  public API: any;
  public LINK: any;
  public IMAGEM: any;



  constructor(
    public navCtrl: NavController,
    private streamingMedia: StreamingMedia,
    public http: Http,
    public loadingCtrl: LoadingController

  ) {

  }


  AbreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }



FechaCarregando(){
  this.loader.dismiss();
}



chamarApi(url){
  return this.http.get(url);
}

ConfigApi(){
  return this.http.get("http://bnctecnologia.com.br/appradio/agitosfm/api.php");
}



 tocandoAgora(url){

    this.chamarApi(url).subscribe(
      data=>{
        let retorno = (data as any)._body;
        this.feed = JSON.parse(retorno);
        //this.feed = this.feed.EMPRESA;
       // console.log(this.feed.playing.current);

        this.tocando = this.feed.playing.current;

        this.update(url);
      }, error =>{
         console.log(error);
      }
    )
   }




 apiConfig(){
    this.AbreCarregando();
    this.ConfigApi().subscribe(
      data=>{
        let retorno = (data as any)._body;
        this.DADOS = JSON.parse(retorno);
        this.DADOS = this.DADOS.DADOS;




        this.LIVE = this.DADOS.LIVE;
        this.API = this.DADOS.API;
        this.IMAGEM = this.DADOS.IMAGEM;

        document.getElementById("p1").innerHTML ='<audio autoplay id="demo" controls hidden> <source src="' + this.LIVE +'" type="audio/mpeg" /></audio>';
        this.tocandoAgora(this.API);


      this.FechaCarregando();
      }, error =>{
         console.log(error);
         this.FechaCarregando();
      }
    )


   }



 apiBanner(){

  this.ConfigApi().subscribe(
    data=>{
      let retorno = (data as any)._body;
      this.DADOS = JSON.parse(retorno);
      this.DADOS = this.DADOS.DADOS;

      this.IMAGEM = this.DADOS.IMAGEM;
      this.LINK = this.DADOS.LINK;


      document.getElementById("p2").innerHTML =`<a onclick="window.open('` + this.LINK + `', '_system', 'location=yes'); return false;"><img src="` + this.IMAGEM +`" width="100%" padding></a>`;
      this.updateBanner();
    }, error =>{
       console.log(error);

    }
  )


 }





 stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

update1(){
  this.navCtrl.setRoot(HomePage);
  //this.navCtrl.push(HomePage);
}


   update(url){
    setTimeout(() => {
      this.tocandoAgora(url);
     }, 500);
  }


  updateBanner(){
    setTimeout(() => {
      this.apiBanner();
     }, 20000);
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 19000);
  }
  ionViewDidLoad() {
    this.apiConfig();
    this.apiBanner();


  }
}
