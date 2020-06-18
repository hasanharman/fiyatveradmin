import { Observable } from 'rxjs';
import { SliderService } from './../../../services/slider.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliders: Observable<Array<object>>;
  sizes: Array<string> = [];
  slides: {[key: string]: string} | undefined;
  selected = {
    0: 1110,
    1: 930,
    2: 690,
    3: 510,
    4: 300
  }
  url;
  api = environment.apiUrl;
  constructor(public sliderService: SliderService) {
    this.sliders = this.sliderService.sliders
  }

  ngOnInit() {
  }

  async uploadAll() {
    this.uploader(0);
  }

  async updateAll(id) {
    this.uploader(0, id)
  }

  uploader(i, id?, url?) {
    let items = this.sliderService.uploader.queue;
    items[i].url = id ? `${environment.apiUrl}/slider/add?size=${this.selected[i]}&id=${id}` : `${environment.apiUrl}/slider/add?size=${this.selected[i]}`
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
        this.sliders = this.sliderService.sliders
        this.slides = undefined;
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

  updateSliderUrl(id) {
    this.sliderService.updateSliderUrl(id, this.slides.url).subscribe(e => {
      console.log(e);
    })
  }

  

  see() {
    console.log(this.sliderService.uploader.queue)
  }
  itemInfo(item, size) {
    console.log(size, item)
  }

  setSlider(e: {[key: string]: string} | undefined) {
    if (typeof e == 'object') {
      delete e["__v"]
    }
    this.slides = e;
    this.sliderService.uploader.clearQueue()
  }

}
