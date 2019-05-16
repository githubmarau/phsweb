import { User } from './user-model';
import { Store } from './store-model';

export class Company {
  public id: number;
  public name: string;
  public user_id: number;
  public user: User;
  public stores: Store[];
  public created_at: string;
  public updated_at: string;

  constructor(data: any = {}){
    this.id = data.id || '';
    this.name = data.name || '';
    this.user_id = data.user_id || '';
    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
    this.user = data.user ? new User(data.user) : null;
    this.stores = data.stores ? data.stores.map(store => new Store(store)) : null;
  }
}
