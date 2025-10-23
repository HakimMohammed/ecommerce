import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-delete',
  imports: [],
  templateUrl: './product-delete.html',
  styleUrl: './product-delete.css'
})
export class ProductDelete {
  @Input() productID: string = 'productID';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  productService = inject(ProductService);

  onConfirm() {
    this.productService.deleteProduct(this.productID).subscribe({
      next: () => {
        this.confirm.emit()
        document.dispatchEvent(new CustomEvent('basecoat:toast', {
          detail: {
            config: {
              category: 'success',
              title: 'Success',
              description: 'Product has been deleted successfully.',
              cancel: {
                label: 'Dismiss'
              }
            }
          }
        }))
      },
      error: () => alert('Failed to delete product'),
    })
  }

  onCancel() {
    this.cancel.emit();
  }
}
