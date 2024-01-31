import { Donate } from "./Donate"
import { Donor } from "./Donor"
import { Neighborhood } from "./Neighborhood"

export interface Donation {
    isAnonymous :boolean
    dedication : string
    amount : number
    idDonated?:number
    idDonor:number
    date: Date ;
    idNeighborhood:number
      idDonatedNavigation? :Donate
      idDonorNavigation :Donor
      idNeighborhoodNavigation?:Neighborhood
      
}