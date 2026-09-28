const API_BASE_URL = "http://localhost:8080";


// ========================================
// CREATE / UPDATE SUPPLY
// ========================================

const supplyForm =
    document.getElementById("supplyForm");


if (supplyForm) {

    supplyForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const id =
            document.getElementById("supplyId").value;


        const itemName =
            document.getElementById("itemName").value.trim();


        const quantity =
            document.getElementById("quantity").value;


        const message =
            document.getElementById("message");


        message.innerText = "";


        if (itemName === "") {

            message.innerText =
                "Item name is required.";

            return;

        }


        if (quantity === "" || Number(quantity) <= 0) {

            message.innerText =
                "Quantity must be greater than 0.";

            return;

        }


        const supply = {

            itemName: itemName,

            quantity: Number(quantity)

        };


        let url =
            `${API_BASE_URL}/supplies`;

        let method = "POST";


        if (id !== "") {

            url =
                `${API_BASE_URL}/supplies/${id}`;

            method = "PUT";

        }


        fetch(url, {

            method: method,

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify(supply)

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
                    ? "Supply created successfully."
                    : "Supply updated successfully.";


                supplyForm.reset();

                document.getElementById("supplyId").value = "";


                loadSupplies();

            })


            .catch((error) => {

                message.innerText =
                    "Error saving supply.";

                console.error(error);

            });

    });

}


// ========================================
// READ ALL SUPPLIES
// ========================================

function loadSupplies() {

    const supplyTableBody =
        document.getElementById("supplyTableBody");


    if (!supplyTableBody) {

        return;

    }


    fetch(`${API_BASE_URL}/supplies`)

        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load supplies"
                );

            }

            return response.json();

        })


        .then((supplies) => {

            supplyTableBody.innerHTML = "";


            supplies.forEach((supply) => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>${supply.id}</td>

                    <td>${supply.itemName}</td>

                    <td>${supply.quantity}</td>

                    <td>

                        <button
                            class="edit-button"
                            onclick="editSupply(${supply.id})">

                            Edit

                        </button>


                        <button
                            class="delete-button"
                            onclick="deleteSupply(${supply.id})">

                            Delete

                        </button>

                    </td>

                `;


                supplyTableBody.appendChild(row);

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
// DELETE SUPPLY
// ========================================

function deleteSupply(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this supply?"
        );


    if (!confirmed) {

        return;

    }


    fetch(`${API_BASE_URL}/supplies/${id}`, {

        method: "DELETE"

    })


        .then((response) => {

            if (!response.ok) {

                throw new Error(
                    "Failed to delete supply"
                );

            }

            return response.text();

        })


        .then((message) => {

            alert(message);

            loadSupplies();

        })


        .catch((error) => {

            console.error(error);

            alert("Error deleting supply.");

        });

}


// ========================================
// EDIT SUPPLY
// ========================================

function editSupply(id) {

    fetch(`${API_BASE_URL}/supplies/${id}`)

        .then((response) => response.json())

        .then((supply) => {

            document.getElementById("supplyId").value =
                supply.id;


            document.getElementById("itemName").value =
                supply.itemName;


            document.getElementById("quantity").value =
                supply.quantity;

        })

        .catch((error) => {

            console.error(error);

            alert("Error loading supply.");

        });

}


// ========================================
// CLEAR FORM
// ========================================

function clearForm() {

    document.getElementById("supplyForm").reset();

    document.getElementById("supplyId").value = "";

    document.getElementById("message").innerText = "";

}


loadSupplies();