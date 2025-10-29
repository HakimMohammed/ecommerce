import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BillService} from '../../services/bill.service';
import {BillModel} from '../../bill.model';
import {finalize} from 'rxjs';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  imports: [DatePipe, CurrencyPipe],
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.html',
  styleUrls: ['./bill-detail.css']
})
export class BillDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private billService = inject(BillService);

  readonly bill = signal<BillModel | null>(null);
  readonly isLoading = signal(false);

  ngOnInit() {
    const billId = this.route.snapshot.paramMap.get('id');
    if (billId) {
      this.fetchBillDetails(billId);
    }

    console.log(this.bill());
  }

  fetchBillDetails(id: string) {
    this.isLoading.set(true);
    this.billService.getBillById(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(bill => {
        console.log(bill);
        this.bill.set(bill);
      });
  }

  calculateTotal(bill: BillModel): number {
    if (!bill.products || bill.products.length === 0) {
      return 0;
    }
    return bill.products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
