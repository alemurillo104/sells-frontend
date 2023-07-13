import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = 'Nombre';
  @Input() subtitle: string = 'text';
  @Input() image: string = '../../../assets/img/1.jpg'
}
