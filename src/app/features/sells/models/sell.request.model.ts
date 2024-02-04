export interface SellRequest {
    codigo_venta:          string;
    codigo_cliente:        string;
    descuento:             number;
    codigo_almacen:        string;
    codigo_condicion_pago: string;
    tipo_venta:            string;
    tipo_entrega:          string;
    productos:             SellDetailRequest[];
}

export interface SellDetailRequest {
    codigo_venta:    string;
    codigo_producto: string;
    nombre_producto: string;
    precio_unitario: number;
    cantidad:        number;
    descuento:       number;
}