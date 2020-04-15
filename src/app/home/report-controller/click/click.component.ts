import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-click',
  templateUrl: './click.component.html',
  styleUrls: ['./click.component.css']
})
export class ClickComponent implements OnInit {
  clicks;

  constructor(private productService: ProductService) { }
  
  ngOnInit() {
    this.productService.clicks().subscribe(e => {
      this.clicks = e;
    })
  }

}
