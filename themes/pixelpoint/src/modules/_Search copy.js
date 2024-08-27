import axios from "axios"

class Search {
  // 1. describe and create/initiate our object
  constructor() {
    this.loadData()
    // this.getResults()
    this.addSearchHTML()
    this.resultsDiv = document.querySelector("#search-overlay__results")
    this.openButton = document.querySelectorAll(".js-search-trigger-input")
    // this.openButton = document.querySelectorAll(".js-search-trigger")
    this.closeButton = document.querySelector(".search-overlay__close")
    this.searchOverlay = document.querySelector(".search-overlay")
    this.searchField = document.querySelector("#search-term")
    this.isOverlayOpen = false
    this.isSpinnerVisible = false
    this.previousValue
    this.typingTimer
    this.events()
  }
  loadData() {
    this.getResults();
    document.getElementById("load-more").addEventListener("click", function () {
      pageNumber++;
    }.bind(this));
}

  // 2. events
  events() {
    this.openButton.forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault()
        this.openOverlay()
        this.loadData()
      })
    })

    this.closeButton.addEventListener("click", () => this.closeOverlay())
    document.addEventListener("keydown", e => this.keyPressDispatcher(e))
    this.searchField.addEventListener("keyup", () => this.typingLogic())
  }

  // 3. methods (function, action...)
  typingLogic() {
    if (this.searchField.value != this.previousValue) {
      clearTimeout(this.typingTimer)

      if (this.searchField.value) {
        if (!this.isSpinnerVisible) {
          // this.resultsDiv.innerHTML = '<div class="spinner-loader"></div>'
          this.isSpinnerVisible = true
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750)
      } else {
        this.resultsDiv.innerHTML = ""
        this.isSpinnerVisible = false
      }
    }

    this.previousValue = this.searchField.value
  }

  async getResults() {
    // const apiUrl = "https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?token=9962098a5f6c6ae8d16ad5aba95afee0";
    const apiUrl =
    "https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0";
    let pageSize = 4;
    let pageNumber = 1;
    try {
      document.getElementById("spinner-container").style.display = "block";
      const response = await axios.get("https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0")
      // const response = await axios.get(universityData.root_url + "/wp-json/pixelpoint/v1/search?term=" + this.searchField.value)
      const results = response.data

      const responseCount = await fetch(
        `${apiUrl}&page[size]=${pageSize}&page[number]=${pageNumber}`
    );
    console.log(pageNumber);
    const data = await responseCount.json();
    
      if (pageNumber >= data.meta.pages) {
          document.getElementById("load-more").style.display = "none";
      }
      const card = `${results["@graph"].map(item =>`<div class="card" style="width: 18rem;">
      <img class="col card-img-top" src="${item.image
                ? item.image[0].contentUrl
                : "img/schedule/schedule-2.jpg"
            }" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">
        ${item.description.substring(0,100)}
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>`).join("")}`
      // return false;
      // const items = results["@graph"]
      // items.forEach(item => {
      //   console.log(item.name);
        
      // });
      this.resultsDiv.innerHTML = card
      /*
      this.resultsDiv.innerHTML = `
        <div class="row">
          <div class="one-third">
          //   <h2 class="search-overlay__section-title">General Information</h2>
          //   ${results.generalInfo.length ? '<ul class="link-list min-list">' : "<p>No general information matches that search.</p>"}
          //     ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType == "post" ? `by ${item.authorName}` : ""}</li>`).join("")}
          //   ${results.generalInfo.length ? "</ul>" : ""}
          // </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Programs</h2>
            ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
              ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
            ${results.programs.length ? "</ul>" : ""}

            

          </div>
          <div class="one-third">
            <h2 class="search-overlay__section-title">Campuses</h2>
            ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
              ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
            ${results.campuses.length ? "</ul>" : ""}

            <h2 class="search-overlay__section-title">Events</h2>
            ${results.events.length ? "" : `<p>No events match that search. <a href="${universityData.root_url}/events">View all events</a></p>`}
              ${results.events
                .map(
                  item => `
                <div class="event-summary">
                  <a class="event-summary__date t-center" href="${item.permalink}">
                    <span class="event-summary__month">${item.month}</span>
                    <span class="event-summary__day">${item.day}</span>  
                  </a>
                  <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                    <p>${item.description} <a href="${item.permalink}" class="nu gray">Learn more</a></p>
                  </div>
                </div>
              `
                )
                .join("")}

          </div>
        </div>
      `*/
      this.isSpinnerVisible = false

    } catch (error) {
      console.error("Error loading data:", error);
  } finally {
      document.getElementById("spinner-container").style.display = "none";
  }
  
  }


  keyPressDispatcher(e) {
    if (e.keyCode == 83 && !this.isOverlayOpen && document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA") {
      this.openOverlay()
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay()
    }
  }

  openOverlay() {
    this.searchOverlay.classList.add("search-overlay--active")
    document.body.classList.add("body-no-scroll")
    this.searchField.value = ""
    setTimeout(() => this.searchField.focus(), 301)
    console.log("our open method just ran!")
    this.isOverlayOpen = true
    return false
  }

  closeOverlay() {
    this.searchOverlay.classList.remove("search-overlay--active")
    document.body.classList.remove("body-no-scroll")
    console.log("our close method just ran!")
    this.isOverlayOpen = false
  }

  addSearchHTML() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
    `
    )
  }
}

export default Search
