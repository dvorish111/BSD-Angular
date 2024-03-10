import { Neighborhood } from "../Neighborhood"

       export interface AllDonate{
              id?:number
        parentTaz? :string
        name? :string
        numChildren: number
        idStatus: number
        street: string
        needed: number 
        numberBuilding?:number
        raised:number
        idNeighborhood: number
        idNeighborhoodNavigation?:Neighborhood
        
       }