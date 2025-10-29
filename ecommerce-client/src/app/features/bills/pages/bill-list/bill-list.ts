import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ColumnDef, createAngularTable, FlexRenderDirective, getCoreRowModel} from '@tanstack/angular-table';
import {FormsModule} from '@angular/forms';
import {BillService} from '../../services/bill.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BillModel} from '../../bill.model';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-bill-list',
  imports: [
    FlexRenderDirective,
    FormsModule
  ],
  templateUrl: './bill-list.html',
  styleUrl: './bill-list.css'
})
export class BillList implements OnInit {
  private billService = inject(BillService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly billList = signal<BillModel[]>([]);
  readonly isLoading = signal(false);
  readonly pageNumber = signal(0);
  readonly totalPages = signal(0);
  readonly sizePerPage = 10;

  readonly customerId = signal<string>('');

  readonly canGoNext = computed(() => this.pageNumber() + 1 < this.totalPages());
  readonly canGoPrev = computed(() => this.pageNumber() > 0);

  readonly columns: ColumnDef<BillModel>[] = [
    {accessorKey: 'id', header: 'Bill ID', cell: info => info.getValue()},
    {
      accessorKey: 'billingDate',
      header: 'Billing Date',
      cell: info => new Date(info.getValue() as string).toLocaleDateString()
    },
    {
      accessorKey: 'productItems',
      header: 'Items Count',
      cell: info => (info.getValue() as any[])?.length ?? 0
    },
    {id: 'actions', header: 'Actions'}
  ];

  readonly table = createAngularTable(() => ({
    data: this.billList(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
  }));

  ngOnInit() {
    this.customerId.set(this.route.snapshot.paramMap.get('customerId')!);
    this.fetchBills();
  }

  fetchBills() {
    const loaderTimeout = setTimeout(() => this.isLoading.set(true), 150);

    this.billService
      .getBills(this.pageNumber(), this.sizePerPage, this.customerId())
      .pipe(finalize(() => {
        clearTimeout(loaderTimeout);
        this.isLoading.set(false);
      }))
      .subscribe((response) => {
        this.billList.set(response.content);
        this.totalPages.set(response.totalPages);
      });
  }

  changePage(offset: number) {
    const nextPage = this.pageNumber() + offset;
    if (nextPage >= 0 && nextPage < this.totalPages()) {
      this.pageNumber.set(nextPage);
      this.fetchBills();
    }
  }

  goToBillDetail(id: string) {
    this.router.navigate(['/bills', 'detail', id]);
  }
}
