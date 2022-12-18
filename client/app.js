const patientsListing = document.querySelector(".patientrow");
const doctorListing = document.querySelector(".doctorListing");
const insuranceListing = document.querySelector(".insuranceListing");

const fullName = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const insuranceId = document.getElementById("insurance");
const doctorID = document.getElementById("doctor");
const insurance = document.getElementById("activeinsurance");

fetch("/api/patients")
  .then((res) => res.json())
  .then((data) => {
    for (patient of data) {
      console.log(data);
      const div = document.createElement("div");
      div.textContent = `${patient.name}: ${patient.phone}`;
      patientsListing.append(div);
    }
  });

fetch("/api/doctors")
  .then((res) => res.json())
  .then((data) => {
    for (doctor of data) {
      console.log(data);
      const div = document.createElement("div");
      div.textContent = `${doctor.name}: ${doctor.phone} - ${doctor.specialty}`;
      doctorListing.append(div);
    }
  });

fetch("/api/insurance")
  .then((res) => res.json())
  .then((data) => {
    for (company of data) {
      console.log(data);
      const div = document.createElement("div");
      div.textContent = `${company.name}`;
      insuranceListing.append(div);
    }
  });
//========================  New Patient form ======================
const submissionButton = document.querySelector(".submission");
const newPatient = document.getElementById("newPatient");
//displays form when newpatient button is pressed
newPatient
  .addEventListener("click", function () {
    const form = document.getElementById("newPatientForm");
    if (form.style.display === "none") {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
  })
//submits patient into database and hides new patient form
    submissionButton.addEventListener("click", function () {
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
          console.log(data);
          const div = document.createElement("div");
          div.textContent = `${patient.name}: ${patient.phone}`;
          patientsListing.append(div);
        })
        .then((data) => {
          console.log(data);
            const form = document.getElementById("newPatientForm");
              if (form.style.display === "none") {
                form.style.display = "block";
              } else {
                form.style.display = "none";
              }
        });
    })

//====================================================================