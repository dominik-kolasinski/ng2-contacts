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
  private companies:Company[];
  private categories:Category[];
  appState: string;
  activeKey: string;

  activeCompany:string;
  activeCategory:string;
  activeYearsActive:string;
  activeDescription:string;
  activePhone:string;
  activeMail:string;
  activeStreetAddress:string;
  activeCity:string;
  activeZipcode:string;

  constructor(private _firebaseService:FirebaseService){

  }

  ngOnInit(){
    this._firebaseService.getCompanies().subscribe(companies => {
        this.companies = companies;
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
    this._firebaseService.getCompanies(category).subscribe(companies => {
      this.companies = companies;
    });
  }

  addCompany(
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

      var newCompany = {
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

      console.log(newCompany);

      this._firebaseService.addCompany(newCompany);
      // this.changeState('default');
  }

  showEdit(company){
    this.changeState('edit',company.$key);
    this.activeCompany = company.company;
    this.activeCategory = company.category;
    this.activeYearsActive = company.years_active;
    this.activeDescription = company.description;
    this.activePhone = company.phone;
    this.activeMail = company.email;
    this.activeStreetAddress = company.street_address;
    this.activeCity = company.city;
    this.activeZipcode = company.zipcode;
  }

  updateCompany(){
    var updatedCompany = {
      company: this.activeCompany,
      category: this.activeCategory,
      years_active: this.activeYearsActive,
      description: this.activeDescription,
      phone: this.activePhone,
      email: this.activeMail,
      street_address: this.activeStreetAddress,
      city: this.activeCity,
      zipcode: this.activeZipcode
    }

    this._firebaseService.updateCompany(this.activeKey, updatedCompany);
    this.changeState('default', this.activeKey);
  }

  deleteCompany(companyKey){
    this._firebaseService.deleteCompany(companyKey);
    this.changeState('default', this.activeKey);
  }
}
