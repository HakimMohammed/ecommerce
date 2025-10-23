import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {ProductModel} from '../../product.model';
import {ColumnDef, createAngularTable, FlexRenderDirective, getCoreRowModel} from '@tanstack/angular-table';
import {finalize} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {ProductDelete} from '../product-delete/product-delete';

@Component({
  selector: 'app-product-list',
  imports: [
    FlexRenderDirective,
    FormsModule,
    ProductDelete,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  readonly productList = signal<ProductModel[]>([]);
  readonly isLoading = signal(false);
  readonly pageNumber = signal(0);
  readonly sizePerPage = 10;
  readonly totalPages = signal(0);

  isDeleteModalOpen = signal<boolean>(false);
  productToDelete = signal<string>('');

  keyword = '';

  private searchDebounce?: ReturnType<typeof setTimeout>;

  readonly canGoNext = computed(() => this.pageNumber() + 1 < this.totalPages());
  readonly canGoPrev = computed(() => this.pageNumber() > 0);

  readonly columns: ColumnDef<ProductModel>[] = [
    {accessorKey: 'id', header: 'ID', cell: info => info.getValue()},
    {accessorKey: 'name', header: 'Name', cell: info => info.getValue()},
    {
      accessorKey: 'price', header: 'Price', cell: info => info.getValue()
    },
    {accessorKey: 'quantity', header: 'Quantity', cell: info => info.getValue()},
    {id: 'actions', header: 'Actions'}
  ];

  readonly table = createAngularTable(() => ({
    data: this.productList(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
  }));

  createProduct() {
    this.router.navigate(['/products/create']);
  }

  editProduct(id: string) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: string) {
    this.productToDelete.set(id);
    this.isDeleteModalOpen.set(true);
  }

  confirmDelete() {
    this.isDeleteModalOpen.set(false);
    this.productToDelete.set('');
    this.fetchProducts();
  }


  cancelDelete() {
    this.isDeleteModalOpen.set(false);
    this.productToDelete.set('');
  }

  ngOnInit() {
    this.fetchProducts();
  }

  changePage(offset
             :
             number
  ) {
    const nextPage = this.pageNumber() + offset;
    if (nextPage >= 0 && nextPage < this.totalPages()) {
      this.pageNumber.set(nextPage);
      this.fetchProducts();
    }
  }

  onSearchChange() {
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => {
      this.pageNumber.set(0); // reset page on search
      this.fetchProducts();
    }, 300);
  }

  fetchProducts() {
    const loaderTimeout = setTimeout(() => this.isLoading.set(true), 150); // only show loader after 150ms

    this.productService
      .getProducts(this.pageNumber(), this.sizePerPage, this.keyword)
      .pipe(
        finalize(() => {
          clearTimeout(loaderTimeout);
          this.isLoading.set(false);
        })
      )
      .subscribe((response) => {
        this.productList.set(response.content);
        this.totalPages.set(response.totalPages);
      });
  }
}
