import { Client } from "../../clients/models/client.model";
import { PaymentCondition } from "../../products/models/payment_condition.model";
import { Store } from "../../products/models/store.model";
import { SellDetail } from "./sell.detail.model";

export interface Sell {
    codigo_venta: string,
    descuento: number,
    tipo_entrega: string,
    tipo_venta: string,
    almacen : Store,
    cliente : Client,
    condicion_pago: PaymentCondition,
}