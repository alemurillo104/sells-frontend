import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Client } from 'src/app/features/clients/models/client.model';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { DeliveryType } from 'src/app/features/products/models/delivery_type.model';
import { PaymentCondition } from 'src/app/features/products/models/payment_condition.model';
import { Product } from 'src/app/features/products/models/product.model';
import { Store } from 'src/app/features/products/models/store.model';
import { DeliveryTypeService } from 'src/app/features/products/services/delivery-type.service';
import { PaymentConditionService } from 'src/app/features/products/services/payment-condition.service';
import { ProductService } from 'src/app/features/products/services/product.service';
import { StoreService } from 'src/app/features/products/services/store.service';
import { SellsService } from '../../services/sells.service';
import { SellDetailRequest, SellRequest } from '../../models/sell.request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-sell-form',
  templateUrl: './create-sell-form.component.html',
  styleUrls: ['./create-sell-form.component.css']
})
export class CreateSellFormComponent implements OnInit {
  empForm!: FormGroup;
  productosList: Product[] = [];

  clientesList: Client[] = [];
  almacenesList: Store[] = [];
  condPagosList: PaymentCondition[] = [];
  tiposDeliveryList: DeliveryType[] = [];
  codigo: string = 'ABC';

  constructor(
    private fb: FormBuilder,
    private productosService: ProductService,
    private sellService: SellsService,
    private storeService: StoreService,
    private paymentConditionService: PaymentConditionService,
    private clientService: ClientService,
    private deliveryTypeService: DeliveryTypeService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.empForm = this.fb.group({
      descuento: ['0', [Validators.required, Validators.max(0.5)]],
      codigo_cliente: ['', Validators.required],
      codigo_almacen: ['', Validators.required],
      codigo_condicion_pago: ['', Validators.required],
      tipo_entrega: ['', Validators.required],
      tipo_venta : [''],
      subtotalVenta: ['0', Validators.required],
      total: ['0', Validators.required],
      productos: this.fb.array([], [this.atLeastOne])
    });
    this.loadData();

  }

  loadData(): void {

    this.sellService.sells$.subscribe(res => this.codigo = `S00${res?.length || 0 + 1}`)

    this.productosService.getAll().subscribe((result) => {
      this.productosList = result.products;
    });

    this.storeService.getStores().subscribe(res => {
      this.almacenesList = res;
    });

    this.clientService.getClients().subscribe(res => {
      this.clientesList = res;
    });

    this.paymentConditionService.getPaymentConditions().subscribe(res => {
      console.log(res);
      this.condPagosList = res;
    });

    // this.deliveryTypeService.getDeliveryTypes().subscribe(res => {
    //   this.tiposDeliveryList = res;
    // });
  }


  productos(): FormArray {
    return this.empForm.get('productos') as FormArray;
  }

  nuevoProducto(): FormGroup {
    return this.fb.group({
      codigo_producto: '',
      nombre_producto: '',
      precio_unitario: '',
      cantidad: '1',
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

      var productos = this.empForm.get('productos') as FormArray;
      var detailsRequest : SellDetailRequest[] = [];
      
      for (let item of productos.controls) {
        
        var detail : SellDetailRequest = {
          codigo_venta: this.codigo,
          codigo_producto: item.get('codigo_producto')?.value,
          nombre_producto: item.get('nombre_producto')?.value,
          precio_unitario: item.get('precio_unitario')?.value,
          cantidad: item.get('cantidad')?.value,
          descuento: item.get('descuento')?.value,
        }; 
        detailsRequest.push(detail);
      }

      var sellRequest : SellRequest = {
        codigo_venta: this.codigo,
        codigo_cliente: this.empForm.get('codigo_cliente')?.value,
        descuento: this.empForm.get('descuento')?.value,
        codigo_almacen: this.empForm.get('codigo_almacen')?.value,
        codigo_condicion_pago: this.empForm.get('codigo_condicion_pago')?.value,
        tipo_venta: `Venta de ${ detailsRequest.length } productos`,
        tipo_entrega: this.empForm.get('tipo_entrega')?.value,
        productos: detailsRequest,
      };

      this.sellService.saveSell(sellRequest).subscribe(
        res => {
          console.log(res);
          if (res) {
            this.router.navigate(['/admin/sells/']);
          }
        }
      );
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
    const selectedProductId = productosArray.at(prodIndex).get('codigo_producto')?.value;
    const product = this.productosList.find( (product) => product.id == selectedProductId);
    this.productsData(prodIndex).get('nombre_producto')?.setValue(product?.title);
    const cantidad = productosArray.at(prodIndex).get('cantidad')?.value;
    const descuento = productosArray.at(prodIndex).get('descuento')?.value;
    const precio = this.calcularPrecio(selectedProductId, cantidad);
    this.productsData(prodIndex).get('precio_unitario')?.setValue(precio);
    const subtotal = this.calcularSubtotal(precio, cantidad, descuento);
    this.productsData(prodIndex).get('subtotal')?.setValue(subtotal);
    this.calcularSubtotalVenta();
  }

  calcularSubtotalVenta(): void {
    const productosArray = this.empForm.get('productos') as FormArray;
    const subtotal = productosArray.controls.reduce((total, productControl, index) => {
      const precioControl = productControl.get('precio_unitario');
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
