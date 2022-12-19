const patientsListing = document.querySelector(".patientListing");
const doctorListing = document.querySelector(".doctorListing");
const insuranceListing = document.querySelector(".insuranceListing");
const patientTable = document.getElementById("patientTable");




let patientList = fetch("/api/patients")
.then((res) => res.json())
.then((data) => {
  console.log(data)
  for (patient of data) {
    let count = 0
    const table = document.getElementById("patientTable");
    const row = table.insertRow(1);
      for (cells in patient){
      const cell = row.insertCell(count);
        cell.innerHTML = `${patient[cells]}`;
        count++
    // const cell1 = row.insertCell(0);
    // const cell2 = row.insertCell(1);
    // const cell3 = row.insertCell(2);
    // const cell4 = row.insertCell(3);
    // const cell5 = row.insertCell(4);
    // const cell6 = row.insertCell(5);
    // const cell7 = row.insertCell(6);
    // cell1.innerHTML = `${patient.id}`;
    // cell2.innerHTML = `${patient.name}`;
    // cell3.innerHTML = `${patient.phone}`;
    // cell4.innerHTML = `${patient.email}`;    
    // cell5.innerHTML = `${patient.insurance_id}`;
    // cell6.innerHTML = `${patient.doctor_id}`;
    // cell7.innerHTML = `${patient.insurance_active}`;
      }
    }
  });
  
let doctorList = fetch("/api/doctors")
  .then((res) => res.json())
  .then((data) => {
    for (doctor of data) {
      console.log(data);
      const div = document.createElement("div");
      div.textContent = `${doctor.name}: ${doctor.phone} - ${doctor.specialty}`;
      doctorListing.append(div);
    }
  });
  
  let insuranceList = fetch("/api/insurance")
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
  const submissionButton = document.getElementById("patientSubmission");
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
  const fullName = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const insuranceId = document.getElementById("insurance");
  const doctorID = document.getElementById("doctor");
  const insurance = document.getElementById("activeinsurance");
  
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
          for(patient of data){ //creates new div for each submission
    let count = 0
    const table = document.getElementById("patientTable");
    const row = table.insertRow(1);
      for (cells in patient){
      const cell = row.insertCell(count);
        cell.innerHTML = `${patient[cells]}`;
        count++
      }
    }
    }).then((data) => {
          console.log(data); //hides form after submit
            const form = document.getElementById("newPatientForm");
              if (form.style.display === "none") {
                form.style.display = "block";
              } else {
                form.style.display = "none";
              }
        }).then(() => {
          
        });
    })

//====================================================================

  const docsubmissionButton = document.getElementById("doctorSubmission");
  const newDoctor = document.getElementById("newDoctor");
  //displays form when newpatient button is pressed
  newDoctor.addEventListener("click", function () {
    const form = document.getElementById("newDoctorForm");
    if (form.style.display === "none") {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
  });