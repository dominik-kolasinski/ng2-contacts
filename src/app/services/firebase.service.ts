import {Injectable} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import {Company} from '../Company';
import {Category} from '../Category';

@Injectable()
export class FirebaseService{
  companies: FirebaseListObservable<Company[]>;
  categories: FirebaseListObservable<Category[]>;

  constructor(private _af: AngularFire) {

  }

  getBusinesses(category:string = null){
    if(category != null){
      this.companies = this._af.database.list('/companies', {
        query: {
          orderByChild: 'category',
          equalTo: category
        }
      }) as
        FirebaseListObservable<Company[]>
      return this.companies;
    }else{
      this.companies = this._af.database.list('/companies') as
        FirebaseListObservable<Company[]>
      return this.companies;
    }
  }

  getCategories(){
    this.categories = this._af.database.list('/categories') as
      FirebaseListObservable<Category[]>
    return this.categories;
  }

  addBusiness(newBusiness){
    return this.companies.push(newBusiness);
  }
}
