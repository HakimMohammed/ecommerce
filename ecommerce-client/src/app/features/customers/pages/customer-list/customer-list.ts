import {Component, inject, OnInit, signal, computed} from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {CustomerModel} from '../../customer.model';
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
} from '@tanstack/angular-table';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective, FormsModule],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.css'],
})
export class CustomerList implements OnInit {
  private customerService = inject(CustomerService);

  readonly customerList = signal<CustomerModel[]>([]);
  readonly isLoading = signal(false);
  readonly pageNumber = signal(0);
  readonly sizePerPage = 10;
  readonly totalPages = signal(0);

  keyword = '';

  private searchDebounce?: ReturnType<typeof setTimeout>;

  readonly canGoNext = computed(() => this.pageNumber() + 1 < this.totalPages());
  readonly canGoPrev = computed(() => this.pageNumber() > 0);

  readonly columns: ColumnDef<CustomerModel>[] = [
    {accessorKey: 'id', header: 'ID', cell: (info) => info.getValue()},
    {accessorKey: 'name', header: 'Name', cell: (info) => info.getValue()},
    {accessorKey: 'email', header: 'Email', cell: (info) => info.getValue()},
  ];

  readonly table = createAngularTable(() => ({
    data: this.customerList(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
  }));

  ngOnInit(): void {
    this.fetchCustomers();
  }

  changePage(offset: number) {
    const nextPage = this.pageNumber() + offset;
    if (nextPage >= 0 && nextPage < this.totalPages()) {
      this.pageNumber.set(nextPage);
      this.fetchCustomers();
    }
  }

  onSearchChange() {
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => {
      this.pageNumber.set(0); // reset page on search
      this.fetchCustomers();
    }, 300);
  }

  fetchCustomers() {
    const loaderTimeout = setTimeout(() => this.isLoading.set(true), 150); // only show loader after 150ms

    this.customerService
      .getCustomers(this.pageNumber(), this.sizePerPage, this.keyword)
      .pipe(
        finalize(() => {
          clearTimeout(loaderTimeout);
          this.isLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.customerList.set(response.content);
        this.totalPages.set(response.totalPages);
      });
  }

  trackById = (_: number, item: CustomerModel) => item.id;
}
