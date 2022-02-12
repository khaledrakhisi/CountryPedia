import Currency from "./currency";

export interface Country{
    id: number,
    name: string,
    fullName: string,
    population: number,
    currencies: Array<Currency>,
    flagUrl: string,
}