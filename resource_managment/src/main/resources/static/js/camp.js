const API_BASE_URL = "http://localhost:8080";


// ========================================
// CREATE / UPDATE CAMP
// ========================================

const campForm = document.getElementById("campForm");


if (campForm) {

    campForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const id =
            document.getElementById("campId").value;


        const campName =
            document.getElementById("campName").value.trim();


        const location =
            document.getElementById("location").value.trim();


        const capacity =
            document.getElementById("capacity").value;


        const message =
            document.getElementById("message");


        message.innerText = "";


        // Camp name validation

        if (campName === "") {

            message.innerText =
                "Camp name is required.";

            return;

        }


        // Location validation

        if (location === "") {

            message.innerText =
                "Location is required.";

            return;

        }


        // Capacity validation

        if (capacity === "" || Number(capacity) <= 0) {

            message.innerText =
                "Capacity must be greater than 0.";

            return;

        }


        const camp = {

            campName: campName,

            location: location,

            capacity: Number(capacity)

        };


        // Decide CREATE or UPDATE

        let url = `${API_BASE_URL}/camps`;

        let method = "POST";


        if (id !== "") {

            url = `${API_BASE_URL}/camps/${id}`;

            method = "PUT";

        }


        // Send request to Spring Boot

        fetch(url, {

            method: method,

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify(camp)

        })


            .then((response) => {

                if (!response.ok) {

                    throw new Error(
                        `Request failed. Status: ${response.status}`
                    );

                }

                return response.json();

            })


            .then((data) => {

                message.innerText =
                    id === ""
                    ? "Camp created successfully."
                    : "Camp updated successfully.";


                campForm.reset();


                document.getElementById("campId").value = "";


                loadCamps();

            })


            .catch((error) => {

                message.innerText =
                    "Error saving camp.";

                console.error(error);

            });

    });

}


// ========================================
// READ ALL CAMPS
// ========================================

function loadCamps() {

    const campTableBody =
        document.getElementById("campTableBody");


    if (!campTableBody) {

        return;

    }


    fetch(`${API_BASE_URL}/camps`)

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load camps"
                );

            }

            return response.json();

        })


        .then((camps) => {

            campTableBody.innerHTML = "";


            camps.forEach((camp) => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>${camp.id}</td>

                    <td>${camp.campName}</td>

                    <td>${camp.location}</td>

                    <td>${camp.capacity}</td>

                    <td>

                        <button
                            class="edit-button"
                            onclick="editCamp(${camp.id})">

                            Edit

                        </button>


                        <button
                            class="delete-button"
                            onclick="deleteCamp(${camp.id})">

                            Delete

                        </button>

                    </td>

                `;


                campTableBody.appendChild(row);

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
// DELETE CAMP
// ========================================

function deleteCamp(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this camp?"
        );


    if (!confirmed) {

        return;

    }


    fetch(`${API_BASE_URL}/camps/${id}`, {

        method: "DELETE"

    })


        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to delete camp"
                );

            }

            return response.text();

        })


        .then((message) => {

            alert(message);

            loadCamps();

        })


        .catch((error) => {

            console.error(
                "Error deleting camp:",
                error
            );

            alert("Error deleting camp.");

        });

}


// ========================================
// EDIT CAMP
// ========================================

function editCamp(id) {

    fetch(`${API_BASE_URL}/camps/${id}`)

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load camp"
                );

            }

            return response.json();

        })


        .then((camp) => {

            document.getElementById("campId").value =
                camp.id;


            document.getElementById("campName").value =
                camp.campName;


            document.getElementById("location").value =
                camp.location;


            document.getElementById("capacity").value =
                camp.capacity;

        })


        .catch((error) => {

            console.error(error);

            alert("Error loading camp.");

        });

}


// ========================================
// CLEAR FORM
// ========================================

function clearForm() {

    document.getElementById("campForm").reset();

    document.getElementById("campId").value = "";

    document.getElementById("message").innerText = "";

}


// Load camps when page opens

loadCamps();