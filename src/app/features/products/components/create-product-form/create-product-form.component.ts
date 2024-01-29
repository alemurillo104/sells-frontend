import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { SellsService } from '../../services/sells.service';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.css']
})
export class CreateProductFormComponent implements OnInit {
  empForm!: FormGroup;
  productosList: Product[] = [];


  constructor(
    private fb: FormBuilder,
    private productosService: ProductService,
    private sellService: SellsService,
  ) { }

  ngOnInit() {
    this.empForm = this.fb.group({
      descuento: ['0', [Validators.required, Validators.max(0.5)]],
      codCliente: ['', Validators.required],
      codAlmacen: ['', Validators.required],
      codCPago: ['', Validators.required],
      codTEntrega: ['', Validators.required],
      subtotalVenta: ['0', Validators.required],
      total: ['0', Validators.required],
      productos: this.fb.array([], [this.atLeastOne])
    });
    this.loadData();

  }

  loadData(): void {
    this.productosService.getAll().subscribe((result) => {
      this.productosList = result.products;
    });
  }


  productos(): FormArray {
    return this.empForm.get('productos') as FormArray;
  }

  nuevoProducto(): FormGroup {
    return this.fb.group({
      productItem: '',
      cantidad: '1',
      precio: '',
      descuento: '0',
      subtotal: '0',
    });
  }

  agregarProducto() {
    this.productos().push(this.nuevoProducto());
  }

  removerProducto(prodIndex: number) {
    this.productos().removeAt(prodIndex);
    if (this.productos().length == 0) {
      this.reset();
    } else {
      this.actualizarDetalleItem(prodIndex);
    }
  }

  onSubmit() {
    if (this.empForm.valid) {
      console.log('submiting');
      console.log(this.empForm.value);

      this.sellService.saveSell(this.empForm.value);
    } else {
      console.log('invalid form');
    }
  }

  reset() {
    this.empForm.get('subtotalVenta')?.setValue(0);
    this.empForm.get('total')?.setValue(0);
  }

  productsData(prodIndex: number): FormGroup {
    return this.productos()
      .at(prodIndex) as FormGroup;
  }

  actualizarDetalleItem(prodIndex: number): void {
    const productosArray = this.empForm.get('productos') as FormArray;
    const selectedProductId = productosArray.at(prodIndex).get('productItem')?.value;
    const cantidad = productosArray.at(prodIndex).get('cantidad')?.value;
    const descuento = productosArray.at(prodIndex).get('descuento')?.value;
    const precio = this.calcularPrecio(selectedProductId, cantidad);
    this.productsData(prodIndex).get('precio')?.setValue(precio);
    const subtotal = this.calcularSubtotal(precio, cantidad, descuento);
    this.productsData(prodIndex).get('subtotal')?.setValue(subtotal);
    this.calcularSubtotalVenta();
  }

  calcularSubtotalVenta(): void {
    const productosArray = this.empForm.get('productos') as FormArray;
    const subtotal = productosArray.controls.reduce((total, productControl, index) => {
      const precioControl = productControl.get('precio');
      const cantidadControl = productControl.get('cantidad');
      const descuentoControl = productControl.get('descuento');
      return total + ((precioControl?.value || 0) * (cantidadControl?.value || 0)) - (descuentoControl?.value || 0);
    }, 0);


    this.empForm.get('subtotalVenta')?.setValue(subtotal);
    var descuento = parseInt(this.empForm.get('descuento')?.value);
    var nuevoTotal = subtotal - descuento;
    this.empForm.get('total')?.setValue(nuevoTotal);

  }
  calcularPrecio(selectedProductId: number, cantidad: number): number {
    const selectedProduct = this.productosList.find(item => item.id == selectedProductId);
    return selectedProduct ? selectedProduct.price : 0;
  }
  calcularSubtotal(precio: number, cantidad: number, descuento: number): number {
    return (precio * cantidad) - descuento;
  }

  atLeastOne(control: AbstractControl): ValidationErrors | null {
    const formArray = control as FormArray;
    const arrayControls = formArray.controls;

    const hasValue = arrayControls.some(control => control.value != null && control.value != undefined);

    return hasValue ? null : { atLeastOne: true };
  }
}
