const navMenu = [
    {
        name: "Home",
        link: "index.html",
        current: "home"
    },
    {
        name: "Mountains",
        link: "mountain.html",
        current: "mountain"
    },

    {
        name: "National Park",
        link: "nationalPark.html",
        current: "park"
    }

]



function navLink(item) {
    const link = document.createElement("a")
    link.innerHTML = item.name
    link.href = item.link
    return link
}

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav")

    navMenu.forEach((item) => nav.appendChild(navLink(item)));




    const footer = document.createElement("footer")
    footer.id = "footer"
    const year = document.createElement('span')
    year.id = 'year'

    footer.appendChild(year);

    const copyright = document.createTextNode(' \u00A9 Presented by Mohamed AL Chorbaji.')
    footer.appendChild(copyright);

    document.body.appendChild(footer);
    const currentYear = new Date().getFullYear();

    document.getElementById('year').textContent = currentYear


})