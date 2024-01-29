import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellFormComponent } from './create-sell-form.component';

describe('CreateSellFormComponent', () => {
  let component: CreateSellFormComponent;
  let fixture: ComponentFixture<CreateSellFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSellFormComponent]
    });
    fixture = TestBed.createComponent(CreateSellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
