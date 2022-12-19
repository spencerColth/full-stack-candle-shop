const patientsListing = document.querySelector(".patientListing");
const doctorListing = document.querySelector(".doctorListing");
const insuranceListing = document.querySelector(".insuranceListing");
const patientTable = document.getElementById("patientTable");

let patientList = function () {
  fetch("/api/patients")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (patient of data) {
        let count = 0;
        const table = document.getElementById("patientTable");
        const row = table.insertRow(1);
        for (cells in patient) {
          const cell = row.insertCell(count);
          cell.innerHTML = `${patient[cells]}`;
          count++;
        }
      }
    });
};

patientList();

//========================  New Patient form ======================

const submissionButton = document.getElementById("patientSubmission");
const newPatient = document.getElementById("newPatient");
//displays new patient information entry form
newPatient.addEventListener("click", function () {
  const form = document.getElementById("newPatientForm");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
  const updatePatient = document.getElementById("updatePatientForm");
  if (updatePatient.style.display === "block") {
    updatePatient.style.display = "none";
  } else {
    updatePatient.style.display = "none";
  }

  const deletePatient = document.getElementById("deletePatient");
  if (deletePatient.style.display === "block") {
    deletePatient.style.display = "none";
  } else {
    deletePatient.style.display = "none";
  }

});
//submits patient into database and hides new patient form

submissionButton.addEventListener("click", function () {
  const fullName = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const insuranceId = document.getElementById("insurance");
  const doctorID = document.getElementById("doctor");
  const insurance = document.getElementById("activeinsurance");

  let patientInfo = JSON.stringify({
    name: fullName.value,
    phone: parseInt(phone.value),
    email: email.value,
    insurance_id: parseInt(insuranceId.value),
    doctor_id: parseInt(doctorID.value),
    insurance_active: insurance.value,
  });

  fetch("/api/patients", {
    method: "POST",
    body: patientInfo,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); //creates new div for each submission
      let count = 0;
      const table = document.getElementById("patientTable");
      const row = table.insertRow(1);
      for (cells in data) {
        const cell = row.insertCell(count);
        cell.innerHTML = `${patient[cells]}`;
        count++;
      }
    })
    .then((data) => {
      console.log(data); //hides form after submit
      const form = document.getElementById("newPatientForm");
      if (form.style.display === "none") {
        form.style.display = "block";
      } else {
        form.style.display = "none";
      }
    })
    .then(() => {
      $("#patientTable tr").remove(); //removes table that hasnt been updated
    })
    .then(() => {
      patientList(); //pulls updated table from DBL to increment ID
    });
});
//====================Update PAtient Form==========================

//displays update information entry form
const updatePatient = document.querySelector("#update");
updatePatient.addEventListener("click", function () {
  const updatePatient = document.getElementById("updatePatientForm");
  if (updatePatient.style.display === "none") {
    updatePatient.style.display = "block";
  } else {
    updatePatient.style.display = "none";
  }
  
  const newPatient = document.getElementById("newPatientForm");
  if (newPatient.style.display === "block") {
    newPatient.style.display = "none";
  } else {
    newPatient.style.display = "none";
  }

   const deletePatient = document.getElementById("deletePatient");
  if (deletePatient.style.display === "block") {
    deletePatient.style.display = "none";
  } else {
    deletePatient.style.display = "none";
  }


});
const updateButton = document.getElementById("updatePatient");
//adds functionality to update button
updateButton.addEventListener("click", function () {
  const patchId = document.getElementById("id");
  const newName = document.getElementById("newname");
  const newPhone = document.getElementById("newphone");
  const newEmail = document.getElementById("newemail");
  const newInsurance = document.getElementById("newinsurance");
  const newDoctor = document.getElementById("newdoctor");
  const insuranceActive = document.getElementById("insuranceactive");

  let id = parseInt(patchId.value);

  let patientInfo = JSON.stringify({
    name: newName.value,
    phone: parseInt(newPhone.value),
    email: newEmail.value,
    insurance_id: parseInt(newInsurance.value),
    doctor_id: parseInt(newDoctor.value),
    insurance_active: insuranceActive.value,
  });

  fetch(`/api/patients/${id}`, {
    method: "PATCH",
    body: patientInfo,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let count = 0;
      const table = document.getElementById("patientTable");
      const row = table.insertRow(1);
      for (cells in data) {
        const cell = row.insertCell(count);
        cell.innerHTML = `${patient[cells]}`;
        count++;
      }
    })
    .then((data) => {
      console.log(data); //hides form after submit
      const form = document.getElementById("updatePatientForm");
      if (form.style.display === "none") {
        form.style.display = "block";
      } else {
        form.style.display = "none";
      }
    })
    .then(() => {
      $("#patientTable tr").remove(); //removes table that hasnt been updated
    })
    .then(() => {
      patientList(); //pulls updated table from DBL to increment ID
    });
});

//=====================Delete Patient by ID ======================
//displays delete patient form
const deletePatient = document.getElementById('deleteButton')

deletePatient.addEventListener("click", function () {
  const deletePatient = document.getElementById("deletePatient");
  if (deletePatient.style.display === "none") {
    deletePatient.style.display = "block";
  } else {
    deletePatient.style.display = "none";
  }
  const newPatient = document.getElementById("newPatientForm");
  if (newPatient.style.display === "block") {
    newPatient.style.display = "none";
  } else {
    newPatient.style.display = "none";
  }
  const updatePatient = document.getElementById("updatePatientForm");
  if (updatePatient.style.display === "block") {
    updatePatient.style.display = "none";
  } else {
    updatePatient.style.display = "none";
  }
});

//adds functionality to delete button
const deleteButton = document.getElementById('deleteEntry');
deleteButton.addEventListener("Click", () => {
  const deleteID = document.getElementById('delete');
  let id = parseInt(deleteID.value);

  fetch(`/api/patients/${id}`, {
    method: 'DELETE'
  }).then(() => {
      $("#patientTable tr").remove(); //removes table that hasnt been updated
    })
    .then(() => {
      patientList(); //pulls updated table from DBL to increment ID
    });
});