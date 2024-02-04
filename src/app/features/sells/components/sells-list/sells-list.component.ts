import { Component } from '@angular/core';
import { Sell } from '../../models/sell.model';
import { SellsService } from '../../services/sells.service';

@Component({
  selector: 'app-sells-list',
  templateUrl: './sells-list.component.html',
  styleUrls: ['./sells-list.component.css']
})
export class SellsListComponent {
  sellsList: Sell[] = [];
  constructor(
    private service: SellsService
  ) {

    this.service.getSells().subscribe(
      res => this.sellsList = res
    )
  }
}
