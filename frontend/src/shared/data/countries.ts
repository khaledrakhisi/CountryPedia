import { Country } from "../interfaces/country";

const countries: Array<Country> = [
    {
        id: 1,
        name: "peru",
        fullName: "peru",
        population: 1,
        flagUrl: "https://flagcdn.com/w320/pe.png",
        currencies: [
            {                
                code: "1",
                name: "1",
                symbol: "1",
                exchangeRateToSEK: 1,
            }
        ],
    },
    {
        id: 2,
        name: "sweden",
        fullName: "kingdom of sweden",
        population: 2,
        flagUrl: "https://flagcdn.com/w320/se.png",
        currencies: [
            {
                code: "2",
                name: "2",
                symbol: "2",
                exchangeRateToSEK: 2,
            },
            {
                code: "22",
                name: "22",
                symbol: "22",
                exchangeRateToSEK: 22,
            }
        ],
    }
];

export default countries;