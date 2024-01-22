import { Donor } from "./Donor"
import { Neighborhood } from "./Neighborhood"

export interface Donation {
    isAnonymous :boolean
    dedication: string
    amount : number
    idDonated?:number
    idDonor:number
    idNeighborhoods:number
    date: Date
    idNeighborhoodNavigation:Neighborhood
    idDonorNavigation:Donor

}