import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexTooltip, ApexDataLabels } from 'ng-apexcharts';
import { ApiService } from 'src/app/core/service/api.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  custDataRes;
  public chartOptions: Partial<ChartOptions>;

  constructor(private api: ApiService, private router: Router) {
    this.chartOptions = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      chart: {
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }

  ngOnInit(): void {
    const custId = sessionStorage.getItem('custId');
    const data = { custId };
    this.api.getCustData(data).subscribe(res => {
      if (res.success) {
        this.custDataRes = res.data.custData;
        console.log(res);
        sessionStorage.setItem('shopId', res.data.custData.shopId);
        localStorage.setItem('shopName', res.data.custData.merchData.shopName);
      }
    });
  }

  goEdit() {
    this.router.navigate(['/edit-shop']);
  }
}
