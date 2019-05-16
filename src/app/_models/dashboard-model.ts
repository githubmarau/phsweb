import { Deserializable } from "./deserializable";

export class Dashboard implements Deserializable{

  public data_inicial: string;
  public data_final: string;
  public atendimentos: number;
  public total: number;
  public descontos: number;
  public quant_itens: number;
  public formas_pgto: any[];
  public rank_vendedores: any[];
  public rank_produtos: any[];
  public rank_grupos: any[];
  public atend_hora: any[];
  public ultimas_vendas: any[];

  deserialize(input: any): this {
    input = JSON.stringify(input).toLowerCase();
    input = JSON.parse(input);
    Object.assign(this, input);

    //this.formas_pgto = input.stores.map(store => new Store().deserialize(store));
    return this;
  }

  constructor(data: any = {}){
    data = JSON.stringify(data).toLowerCase();
    data = JSON.parse(data);
    this.data_inicial = data.data_inicial || '';
    this.data_final = data.data_final || '';
    this.atendimentos = data.atendimentos || '';
    this.total = data.total || '';
    this.descontos = data.descontos || '';
    this.quant_itens = data.quant_itens || '';
    this.formas_pgto = data.formas_pgto || [];
    this.rank_vendedores = data.rank_vendedores || [];
    this.rank_produtos = data.rank_produtos || [];
    this.rank_grupos = data.rank_grupos || [];
    this.atend_hora = data.atend_hora || [];
    this.ultimas_vendas = data.ultimas_vendas || [];
  }

}
