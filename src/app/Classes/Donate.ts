import { Neighborhood } from "./Neighborhood"
import { Status } from "./Status"

export interface Donate {
    id: number
    numChildren: number
    idStatus: number
    street: string
    needed: number 
    idNeighborhood: number
    raised:number
    idNeighborhoodNavigation:Neighborhood
    idStatusNavigation:Status
}
