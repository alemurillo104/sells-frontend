import { Component } from '@angular/core';
import { Sell } from '../../models/sell.model';
import { SellsService } from '../../services/sells.service';
import { SellDetail } from '../../models/sell.detail.model';

@Component({
  selector: 'app-sells-list',
  templateUrl: './sells-list.component.html',
  styleUrls: ['./sells-list.component.css']
})
export class SellsListComponent {
  totalVenta: number = 0;
  sellsList: Sell[] = [];
  sellsDetailsList: SellDetail[] = [];
  constructor(
    private service: SellsService
  ) {

    this.service.getSells().subscribe(
      res => {
        this.sellsList = res;
        console.log("res: ", res)
      }
    )
  }
  verDetalle(codigoVenta: string, descuento: number) {
    this.service.getSellDetail(codigoVenta).subscribe(
      details => {
        this.sellsDetailsList = details;
        for (let i = 0; i < this.sellsDetailsList.length; i++) {
          const detail = this.sellsDetailsList[i];
          var subtotalI = (detail.precio_unitario * detail.cantidad) - detail.descuento;
          console.log("subtotal", subtotalI)
          this.sellsDetailsList[i].subtotal = subtotalI;
        }
        this.totalVenta = this.sellsDetailsList.reduce((total, sellDetail) => total + ((sellDetail.precio_unitario * sellDetail.cantidad) - sellDetail.descuento), 0);
        console.log("total venta ; ",this.totalVenta)
      }
    )
  }
}
