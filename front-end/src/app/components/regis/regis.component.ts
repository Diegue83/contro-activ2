import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActividadesService } from 'src/app/services/actividades.service';
import { ParticipantesService } from 'src/app/services/participantes.service';
import { CarreraService } from 'src/app/services/carrera.services';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { asistencia } from 'src/app/models/asistencia';
import { Participante } from 'src/app/models/Participantes';
import { loadScript } from '@paypal/paypal-js';


declare let paypal: any;
@Component({
  selector: 'app-regis',
  templateUrl:'./regis.component.html',
  styleUrls: ['./regis.component.css']
})
export class RegisComponent implements OnInit {

  participantes: Participante[]=[];
  participante={ numCon:'', nomPar:'',grupo:'',idCar:0};
  registros: asistencia[] = [];
  asistencia = { numCon: '', idAct: 0 };

  constructor(
    public actividadService: ActividadesService,
    public carreraService: CarreraService,
    public ParticipanteService: ParticipantesService,
    public asistenciaService: AsistenciaService,
  ) {}

  ngOnInit(): void {
    this.getAct();
    this.getPar();
    this.getCar();
    this.getAsis();
    console.log(this.registros)
    console.log(this.participante)
    //this.procesarPago()
  }

  getPar() {
    this.ParticipanteService.getPar().subscribe(
        (res: Participante[]) => {
        this.participantes = res;
        console.log(this.ParticipanteService.Participante);
      },
      error => console.log(error)
    );
  }

  getAct() {
    this.actividadService.getAct().subscribe(
      res => {
        this.actividadService.actividades = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  getCar() {
    this.carreraService.getCar().subscribe(
      res => {
        this.carreraService.carreras = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  insPar(form:NgForm){
    const numCon=form.value.numCon;
    const nomPar=form.value.nomPar;
    const idCar=form.value.idCar;
    const grupo=form.value.grupo;
    const existe = this.participantes.some(participante =>
      participante.numCon == numCon
    )
    console.log(this.participantes)
    // console.log(participante.numCon)

    const infoPar = { numCon, nomPar, grupo, idCar };

    if (!existe){
      this.ParticipanteService.insPar(infoPar).subscribe(
        res => {
          // this.getAsis();
          form.reset();
        },
        err => console.log(err)
      );
      
    }

  }

  getAsis(){
    this.asistenciaService.getAsis().subscribe(
      (res: asistencia[]) => {
        this.registros = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  agAsis(form: NgForm) {
    const numCon=form.value.numCon;
    const idAct=form.value.idAct;
    const existe = this.registros.some(registro =>
      registro.numCon == numCon && registro.idAct == idAct
    );

    console.log(this.registros)
    const Asistencia = { numCon, idAct };

    if (!existe) {
      console.log("insertado")
      this.asistenciaService.agAsis(Asistencia).subscribe(
        res => {
          // this.getAsis();
          form.reset();
        },
        err => console.log(err)
      );
    } else {
      console.log("La inscripción ya existe");
    }
  }
  montoACobrar: number = 100.00; // Cambia este valor al monto que desees cobrar

  // procesarPago(): void {
  //   // Define el objeto de pago con el monto
  //   paypal.Buttons({
  //     createOrder(data, actions) {
  //       return actions.order.create({
  //         purchase_units: [{
  //           amount: {
  //             value: '150.00' // Nuevo precio
  //           }
  //         }]
  //       });
  //     },
  //     onApprove(data, actions) {
  //       return actions.order.capture().then(function(details) {
  //         // Aquí puedes completar la orden y mostrar un mensaje de confirmación.
  //       });
  //     }
  //   }).render('#paypal-button-container');
    
  // }

}
