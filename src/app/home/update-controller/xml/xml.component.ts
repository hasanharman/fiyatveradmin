import { StoreService } from './../../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.css']
})
export class XmlComponent implements OnInit {
  link: string;
  data;
  constructor(private router: Router, private route: ActivatedRoute, private storeService: StoreService) {
    this.route.params.subscribe(e => {
      this.link = e.link;
      this.storeService.xml(this.link).subscribe(e => {
        this.data = e;
      })
    });
  }

  ngOnInit() {
  }

}
