import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {

  clientForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {

  }
  ngOnInit() {
    this.clientForm = this.fb.group({
      // codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      ci: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      console.log('submiting');
      console.log(this.clientForm.value);

      // this.sellService.saveSell(this.empForm.value);
    } else {
      console.log('invalid form');
    }
  }

}
