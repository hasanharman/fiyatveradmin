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
  url;
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
    this.uploader(0, id)
  }

  setBanner(e: {[key: string]: string} | undefined) {
    if (typeof e == 'object') {
      delete e["__v"]
    }
    this.banner = e;
    this.sliderService.uploader.clearQueue()
  }

  uploader(i, id?, url?) {
    let items = this.sliderService.uploader.queue;
    items[i].url = id ? `${environment.apiUrl}/banner/add?size=${this.selected[i]}&id=${id}` : `${environment.apiUrl}/banner/add?size=${this.selected[i]}`
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
        this.banners = this.sliderService.sliders
        this.banner = undefined;
        const link = url ? url : this.url;
        this.sliderService.updateSliderUrl(JSON.parse(response)["_id"], link).subscribe(e => {
          console.log(e);
        })
      }
  };
    // if (this.selected[i]) {
    //   this.sliderService.uploader.response.subscribe(x => {
    //     this.uploader(i);
    //   })
    // }
  };

  updateBannerUrl(id) {
    this.sliderService.updateBannerUrl(id, this.banner.url).subscribe(e => {
      console.log(e);
    })
  }


}
