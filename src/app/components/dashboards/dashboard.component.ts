import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { formatCurrency, formatNumber, formatDate, DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
// Charts
import { ChartOptions, ChartType, PositionType, ChartDataSets } from 'chart.js';
import { Label, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// /.Charts
import { DashboardsService } from '@/_services';
import { Dashboard } from '@/_models/dashboard-model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  submitted = false;
  chartGrupos: any;
  chartFormasPgto: any;
  chartAtendHora: any;
  infoBoxes: any[];
  totais: any[];
  top_produtos: any[];
  top_vendedores: any[];
  ultimas_vendas: any[];
  pgtos: any[];
  storeName: string = '';
  dashboard: Dashboard;
  form: FormGroup;
  titlePanel: string = 'Hoje';
  queryParams: any = {};
  datePipe: DatePipe = new DatePipe(navigator.language);

  constructor(
    private service: DashboardsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // Identificar e implementar as permissoes dos Usuários

    // Tarefa: 1 - Incluir input select para escolha da Loja.

    // A loja atual sempre será a primeira loja vindo da API ordenada pelo número
    // Pegar o Usuário e definir o QueryParams com os dados do usuário corrente
    // a Data será sempre a data atual...  Pegar os dados do dia.
    // Depois permitir ao usuário escolher a data e/ou período para obter os dados.
    // Permitir ao usuário mudar a loja corrente.

    this.storeName = localStorage.getItem('sNm').toUpperCase();

    let currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');

    this.queryParams = {
      loja: localStorage.getItem('sId'),
      date_initial: currentDate.toString(),
      date_final: currentDate.toString(),
    };

    this.refreshData(this.queryParams);

    this.form = this.fb.group({
      loja: [this.queryParams.loja],
      date_initial: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      date_final: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
    });

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }

  get f() { return this.form.controls };

  onSubmit(){
    this.submitted = true;
    this.queryParams = {
      loja: localStorage.getItem('sId'),
      date_initial: this.datePipe.transform(this.f.date_initial.value, 'dd/MM/yyyy'),
      date_final: this.datePipe.transform(this.f.date_final.value, 'dd/MM/yyyy'),
    };
    this.titlePanel = 'Período: ' + formatDate(this.f.date_initial.value, 'longDate', 'pt-BR').toString() + ' -- ' + formatDate(this.f.date_final.value, 'longDate', 'pt-BR').toString();

    this.refreshData(this.queryParams);

  }

  refreshData(queryParams: any){

    this.service.get(queryParams).subscribe(data => {

      console.log('Dados', data);

      this.dashboard = new Dashboard().deserialize(data);

      this.setBoxes(this.dashboard);

      // Gráfico de grupos
      if (this.dashboard.rank_grupos.length > 0) {
        this.chartGrupos = {
          header: 'Top 10 - Grupos mais vendidos',
          title: this.titlePanel,
          chart: this.setChartPie({
            data: this.dashboard.rank_grupos.map( res => parseFloat(res.quantidade) as number),
            labels: this.dashboard.rank_grupos.map( res => res.descricao),
          })
        }
      } else {
        this.chartGrupos = null;
      }

      // Gráficos de formas de pagamento
      if (this.dashboard.formas_pgto.length > 0) {
        this.chartFormasPgto = {
          header: 'Formas de pagamentos mais utilizados',
          title: this.titlePanel,
          chart: this.setChartPie({
            data: this.dashboard.formas_pgto.map( res => parseFloat(res.valor) as number),
            labels: this.dashboard.formas_pgto.map( res => res.descricao),
          })
        }
        this.chartFormasPgto.chart.legendsCustom.map(res => res.value = formatCurrency(res.value, 'pt-BR', 'R$'));
      } else {
        this.chartFormasPgto = null;
      }

      // Gráfico de atendimentos por hora
      if (this.dashboard.atend_hora.length > 0) {
        let datasetsChart = {
          datasets: [{
            data: this.dashboard.atend_hora.map( res => parseFloat(res.atendimentos) as number),
            label: 'Atendimentos por hora'
          }],
          labels: this.dashboard.atend_hora.map( res => parseInt(res.hora)),
        };
        this.chartAtendHora = {
          header: 'Atendimentos por hora',
          title: this.titlePanel,
          chart: this.setChartBar(datasetsChart)
        }
      } else {
        this.chartAtendHora = null;
      }

      // Tabela de produtos
      this.top_produtos = this.dashboard.rank_produtos.map( res => {
        return {
          cod_produto: res.cod_produto,
          descricao: res.descricao,
          quantidade: formatNumber(res.quantidade | 0, 'pt-BR', '1.2-2'),
        }
      });

      // Tabela de vendedores
      this.top_vendedores = this.dashboard.rank_vendedores.map( res => {
        return {
          codigo_vendedor: res.codigo_vendedor,
          valor: formatCurrency(res.valor, 'pt-BR', 'R$')
        }
      });

      // Tabela de ultimas vendas
      this.ultimas_vendas = this.dashboard.ultimas_vendas.map( res => {
        return {
          pedido: res.pedido,
          qtd_itens: 'implementar',
          status: 'implementar',
          data_hora: formatDate(res.data_hora, 'dd/MM/yyyy HH:mm', 'pt-BR'),
          valor_venda: formatCurrency(res.valor_venda, 'pt-BR', 'R$')
        }
      });
    });
  }

  // Cria os dados para os Boxes
  setBoxes(data: Dashboard){
    this.infoBoxes = [
      {
        class_icon: 'institution',
        class_color: 'aqua',
        value: formatCurrency(data.total, 'pt-BR', 'R$'),
        description: 'TOTAL VENDAS',
        //note: '50% da META'
      },
      {
        class_icon: 'cut',
        class_color: 'red',
        value: formatCurrency(data.descontos, 'pt-BR', ''),
        description: 'DESCONTOS (0,0 %)'
      },
      {
        class_icon: 'cubes',
        class_color: 'green',
        value: formatNumber(data.quant_itens, 'pt-BR'),
        description: 'QUANT. DE ITENS'
      },
      {
        class_icon: 'users',
        class_color: 'yellow',
        value: formatNumber(data.atendimentos, 'pt-BR'),
        description: 'ATENDIMENTOS'
      },
      {
        class_icon: 'cube',
        class_color: 'blue',
        value: formatNumber((data.quant_itens / data.atendimentos) | 0, 'pt-BR', '1.2-2'),
        description: 'ITENS POR ATENDIMENTO'
      }
    ]
  }

  // Cria a configuração de Gráfico Pie
  setChartPie(data: {data: number[], labels: string[]}): any {

    let lPieChartColors: any[] = [{backgroundColor: []}];
    let chartColors = {
      orange_light: 'rgba(255, 0, 0, 0.7)',
      green_light: 'rgba(0, 255, 0, 0.7)',
      blue_light: 'rgba(0, 0, 255, 0.7)',
      red: 'rgba(255, 99, 132,0.7)',
      orange: 'rgba(255, 159, 64,0.7)',
      yellow: 'rgba(255, 205, 86,0.7)',
      green: 'rgba(75, 192, 192,0.7)',
      blue: 'rgba(54, 162, 235,0.7)',
      purple: 'rgba(153, 102, 255,0.7)',
      grey: 'rgba(201, 203, 207,0.7)'
    };
    let colorNames = Object.keys(chartColors);

    for (let i = 0; i < data.data.length; i++) {
      lPieChartColors[0].backgroundColor.push(chartColors[colorNames[i]]);
    }

    let options = {
      responsive: true,
      legend: {
        position: 'top',
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return null;
            return label;
          },
        },
      }
    };

    let legendsCustom: any[] = [];
      for (let i = 0; i < data.data.length; i++) {
        legendsCustom.push({
          label: data.labels[i],
          color: lPieChartColors[0].backgroundColor[i],
          value: data.data[i]
        });

      }

    return {
      options: options,
      labels: data.labels,
      data: data.data,
      type: 'pie',
      legend: false,
      plugins: [pluginDataLabels],
      colors: lPieChartColors,
      legendsCustom: legendsCustom
    };
  }

  // Cria a configuração de Gráfico Bar
  setChartBar(data: {datasets: any[], labels: number[]}): any {

    // let lPieChartColors: any[] = [{backgroundColor: []}];
    // let chartColors = {
    //   orange_light: 'rgba(255, 0, 0, 0.7)',
    //   green_light: 'rgba(0, 255, 0, 0.7)',
    //   blue_light: 'rgba(0, 0, 255, 0.7)',
    //   red: 'rgba(255, 99, 132,0.7)',
    //   orange: 'rgba(255, 159, 64,0.7)',
    //   yellow: 'rgba(255, 205, 86,0.7)',
    //   green: 'rgba(75, 192, 192,0.7)',
    //   blue: 'rgba(54, 162, 235,0.7)',
    //   purple: 'rgba(153, 102, 255,0.7)',
    //   grey: 'rgba(201, 203, 207,0.7)'
    // };
    // let colorNames = Object.keys(chartColors);

    // for (let i = 0; i < data.datasets.length; i++) {
    //   lPieChartColors[0].backgroundColor.push(chartColors[colorNames[i]]);
    // }

    let options = {
      responsive: true,
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        anchor: 'end',
        align: 'end'
      }
    };

    return {
      options: options,
      labels: data.labels,
      datasets: data.datasets,
      type: 'bar',
      legend: false,
      plugins: [pluginDataLabels],
    };
  }

  capitalize(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
}
