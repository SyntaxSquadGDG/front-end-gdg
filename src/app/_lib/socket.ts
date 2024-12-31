// _lib/socket.ts
import * as signalR from '@microsoft/signalr';

// import { revalidateLogin } from '../_actions/login';

export let socket: signalR.HubConnection;

export const initSocket = (id) => {
  if (!socket) {
    socket = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5009/hub') // Replace with your SignalR hub URL
      .withAutomaticReconnect()
      .build();

    console.log(socket);

    // Start the connection
    socket
      .start()
      .then(() => {
        if (socket.state === signalR.HubConnectionState.Connected) {
          console.log('Socket is connecteddd');
        } else {
          console.error('Socket is not connecteddd');
        }
        socket
          .invoke('Register', 'IO')
          .then(() => console.log('Registration successful'))
          .catch((err) => console.log('Error invoking Register:', err));
        // Send registration event with user ID
      })
      .catch((err) => console.error('Error connecting to SignalR hub:', err));

    // Set up event listeners
    socket.on('ReceiveMessage', (message) => {
      console.log('Message from server:', message);
    });

    socket.on('logout', async () => {
      // await revalidateLogin();
      console.log('Disconnected');
      socket.stop();
    });
  }

  return socket;
};

export const getSocket = () => socket;

