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
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective, FormsModule],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.css'],
})
export class CustomerList implements OnInit {
  private customerService = inject(CustomerService);
  private router = inject(Router);

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
    {accessorKey: 'id', header: 'ID', cell: info => info.getValue()},
    {accessorKey: 'name', header: 'Name', cell: info => info.getValue()},
    {accessorKey: 'email', header: 'Email', cell: info => info.getValue()},
    {id: 'actions', header: 'Actions'}
  ];


  readonly table = createAngularTable(() => ({
    data: this.customerList(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
  }));

  createCustomer() {
    this.router.navigate(['/customers/create']);
  }

  handleActionClick(event: Event) {
    const target = event.target as HTMLElement;
    const action = target.getAttribute('data-action');
    const id = target.getAttribute('data-id');

    if (!action || !id) return;

    if (action === 'edit') {
      this.editCustomer(id);
    } else if (action === 'delete') {
      this.deleteCustomer(id);
    }
  }


  deleteCustomer(id: string) {
    console.log(id);
    confirm('Are you sure you want to delete this customer?') &&
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.fetchCustomers();
      document.dispatchEvent(new CustomEvent('basecoat:toast', {
        detail: {
          config: {
            category: 'success',
            title: 'Success',
            description: 'A new customer has been deleted successfully.',
            cancel: {
              label: 'Dismiss'
            }
          }
        }
      }))
    });
  }

  editCustomer(id: string) {
    this.router.navigate(['/customers/edit', id]);
  }

  ngOnInit()
    :
    void {
    this.fetchCustomers();
  }

  changePage(offset
             :
             number
  ) {
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
}
