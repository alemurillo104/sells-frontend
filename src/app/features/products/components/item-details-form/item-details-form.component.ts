import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-item-details-form',
  templateUrl: './item-details-form.component.html',
  styleUrls: ['./item-details-form.component.css']
})
export class ItemDetailsFormComponent {

  // @Input() parentForm!: FormArray;

  // constructor(private fb: FormBuilder) { }

  // createItemFormGroup(): FormGroup {
  //   return this.fb.group({
  //     productName: ['', Validators.required],
  //     quantity: [1, [Validators.required, Validators.min(1)]],
  //     price: ['', [Validators.required, Validators.min(0.01)]]
  //   });
  // }

  // get items(): FormArray {
  //   return this.parentForm  ;
  // }

  // addItem(): void {
  //   this.items.push(this.createItemFormGroup());
  // }

  // removeItem(index: number): void {
  //   this.items.removeAt(index);
  // }
  @Input() parentForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  get items(): FormArray {
    return this.parentForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItemFormGroup());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
