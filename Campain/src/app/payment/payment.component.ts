import { Component ,AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import '../../assets/check/script.js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  implements OnInit {
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.loadScript();
   
      window.addEventListener('message', this.receiveMessage.bind(this), false);
    }
    
    public receiveMessage(event: MessageEvent): void {
      if (event.origin !== '../../assets/check/script.js') {
        return; // Ignore messages from other origins for security
      }
    
      const inputData = event.data; // Access the input data sent by the iframe
      console.log(inputData+"inputData");
    }
    
  

  loadScript() {
    const script = this.renderer.createElement('script');
    script.src = '../../assets/check/script.js';
    script.type = 'text/javascript';
    this.renderer.appendChild(document.body, script);
    
   
  }

  
}
