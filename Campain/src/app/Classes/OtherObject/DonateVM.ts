import { Neighborhood } from "../../Classes/Neighborhood"
import { Status } from "../Status"

export interface DonateVM {
    id: number
    numChildren: number
    idStatus: number
    street: string
    needed: number 
    idNeighborhood: number
    idNeighborhoodNavigation:Neighborhood
    idStatusNavigation:Status
    sumAllDonations:number
}