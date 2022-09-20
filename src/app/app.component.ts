import { Component } from '@angular/core';
import { ChatMessagesService } from './chat-messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mensaje: string = "";
  listaMensajes: string[] = [];
  nombre: string = "";
  estaConectado: boolean = false;
  constructor(private servicioChat: ChatMessagesService) {

  }

  ngOnInit() {
    this.servicioChat.obtenerMensajesNuevos().subscribe((mensaje: string) => {
      //alert("Entrando mensaje: " + message);
      this.listaMensajes.push(mensaje);
      //alert(this.messageList.length)
    })
  }

  EnviarMensaje() {
    if (this.mensaje != "") {
      this.servicioChat.enviarMensaje(this.mensaje);
      this.mensaje = "";
    }
  }

  Conectar() {
    if (this.nombre != "") {
      this.servicioChat.Conectar(this.nombre);
      this.estaConectado = true;
    }else{
      alert("ingrese un nombre por favor antes de conectarse");
    }
  }
}
