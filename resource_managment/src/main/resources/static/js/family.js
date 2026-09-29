const API_BASE_URL = "http://localhost:8080";


// ========================================
// STORE CAMP DATA
// ========================================

let camps = [];


// ========================================
// LOAD CAMPS
// ========================================

function loadCamps() {

    const campDropdown =
        document.getElementById("campId");

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
// CREATE / UPDATE FAMILY
// ========================================

const familyForm =
    document.getElementById("familyForm");


if (familyForm) {

    familyForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const id =
                document.getElementById("familyId").value;


            const familyName =
                document
                    .getElementById("familyName")
                    .value
                    .trim();


            const headcount =
                document
                    .getElementById("headcount")
                    .value;


            const campId =
                document
                    .getElementById("campId")
                    .value;


            const message =
                document.getElementById("message");


            message.innerText = "";


            // Validate family name

            if (familyName === "") {

                message.innerText =
                    "Family name is required.";

                return;
            }


            // Validate headcount

            if (
                headcount === "" ||
                Number(headcount) <= 0
            ) {

                message.innerText =
                    "Headcount must be greater than 0.";

                return;
            }


            // Validate camp selection

            if (campId === "") {

                message.innerText =
                    "Please select a camp.";

                return;
            }


            // Create family object

            const family = {

                familyName: familyName,

                headcount: Number(headcount),

                campId: Number(campId)

            };


            // Default: CREATE

            let url =
                `${API_BASE_URL}/families`;

            let method = "POST";


            // If ID exists: UPDATE

            if (id !== "") {

                url =
                    `${API_BASE_URL}/families/${id}`;

                method = "PUT";

            }


            // Send request to Spring Boot

            fetch(url, {

                method: method,

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(family)

            })


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

                    if (id === "") {

                        message.innerText =
                            "Family created successfully.";

                    } else {

                        message.innerText =
                            "Family updated successfully.";

                    }


                    familyForm.reset();


                    document
                        .getElementById("familyId")
                        .value = "";


                    loadFamilies();

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
// READ ALL FAMILIES
// ========================================

function loadFamilies() {

    const familyTableBody =
        document.getElementById(
            "familyTableBody"
        );


    if (!familyTableBody) {

        return;
    }


    fetch(`${API_BASE_URL}/families`)

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load families"
                );

            }

            return response.json();

        })


        .then((families) => {

            familyTableBody.innerHTML = "";


            families.forEach((family) => {


                // Find camp using camp ID

                const camp =
                    camps.find(
                        (c) =>
                            c.id === family.campId
                    );


                const campName =
                    camp
                        ? camp.campName
                        : "Unknown Camp";


                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>${family.id}</td>

                    <td>${family.familyName}</td>

                    <td>${family.headcount}</td>

                    <td>${campName}</td>

                    <td>

                        <button
                            class="edit-button"
                            onclick="editFamily(${family.id})">

                            Edit

                        </button>


                        <button
                            class="delete-button"
                            onclick="deleteFamily(${family.id})">

                            Delete

                        </button>

                    </td>

                `;


                familyTableBody.appendChild(row);

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
// DELETE FAMILY
// ========================================

function deleteFamily(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this family?"
        );


    if (!confirmed) {

        return;
    }


    fetch(
        `${API_BASE_URL}/families/${id}`,
        {
            method: "DELETE"
        }
    )


        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to delete family"
                );

            }

            return response.text();

        })


        .then((message) => {

            alert(message);

            loadFamilies();

        })


        .catch((error) => {

            console.error(error);

            alert("Error deleting family.");

        });

}


// ========================================
// EDIT FAMILY
// ========================================

function editFamily(id) {

    fetch(
        `${API_BASE_URL}/families/${id}`
    )

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load family"
                );

            }

            return response.json();

        })


        .then((family) => {

            document
                .getElementById("familyId")
                .value = family.id;


            document
                .getElementById("familyName")
                .value = family.familyName;


            document
                .getElementById("headcount")
                .value = family.headcount;


            document
                .getElementById("campId")
                .value = family.campId;

        })


        .catch((error) => {

            console.error(error);

            alert("Error loading family.");

        });

}


// ========================================
// CLEAR FORM
// ========================================

function clearForm() {

    document
        .getElementById("familyForm")
        .reset();


    document
        .getElementById("familyId")
        .value = "";


    document
        .getElementById("message")
        .innerText = "";

}


// ========================================
// LOAD DATA WHEN PAGE OPENS
// ========================================

loadCamps().then(() => {

    loadFamilies();

});