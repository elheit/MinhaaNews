//let globalData;
const OK = document.getElementsByClassName("say-ok");
// Make a GET request using the fetch function
const fetchAuto = async (fullUrl) => {
  try {
    const response = await fetch(fullUrl);

    // Parse the response as JSON
    const data = await response.json();
    // Assign the data to the global variable
    return data;

    // Handle the JSON data
    //console.log("Response data:", data.preInscriptionId);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error);
    throw error; // Re-throw the error to propagate it
  }
};

const wassitNumber = "161399039890";
const identityDocNumber = "109990572039890008";

const loginUrl = `https://ac-controle.anem.dz/AllocationChomage/api/validateCandidate/query?wassitNumber=${wassitNumber}&identityDocNumber=${identityDocNumber}`;

const data1 = await fetchAuto(loginUrl);
const preInscriptionId = data1.preInscriptionId;

const getPreinsc = `https://ac-controle.anem.dz/AllocationChomage/api/PreInscription/GetPreInscription?Id=${preInscriptionId}`;
const data2 = await fetchAuto(getPreinsc);
const id = data2.id;

const structureId = data2.structureId;
const checkRendezvous = `https://ac-controle.anem.dz/AllocationChomage/api/RendezVous/GetAvailableDates?StructureId=${structureId}&PreInscriptionId=${preInscriptionId}`;

const data3 = await fetchAuto(checkRendezvous);
const dates = data3.dates;

//send a email if get a date
const sendEmail = async() => {
  if (dates.length === 0) {
    emailjs
      .send("service_nstw22a","template_gj1kt2w")
      .then((res) => console.log("Success!" + res.status));
  } else {
    emailjs
      .send("service_nstw22a","template_h3shjkq")
      .then((res) => console.log("Success!" + res.status));
  }
};

 sendEmail();

// Call logMessage every 21600000 milliseconds (6 hours)
const intervalId = setInterval(sendEmail, 21600000);

// You can clear the interval later if needed
// clearInterval(intervalId);
