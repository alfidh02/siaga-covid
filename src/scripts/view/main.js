import covidApi from "../data/covid-api.js"

function main() {
    const loadSummary = (country) => {
        return covidApi.getSummary()
        .then(summaryData => {
            showAllData(summaryData.Countries.filter(e => e.Slug === country)[0])   
        })
    
    }

    const loadData = (country) => {
        loadSummary(country)
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }


    const showAllData = (numberData) => {
        showConfirmedTotal(numberData.TotalConfirmed)
        showRecoveredTotal(numberData.TotalRecovered)
        showDeathsTotal(numberData.TotalDeaths)
    }

    const showConfirmedTotal = (total) => {
        const numberConfirmed = numberWithCommas(total)
        const confirmedElement = document.querySelector("#confirmed-total")
        confirmedElement.innerHTML = `
            <h5 class="fw-bold">${numberConfirmed}</h5>
            <span>confirmed</span>
            `
    }
    
    const showRecoveredTotal = (total) => {
        const numberRecovered = numberWithCommas(total)
        const confirmedElement = document.querySelector("#recovered-total")
        confirmedElement.innerHTML = `
            <h5 class="fw-bold">${numberRecovered}</h5>
            <span>recovered</span>
            `
    }
    
    const showDeathsTotal = (total) => {
        const numberDeath = numberWithCommas(total)
        const confirmedElement = document.querySelector("#death-total")
        confirmedElement.innerHTML = `
            <h5 class="fw-bold">${numberDeath}</h5>
            <span>deaths</span>
            `
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadData('indonesia')
    })

}

export default main;