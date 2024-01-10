import { Component ,AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NeighborhoodService } from '../Services/neighborhood.service';
import { Neighborhood } from '../Classes/Neighborhood';
import '../../assets/check/script.js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  implements OnInit {
  constructor(private renderer: Renderer2,private route:Router,private activatedRoute:ActivatedRoute,private neighborhoodService:NeighborhoodService) { }
  selectedPaymentType:string='Ragil';
  selectedNeighborhood!:Neighborhood;
  amount!:string|null;
  neighborhoods!:Neighborhood[];
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      var amount1=params.get('amount');
      this.amount=amount1;
     
      });

      this.getAllNeighborhoods();

    this.loadScript();
   
      window.addEventListener('message', this.receiveMessage.bind(this), false);
    }
    getAllNeighborhoods(){
      this.neighborhoodService.getAllNeighborhoods().subscribe
      ({
        next: (neighborhood:Neighborhood[]) => {
          this.neighborhoods = neighborhood;
          console.log(this.neighborhoods);
  
        },
        error: (err) => {
          console.error(err);
        }
      });
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
  PaymentTypeClick(selectedPaymentType:string){
    this.selectedPaymentType=selectedPaymentType;
  }
  
}
