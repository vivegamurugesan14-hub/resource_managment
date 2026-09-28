const API_BASE_URL = "http://localhost:8080";


// ================================
// GET TOTAL CAMPS
// ================================

fetch(`${API_BASE_URL}/camps`)

    .then((response) => response.json())

    .then((camps) => {

        document.getElementById("campCount").innerText =
            camps.length;

    })

    .catch((error) => {

        console.error("Error loading camps:", error);

    });


// ================================
// GET TOTAL FAMILIES
// ================================

fetch(`${API_BASE_URL}/families`)

    .then((response) => response.json())

    .then((families) => {

        document.getElementById("familyCount").innerText =
            families.length;

    })

    .catch((error) => {

        console.error("Error loading families:", error);

    });


// ================================
// GET TOTAL SUPPLIES
// ================================

fetch(`${API_BASE_URL}/supplies`)

    .then((response) => response.json())

    .then((supplies) => {

        document.getElementById("supplyCount").innerText =
            supplies.length;

    })

    .catch((error) => {

        console.error("Error loading supplies:", error);

    });


// ================================
// GET TOTAL DISTRIBUTIONS
// ================================

fetch(`${API_BASE_URL}/distributions`)

    .then((response) => response.json())

    .then((distributions) => {

        document.getElementById("distributionCount").innerText =
            distributions.length;

    })

    .catch((error) => {

        console.error("Error loading distributions:", error);

    });