import { Component ,AfterViewInit, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NeighborhoodService } from '../Services/neighborhood.service';
import { Neighborhood } from '../Classes/Neighborhood';
import '../../assets/check/script.js';
import { AllDonor } from '../Classes/AllClasses/AllDonor';
import { Donation } from '../Classes/Donation';
import { AllDonation } from '../Classes/AllClasses/AllDonation';
import { DonorService } from '../Services/donor.service';
import { DonationService } from '../Services/donation.service';
import { Donate } from '../Classes/Donate';
import { Donor } from '../Classes/Donor';

import { AllDonate } from '../Classes/AllClasses/AllDonate';
import { DonateService } from '../Services/donate.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  implements OnInit {
  constructor( private donateService: DonateService,private donationService: DonationService,private renderer: Renderer2,private route:Router,private activatedRoute:ActivatedRoute,private neighborhoodService:NeighborhoodService, private donorService:DonorService) { }
  selectedPaymentType:string='Ragil';
  selectedNeighborhood!:number;
  amount!:number;
  neighborhoods!:Neighborhood[];
  donated!:Donate;
  idDonated!:number;
  sumDonationsByDonated!:number;
  donor!:Donor;
 date:Date=new Date();
 allDonate!:AllDonate;
  newDonor: AllDonor={
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    city:"",
    street:""
  }; 
  newDonation: AllDonation={
    isAnonymous: false,
    dedication: '',
    amount: 0,
    idDonor: 0,
    idNeighborhood: 0,
    date: this.date,
    quetel: '',
    NumPayments: 12
  } ;
  okDonation: boolean =true;
  Tashlumim: number=1;
  

  //ifAnonymous: boolean =true;
  ngOnInit() {
 
    this.activatedRoute.paramMap.subscribe(params => {

      this.idDonated =Number(params.get('donatesId'));
      this.amount= Number(params.get('amount'));
      this.sumDonationsByDonated= Number(params.get('sumDonationsByDonated'));
      if (this.idDonated!=0){
     this.donateService.getByIdDonate(this.idDonated ).subscribe(
        {
          next:(donated:Donate)=>{
            this.donated=donated;
            console.log(this.donated+"this.donated!!!!!")
        
          },
          error: (err) => {
            console.error(err);
          }
      });
    }
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
    
     // const inputData = event.data; // Access the input data sent by the iframe
      this.okDonation= event.data;
      this.keepData();
      console.log(event.data+"inputData");
    }
    
  

  loadScript() {
    const script = this.renderer.createElement('script');
    script.src = '../../assets/check/script.js';
    script.type = 'text/javascript';
    this.renderer.appendChild(document.body, script);
    
   
  }
   isButtonClicked: boolean = false;
  PaymentTypeClick(selectedPaymentType:string):void{
    this.selectedPaymentType=selectedPaymentType;
    this.isButtonClicked = true;
  }
 

 
  //To receive the message from the JS
  // handleMessage(event: MessageEvent) {
  //   const returnedData = event.data;    
  //   this.okDonation= event.data;
  //  this.keepData();
  // }


  ngOnDestroy() {
    window.removeEventListener('message', this.receiveMessage.bind(this));
  }

  keepData(){
    console.log(this.date);
    console.log(this.selectedNeighborhood); 
    console.log("newDonor:"+this.newDonor); 
    this.donorService.createDonor(this.newDonor).subscribe
    ({
      next: (Id) => {
        this.newDonation.idDonor=Id;
        console.log("sucsses newDonor");  
       this.keepDataNewDonaition();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  keepDataNewDonaition(){
    this.newDonation.amount=this.amount;  
    this.newDonation.date=this.date
    if(this.idDonated !=0){
    this.newDonation.idDonated=this.idDonated
  this.newDonation.idNeighborhood=this.donated.idNeighborhood
  
  }
  else{
    this.newDonation.idNeighborhood=Number(this.selectedNeighborhood);}
    console.log("newDonation:"+this.newDonation.amount);    
    this.donationService.createDonation(this.newDonation).subscribe
    ({
      next: (next) => {      
        console.log(next);
        console.log("sucsses newDonation");  
        if(this.idDonated !=0){
        this.donated.raised=this.donated.raised+this.newDonation.amount;
        this.allDonate= this.mapDonateToAllDonate(this.donated) ;
       this.updateDonate();}
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  updateDonate(){
  this.donateService.updateDonate( this.allDonate).subscribe
        ({
          next: (next) => {    
            alert('good')
                console.log(next);
          },
          error: (err) => {
            alert("not good")
            console.error(err);
          }
        })
      
    }
  mapDonateToAllDonate(donated:Donate){
return this.allDonate={
id:this.idDonated,
  idNeighborhood:donated.idNeighborhood,
 idNeighborhoodNavigation: donated.idNeighborhoodNavigation,
  idStatus:donated.idStatus,
  //  donated.idStatusNavigation,
  needed:donated.needed,
  numChildren:donated.numChildren,
  raised:donated.raised,
  street:donated.street
}
  }
}
