import { Component } from '@angular/core';
import { Image } from 'src/app/shared/models/image.interface';

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.css']
})
export class HomeSectionComponent {

  homeImages : Image[] = [
    {
      id: 0,
      title: 'Imagen1',
      subtitle: 'Overview',
      image: '../../../../assets/img/landing/1.jpg'
    },
    {
      id: 1,
      title: 'Imagen2',
      subtitle: 'example',
      image: '../../../../assets/img/landing/1.jpg'
    },
    {
      id: 2,
      title: 'Imagen3',
      subtitle: 'example',
      image: '../../../../assets/img/landing/1.jpg'
    },
    {
      id: 3,
      title: 'Imagen4',
      subtitle: 'example',
      image: '../../../../assets/img/landing/1.jpg'
    },
  ]
}
