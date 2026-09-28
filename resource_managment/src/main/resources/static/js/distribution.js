const API_BASE_URL = "http://localhost:8080";

// ========================================
// CREATE DISTRIBUTION
// ========================================

const distributionForm = document.getElementById("distributionForm");

if (distributionForm) {
  distributionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const campId = document.getElementById("distributionCampId").value;

    const familyId = document.getElementById("distributionFamilyId").value;

    const supplyId = document.getElementById("distributionSupplyId").value;

    const quantity = document.getElementById("distributionQuantity").value;

    const message = document.getElementById("message");

    message.innerText = "";

    if (campId === "" || Number(campId) <= 0) {
      message.innerText = "Camp ID is required.";

      return;
    }

    if (familyId === "" || Number(familyId) <= 0) {
      message.innerText = "Family ID is required.";

      return;
    }

    if (supplyId === "" || Number(supplyId) <= 0) {
      message.innerText = "Supply ID is required.";

      return;
    }

    if (quantity === "" || Number(quantity) <= 0) {
      message.innerText = "Quantity must be greater than 0.";

      return;
    }

    const distribution = {
      campId: Number(campId),

      familyId: Number(familyId),

      supplyId: Number(supplyId),

      quantity: Number(quantity),
    };

    // Send request to Spring Boot

    fetch(`${API_BASE_URL}/distributions`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(distribution),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorMessage = await response.text();

          throw new Error(errorMessage);
        }

        return response.json();
      })

      .then((data) => {
        message.innerText = "Supply distributed successfully.";

        distributionForm.reset();

        loadDistributions();
      })

      .catch((error) => {
        message.innerText = error.message;

        console.error(error);
      });
  });
}

// ========================================
// READ ALL DISTRIBUTIONS
// ========================================

function loadDistributions() {
  const tableBody = document.getElementById("distributionTableBody");

  if (!tableBody) {
    return;
  }

  fetch(`${API_BASE_URL}/distributions`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load distributions");
      }

      return response.json();
    })

    .then((distributions) => {
      tableBody.innerHTML = "";

      distributions.forEach((distribution) => {
        const row = document.createElement("tr");

        row.innerHTML = `

                    <td>${distribution.id}</td>

                    <td>${distribution.campId}</td>

                    <td>${distribution.familyId}</td>

                    <td>${distribution.supplyId}</td>

                    <td>${distribution.quantity}</td>

                `;

        tableBody.appendChild(row);
      });
    })

    .catch((error) => {
      console.error("Error loading distributions:", error);
    });
}

// ========================================
// CLEAR FORM
// ========================================

function clearForm() {
  document.getElementById("distributionForm").reset();

  document.getElementById("message").innerText = "";
}

loadDistributions();
