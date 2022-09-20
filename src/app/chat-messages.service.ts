import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() { }
  socket = io('http://localhost:3000');
  
  public Conectar(name: string) {
    this.socket.emit('join',
      {
        "username": name
      });
  }

  public enviarMensaje(message: any) {
    this.socket.emit('message', message);
  }

  public obtenerMensajesNuevos() {
    this.socket.on('message', (mensaje) => {
      this.message$.next(mensaje);
    });

    return this.message$.asObservable();
  };
}
