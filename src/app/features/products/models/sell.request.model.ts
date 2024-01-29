export interface SellRequest {
    descuento: number,
    codCliente: number,
    codAlmacen: number,
    codDPago: number,
    codTEntrega: number,
    subtotalVenta: number,
    total: number,
    productos: SellDetail[]

}

export interface SellDetail {
    productItem: number,
    cantidad: number,
    precio: number,
    descuento: number,
    subtotal: number,
}

// return this.fb.group({
//     productItem: '',
//     cantidad: '1',
//     precio: '',
//     descuento: '0',
//     subtotal: '0',
//   });
// this.empForm = this.fb.group({
//     descuento: ['0', [Validators.required, Validators.max(0.5)]],
//     codCliente: ['', Validators.required],
//     codAlmacen: ['', Validators.required],
//     codCPago: ['', Validators.required],
//     codTEntrega: ['', Validators.required],
//     subtotalVenta: ['0', Validators.required],
//     total: ['0', Validators.required],
//     productos: this.fb.array([], [this.atLeastOne])
//   });