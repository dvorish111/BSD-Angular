import { Neighborhood } from "./Neighborhood"

export interface Donate {
    id?: number
    numChildren: number
    idStatus: number
    street: string
    needed: number 
    idNeighborhood: number
    idNeighborhoodNavigation:Neighborhood
}