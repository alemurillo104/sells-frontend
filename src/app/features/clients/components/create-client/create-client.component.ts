import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {

  clientForm!: FormGroup;
  codigo: string = 'ABC';

  constructor(
    private fb: FormBuilder,
    private service: ClientService,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.clientForm = this.fb.group({
      nombre: ['', Validators.required],
      ci: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.loadClients();
  }

  loadClients() {
    this.service.getClients().subscribe(res => this.codigo = `C00${(res?.length || 0) + 1}`)
  }

  async onSubmit() {
    if (this.clientForm.valid) {
      console.log('submiting');
      console.log(this.clientForm.value);

      var client: Client = {
        codigo_cliente: this.codigo,
        nombre_cliente: this.clientForm.get('nombre')!.value,
        email: this.clientForm.get('email')!.value,
        numero_ci_nit: this.clientForm.get('ci')!.value,
        tipo_documento: this.clientForm.get('tipoDocumento')!.value,
      }

      this.service.createClient(client).subscribe(
        res => {
          if (res) {
            this.router.navigate(['/admin/clients/list']);
          }
        }
      );
    } else {
      console.log('invalid form');
    }
  }

}
