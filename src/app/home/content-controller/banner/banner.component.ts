import { SliderService } from './../../../services/slider.service';	
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';	
import { environment } from 'src/environments/environment';	


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  banners: Observable<any>;	
  banner: {[key: string]: string} | undefined;
  sizes: Array<string> = []; 	
  url = null;
  api = environment.apiUrl;	
  selected = {	
    0: 1110,	
    1: 930,	
    2: 690,	
    3: 510,	
    4: 300	
  }	
  constructor(public sliderService: SliderService) {	
    this.banners = this.sliderService.banner;	
    this.sliderService.uploader.clearQueue();	
  }	

  ngOnInit() {	
  }	
  async uploadAll() {	
    this.uploader(0);	
  }	


  async updateAll(id) {
    let items = this.sliderService.uploader.queue;
    if (items.length > 0) {
      this.uploader(0, id)
    } else {
      this.sliderService.updateSliderUrl(id, this.url).subscribe(x => {
        this.sliderService.uploader.clearQueue()
        this.banners = this.sliderService.banner
        this.banner = undefined;
        this.url = null;
      })
    }
  }	

  setBanner(e: {[key: string]: string} | undefined) {	
    if (typeof e == 'object') {	
      delete e["__v"];
      this.url = e["url"];
      delete e["url"];
    }	
    this.banner = e;
    this.sliderService.uploader.clearQueue()	
  }

  uploader(i, id?) {
    let items = this.sliderService.uploader.queue;
    items[i].url = id ? `${environment.apiUrl}/banner/add?size=${this.selected[i]}&id=${id}&url=${this.url}` : `${environment.apiUrl}/banner/add?size=${this.selected[i]}&url=${this.url}`
    items[i].upload()
    console.log(items[i].url)
    console.log(id)
    i = i+1;
    this.sliderService.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 200 && items[i]) {
        return this.uploader(i, JSON.parse(response)["_id"]);
      }
      if (!items[i]) {
        this.sliderService.uploader.clearQueue()
        this.banners = this.sliderService.banner
        this.banner = undefined;
        this.url = null;
      }
  };
    // if (this.selected[i]) {
    //   this.sliderService.uploader.response.subscribe(x => {
    //     this.uploader(i);
    //   })
    // }
  }	
  deleteBanner(_id, key) {
    this.sliderService.deleteBanner(_id, key).subscribe(x => {
      delete this.banner[key];
    });
  }

  deleteBanners(_id) {
    this.sliderService.deleteBanners(_id).subscribe(x => {
      this.banners.subscribe((a: any) => {
        this.banners = new Observable(o => {
          o.next(a.filter(r => {return r._id !== _id}));
        })
      })
    });
  }


}