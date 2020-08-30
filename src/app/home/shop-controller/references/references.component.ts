import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit {
  name = null;
  state = true;
  date = null;
  listingCost = null;
  costs = {
    cost1: null,
    cost2: null,
    cost3: null,
    cost4: null,
    cost5: null,
    cost6: null
  }

  selectedId = null;

  referances = [];

  constructor(private http: HttpClient) {
    this.http.get(`${environment.apiUrl}/referances`).subscribe((refs: any) => {
      this.referances = refs.referances;
    });
  }

  ngOnInit() {
  }
  changeState(x){
    console.log(x);
    this.state = x;
  }
  
  save() {
    const referance = {
       name: this.name,
       state: this.state,
       date: this.date,
       listingCost: this.listingCost,
       costs: this.costs
    }

    this.http.post(`${environment.apiUrl}/referance/create`, referance).subscribe((ref: any) => {
      this.referances.push(ref.referance);
      this.name = null;
      this.state = true;
      this.date = null;
      this.listingCost = null;
      this.costs = {
        cost1: null,
        cost2: null,
        cost3: null,
        cost4: null,
        cost5: null,
        cost6: null
      }
      this.selectedId = null;
    });
  }

  update() {
    const referance = {
      _id: this.selectedId,
      name: this.name,
      state: this.state,
      date: this.date,
      listingCost: this.listingCost,
      costs: this.costs
   }

   this.http.post(`${environment.apiUrl}/referance/update`, referance).subscribe((ref: any) => {
    this.referances.find((o, i) => {
      if (o._id === ref.referance._id) {
        console.log(ref.referance)
        this.referances[i] = ref.referance;
          return true; // stop searching
      }
    });
    // console.log(this.referances)
    // this.referances.find(r => {
    //   if (r._id == ref.referance._id) {
    //     r = ref.referance;
    //     return true;
    //    } else {
    //      return true;
    //    }
    // })
    // console.log(this.referances)
     this.name = null;
     this.state = true;
     this.date = null;
     this.listingCost = null;
     this.costs = {
       cost1: null,
       cost2: null,
       cost3: null,
       cost4: null,
       cost5: null,
       cost6: null
     }
     this.selectedId = null;
    });
  }

  delete(_id) {
    this.http.post(`${environment.apiUrl}/referance/delete`, {_id}).subscribe(x => {
      this.referances = this.referances.filter(r => {return r._id !== _id});
      this.name = null;
      this.state = true;
      this.date = null;
      this.listingCost = null;
      this.costs = {
        cost1: null,
        cost2: null,
        cost3: null,
        cost4: null,
        cost5: null,
        cost6: null
      }
      this.selectedId = null;
    });
  }

  selectRef(ref) {
    this.selectedId = ref._id;
    this.name = ref.name;
    this.state = ref.state;
    this.date = ref.date;
    this.listingCost = ref.listingCost;
    this.costs = ref.costs;
  }

}