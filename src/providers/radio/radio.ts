
import { Injectable } from '@angular/core';


@Injectable()
export class RadioProvider {
  url:string;
  stream:any;
  promise:any;


  constructor() {
        this.url = "https://s38.hstbr.net:8080/live";
    this.stream = new Audio(this.url);
  }






  play() {
    this.stream.play();
    this.promise = new Promise((resolve,reject) => {
      this.stream.addEventListener('playing', () => {
        resolve(true);
      });

      this.stream.addEventListener('error', () => {
        reject(false);
      });
    });

  return this.promise;
  };

  pause() {
  this.stream.pause();
  };










}
