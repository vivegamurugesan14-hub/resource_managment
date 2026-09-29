const API_BASE_URL = "http://localhost:8080";


// ========================================
// STORE DATA
// ========================================

let camps = [];
let families = [];
let supplies = [];


// ========================================
// LOAD CAMPS
// ========================================

function loadCamps() {

    const campDropdown =
        document.getElementById("distributionCampId");

    if (!campDropdown) {
        return Promise.resolve();
    }

    return fetch(`${API_BASE_URL}/camps`)

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load camps"
                );

            }

            return response.json();

        })

        .then((data) => {

            camps = data;

            campDropdown.innerHTML = `
                <option value="">
                    Select Camp
                </option>
            `;


            camps.forEach((camp) => {

                const option =
                    document.createElement("option");

                option.value = camp.id;

                option.textContent =
                    camp.campName;

                campDropdown.appendChild(option);

            });

        })

        .catch((error) => {

            console.error(
                "Error loading camps:",
                error
            );

        });

}


// ========================================
// LOAD FAMILIES
// ========================================

function loadFamilies() {

    const familyDropdown =
        document.getElementById(
            "distributionFamilyId"
        );

    if (!familyDropdown) {
        return Promise.resolve();
    }

    return fetch(`${API_BASE_URL}/families`)

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load families"
                );

            }

            return response.json();

        })

        .then((data) => {

            families = data;

            familyDropdown.innerHTML = `
                <option value="">
                    Select Family
                </option>
            `;


            families.forEach((family) => {

                const option =
                    document.createElement("option");

                option.value = family.id;

                option.textContent =
                    family.familyName;

                familyDropdown.appendChild(option);

            });

        })

        .catch((error) => {

            console.error(
                "Error loading families:",
                error
            );

        });

}


// ========================================
// LOAD SUPPLIES
// ========================================

function loadSupplies() {

    const supplyDropdown =
        document.getElementById(
            "distributionSupplyId"
        );

    if (!supplyDropdown) {
        return Promise.resolve();
    }

    return fetch(`${API_BASE_URL}/supplies`)

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load supplies"
                );

            }

            return response.json();

        })

        .then((data) => {

            supplies = data;

            supplyDropdown.innerHTML = `
                <option value="">
                    Select Supply
                </option>
            `;


            supplies.forEach((supply) => {

                const option =
                    document.createElement("option");

                option.value = supply.id;

                option.textContent =
                    supply.itemName +
                    " (Available: " +
                    supply.quantity +
                    ")";

                supplyDropdown.appendChild(option);

            });

        })

        .catch((error) => {

            console.error(
                "Error loading supplies:",
                error
            );

        });

}


// ========================================
// CREATE DISTRIBUTION
// ========================================

const distributionForm =
    document.getElementById(
        "distributionForm"
    );


if (distributionForm) {

    distributionForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const campId =
                document
                    .getElementById(
                        "distributionCampId"
                    )
                    .value;


            const familyId =
                document
                    .getElementById(
                        "distributionFamilyId"
                    )
                    .value;


            const supplyId =
                document
                    .getElementById(
                        "distributionSupplyId"
                    )
                    .value;


            const quantity =
                document
                    .getElementById(
                        "distributionQuantity"
                    )
                    .value;


            const message =
                document.getElementById(
                    "message"
                );


            message.innerText = "";


            // Validate camp

            if (campId === "") {

                message.innerText =
                    "Please select a camp.";

                return;
            }


            // Validate family

            if (familyId === "") {

                message.innerText =
                    "Please select a family.";

                return;
            }


            // Validate supply

            if (supplyId === "") {

                message.innerText =
                    "Please select a supply.";

                return;
            }


            // Validate quantity

            if (
                quantity === "" ||
                Number(quantity) <= 0
            ) {

                message.innerText =
                    "Quantity must be greater than 0.";

                return;
            }


            // Create distribution object

            const distribution = {

                campId: Number(campId),

                familyId: Number(familyId),

                supplyId: Number(supplyId),

                quantity: Number(quantity)

            };


            // Send request

            fetch(
                `${API_BASE_URL}/distributions`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            distribution
                        )

                }
            )


                // Read response

                .then(async (response) => {

                    if (!response.ok) {

                        const errorMessage =
                            await response.text();

                        throw new Error(
                            errorMessage
                        );

                    }

                    return response.json();

                })


                // Success

                .then((data) => {

                    message.innerText =
                        "Supply distributed successfully.";

                    distributionForm.reset();

                    loadSupplies();

                    loadDistributions();

                })


                // Error

                .catch((error) => {

                    console.error(error);

                    message.innerText =
                        error.message;

                });

        });

}


// ========================================
// READ DISTRIBUTIONS
// ========================================

function loadDistributions() {

    const tableBody =
        document.getElementById(
            "distributionTableBody"
        );


    if (!tableBody) {
        return;
    }


    fetch(`${API_BASE_URL}/distributions`)

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load distributions"
                );

            }

            return response.json();

        })


        .then((distributions) => {

            tableBody.innerHTML = "";


            distributions.forEach(
                (distribution) => {


                    const camp =
                        camps.find(
                            (c) =>
                                c.id ===
                                distribution.campId
                        );


                    const family =
                        families.find(
                            (f) =>
                                f.id ===
                                distribution.familyId
                        );


                    const supply =
                        supplies.find(
                            (s) =>
                                s.id ===
                                distribution.supplyId
                        );


                    const campName =
                        camp
                            ? camp.campName
                            : "Unknown Camp";


                    const familyName =
                        family
                            ? family.familyName
                            : "Unknown Family";


                    const supplyName =
                        supply
                            ? supply.itemName
                            : "Unknown Supply";


                    const row =
                        document.createElement(
                            "tr"
                        );


                    row.innerHTML = `

                        <td>
                            ${distribution.id}
                        </td>

                        <td>
                            ${campName}
                        </td>

                        <td>
                            ${familyName}
                        </td>

                        <td>
                            ${supplyName}
                        </td>

                        <td>
                            ${distribution.quantity}
                        </td>

                    `;


                    tableBody.appendChild(row);

                }
            );

        })


        .catch((error) => {

            console.error(
                "Error loading distributions:",
                error
            );

        });

}


// ========================================
// CLEAR FORM
// ========================================

function clearDistributionForm() {

    document
        .getElementById(
            "distributionForm"
        )
        .reset();


    document
        .getElementById(
            "message"
        )
        .innerText = "";

}


// ========================================
// LOAD DATA WHEN PAGE OPENS
// ========================================

Promise.all([
    loadCamps(),
    loadFamilies(),
    loadSupplies()
])
.then(() => {

    loadDistributions();

});