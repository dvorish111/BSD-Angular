import { Neighborhood } from "../Neighborhood"

       export interface AllDonate{
        parentTaz :number
        name :string
        numChildren: number
        idStatus: number
        street: string
        needed: number 
        numberBuilding:number
        idNeighborhood: number
        idNeighborhoodNavigation?:Neighborhood
        
       }