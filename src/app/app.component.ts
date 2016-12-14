import { Component, OnInit } from '@angular/core';
import {FirebaseService} from './services/firebase.service';
import {Company} from './Company';
import {Category} from './Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FirebaseService]
})
export class AppComponent implements OnInit{
  private company:Company[];
  private categories:Category[];
  appState: string;
  activeKey: string;

  constructor(private _firebaseService:FirebaseService){

  }

  ngOnInit(){
    this._firebaseService.getBusinesses().subscribe(businesses => {
        this.company = businesses;
      });

    this._firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  changeState(state, key){
    console.log('Changing state to: ' + state);
    if(key){
      console.log('Changing key to: ' + key);
      this.activeKey = key;
    }
    this.appState = state;
  }

  filterCategory(category){
    this._firebaseService.getBusinesses(category).subscribe(businesses => {
      this.company = businesses;
    });
  }

  addBusiness(
    company:string,
    category:string,
    years_active:number,
    description:string,
    phone:string,
    email:string,
    street_address:string,
    city:string,
    zipcode:string){
      var created_at = new Date().toString();

      var newBusiness = {
        company: company,
        category: category,
        years_active: years_active,
        description: description,
        phone: phone,
        email: email,
        street_address: street_address,
        city: city,
        zipcode: zipcode,
        created_at: created_at
      }

      console.log(newBusiness);

      this._firebaseService.addBusiness(newBusiness);
      // this.changeState('default');
  }
}
