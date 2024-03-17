import { Neighborhood } from "../Neighborhood"

// <<<<<<< HEAD
// export interface AllDonate {
//        id?: number
//        parentTaz?: number
//        name?: string
//        numChildren: number
//        idStatus: number
//        street: string
//        needed: number
//        numberBuilding?: number
//        raised: number
//        idNeighborhood: number
//        idNeighborhoodNavigation?: Neighborhood

// }
// =======
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
// >>>>>>> 3070642922a7eb749ab8af11388148c79ec4fd1c
