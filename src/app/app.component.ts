import { Component , OnInit } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'aaaaa5';

  constructor(private swUpdate: SwUpdate
                , private swPush: SwPush) {

    this.swPush.messages.subscribe( evt => {
        console.log('this is push message');
    });

    this.swUpdate.available.subscribe(evt => {
      // an update is available, add some logic here.
      console.log('update exist');
    });

    if ('serviceWorker' in navigator) {
        // Handler for messages coming from the service worker
        navigator.serviceWorker.onmessage = (event) => {
            const recvData = event.data;

            if (recvData && recvData.action === 'GETACTIVECLIENTS') {
                console.log(' active client is : ' + recvData.count);
                if (recvData.count > 1) {
                    window.location.href = '/close.html';
                }
            }
        };
    }
    const resultClients = {'action' : 'GETACTIVECLIENTS'};
    navigator.serviceWorker.controller.postMessage(resultClients);
  }
  ngOnInit() {
   console.log('on init called');
  }
  public onClickRequest() {
    // this.swUpdate.checkForUpdate()
    // .then(() => {
    // console.log('update checked');
    // });
    const resultClients = {'action' : 'GETACTIVECLIENTS'};
    navigator.serviceWorker.controller.postMessage(resultClients);
  }
}
