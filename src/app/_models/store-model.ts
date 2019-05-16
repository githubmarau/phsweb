import { User } from './user-model';
import { Deserializable } from "./deserializable";
import { Company } from "./company-model";

export class Store {
  public id: number;
  public store_number: number;
  public name: string;
  public company_id: number;
  public company: Company;
  public driver: string;
  public host: string;
  public port: string;
  public database: string;
  public username: string;
  public password: string;
  public charset: string;
  public created_at: string;
  public updated_at: string;

  constructor(data: any = {}){
    this.id = data.id || '';
    this.store_number = data.store_number || '';
    this.name = data.name || '';
    this.company_id = data.company_id || '';
    this.company = data.company ? new Company(data.company) : null;
    this.driver = data.driver || 'firebird';
    this.host = data.host || 'localhost';
    this.port = data.port || '3050';
    this.database = data.database || 'c:/phsistem/dados/phs.fdb';
    this.username = data.username || 'sysdba';
    this.password = data.password || 'masterkey';
    this.charset = data.charset || 'UTF8';
    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
  }
}
