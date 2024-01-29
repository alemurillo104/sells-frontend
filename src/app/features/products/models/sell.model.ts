import { SellDetail } from "./sell.request.model";

export interface Sell {
    id: number,
    descuento: number,
    codCliente: number,
    codAlmacen: number,
    codDPago: number,
    codTEntrega: number,
    subtotalVenta: number,
    total: number,
    productos: SellDetail[]
}