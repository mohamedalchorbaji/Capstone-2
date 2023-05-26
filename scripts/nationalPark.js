document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const searchOptions = document.getElementById("searchOptions");
  const locationList = document.getElementById("locationList");
  const parkList = document.getElementById("parkList");
  
  const tbody = document.querySelector("#list tbody");

  for (let i = 0; i < locationsArray.length; i++) {
    let location = locationsArray[i];
    const option = document.createElement("option");
    option.innerHTML = location;
    option.value = location.toLowerCase();

    locationList.appendChild(option);
  }

  for (let i = 0; i < parkTypesArray.length; i++) {
    let park = parkTypesArray[i];
    const option = document.createElement("option");
    option.innerHTML = park;
    option.value = park.toLowerCase();

    parkList.appendChild(option);
  }

  function parkDescription(nationalParksArray) {
    let row = tbody.insertRow(-1);


    let cellLocation = row.insertCell(0);
    cellLocation.innerHTML = nationalParksArray.LocationName;

    let cellAddress = row.insertCell(1);
    cellAddress.innerHTML = `
    ${nationalParksArray.Address}<br>
    ${nationalParksArray.City} ${nationalParksArray.State}-${nationalParksArray.ZipCode}
    `;

    let cellLink = row.insertCell(2);
    if (nationalParksArray.Visit != undefined) {
      const link = document.createElement("a");
      link.target = '_blank'
      link.innerHTML = "Visit";
      link.href = nationalParksArray.Visit;
      cellLink.appendChild(link);
    } 

    let contactInfo = row.insertCell(3);
    contactInfo.innerHTML = `
    Phone no:<input type="tel" value="${nationalParksArray.Phone}" readonly><br>
    Fax: ${nationalParksArray.Fax}
    `;
  }
  function filterParks() {
    tbody.innerHTML = "";
    let selectedList = locationList.selectedOptions[0].value;
    let selectedParkList = parkList.selectedOptions[0].value;
    let parks = nationalParksArray
    if (selectedList !== "any" && selectedParkList !== "any"){ 
        parks = nationalParksArray.filter(
            (park) => park.State.toLowerCase() === selectedList.toLowerCase() && park.LocationName.toLowerCase().indexOf(selectedParkList.toLowerCase()) != -1
          );
    }
    else if(selectedParkList !== "any"){
        parks = nationalParksArray.filter(
            (park) => park.LocationName.toLowerCase().indexOf(selectedParkList.toLowerCase()) != -1
          );

    }
    else if (selectedList !== "any"){
        parks = nationalParksArray.filter(
            (park) => park.State.toLowerCase() === selectedList.toLowerCase()
          );
    
    }

    

    parks.forEach((park) => parkDescription(park));

    
  }
  function filterByFunction(searchValue){
    tbody.innerHTML = "";
       let parks = nationalParksArray.filter(
            (park) => {
                 let all = JSON.stringify(park).toLowerCase();
                 console.log(all);
                 return all.includes(searchValue.toLowerCase())

            }
                        
          );
    
   
    

    parks.forEach((park) => parkDescription(park));

    
  
  }


  function search(){
    tbody.innerHTML="";
    filterByFunction(searchBox.value)
    
  }
  

  locationList.addEventListener("change", filterParks)
  parkList.addEventListener("change", filterParks)
  searchBox.addEventListener("input", search)

  filterParks();











});
