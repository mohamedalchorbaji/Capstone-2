

document.addEventListener("DOMContentLoaded", () => {
  const mountainList = document.getElementById("mountainList");
  let content = document.createElement("div")
  content.classList.add("content");
  let heading = document.createElement("h1");

  document.body.insertBefore(heading, footer)


  document.body.insertBefore(content, footer)




  for (let i = 0; i < mountainsArray.length; i++) {
    let mountainInfo = mountainsArray[i];
    const option = document.createElement("option");
    option.innerHTML = mountainInfo.name;
    option.value = mountainInfo.name;

    mountainList.appendChild(option);
  }

  async function displayMountain(mountainInfo) {


    heading.innerHTML = mountainInfo.name;
    image.src = "images/" + mountainInfo.img;
    description.innerHTML = mountainInfo.desc;
    const sunriseAndSunsetData = await getSunriseAndSunsetForMountain(mountainInfo.coords.lat, mountainInfo.coords.lng)

    coordinates.innerHTML = `<span style="font-size: 30px"></span> Sunrise Time: ${sunriseAndSunsetData.sunrise.toLocaleString()}`;

    coordinates.innerHTML += `<span style="font-size: 30px"><br></span> Sunset Time: ${sunriseAndSunsetData.sunset.toLocaleString()}`;

    elevation.innerHTML = `<span style="font-size: 30px"></span> elevation:`+  mountainInfo.elevation;

  }

  mountainList.addEventListener("change", () => {
    content.innerHTML = "";
    heading.innerHTML = "";
    let gif2 = document.getElementById("gif2");
    gif2.style.display = "none"


    window.image = document.createElement("img");
    window.description = document.createElement("p");
    description.classList.add("description");
    window.elevation = document.createElement("p");
    window.coordinates = document.createElement("p");

    content.appendChild(image)
    content.appendChild(description)
    content.appendChild(coordinates)
    content.appendChild(elevation)


    const footer_style = document.getElementById("footer")


    let selectedList = mountainList.selectedOptions[0].value;
    for (i = 0; i < mountainsArray.length; i++) {
      
      let mountainInfo = mountainsArray[i];
      if (selectedList === mountainInfo.name) {
        displayMountain(mountainInfo);

        footer_style.style.position = "relative";
        return
      }
    }
    footer_style.style.position = "fixed";
    

  });// end of change event


});// end of content loaded

// function that can "fetch" the sunrise/sunset times
async function getSunriseAndSunsetForMountain(lat, lng) {
  let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today&formatted=0`);
  let data = await response.json();
  return {
    sunrise: new Date(data.results.sunrise),
    sunset: new Date(data.results.sunset),
  }
}
