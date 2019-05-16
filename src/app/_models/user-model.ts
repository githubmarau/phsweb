import { Company } from "@/_models/company-model";

export class User {
  public id: number;
  public active = false;
  public first_name: string;
  public last_name: string;
  public username: string;
  public email: string;
  public avatar_url: string;
  public role: string;
  public token?: string;
  public created_at: string;
  public updated_at: string;
  public connected = false;
  public current_store_id: number;
  public current_store_name: string;
  public companies: Company[];

  constructor(data: any = {}){
      this.id = data.id || '';
      this.active = data.active || false;
      this.first_name = data.first_name || '';
      this.last_name = data.last_name || '';
      this.username = data.username || '';
      this.email = data.email || '';
      this.avatar_url = data.avatar_url || '';
      this.role = data.role || '';
      this.token = data.token || '';
      this.created_at = data.created_at || '';
      this.updated_at = data.updated_at || '';
      this.connected = data.connected || false;
      this.current_store_id = data.current_store_id || '';
      this.current_store_name = data.current_store_name || '';
      this.companies = data.companies ? data.companies.map(res => new Company(res)) : null;
    }

  get FullName() {
    return this.first_name + ' ' + this.last_name;
  }

}
