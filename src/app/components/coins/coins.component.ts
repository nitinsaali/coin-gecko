import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject<any>();
  displayedColumns = ['image', 'name', 'symbol', 'current_price', 'high_24h', 'low_24h'];
  dataSource: any;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCoins();
  }

  /**
    * Get all coins.
  **/
  getCoins() {
   const params = new HttpParams()
    .set('vs_currency', 'EUR')
    .set('order', 'market_cap_desc')
    .set('per_page', '10');

    let url = `coins/markets`;
    this.dataService.get(url, params)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data);
    });
  }

  /**
    * Get Coin Details by {ID}.
  **/
  getCoinDetails(row:any) {
    const url = `coins/${row.id}`;
    
    this.dataService.get(url)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe((data: any) => {
      console.log(data);
    });
  }

  /**
    * Destroy  the subscription before leaving component.
  **/
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.unsubscribe.unsubscribe();
  }
}

