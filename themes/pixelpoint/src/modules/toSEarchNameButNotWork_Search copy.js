import $ from "jquery"

class Search {
  // 1. describe and create/initiate our object
  constructor() {
    this.resultsDiv = $("#input-overlay__results")
    this.openButton = $(".input-search-trigger")
    this.searchOverlay = $(".input-overlay")
    this.searchField = $("#form1")

    // this.openButton = $(".js-search-trigger")
    // this.closeButton = $(".search-overlay__close")
    //  this.searchOverlay = $(".search-overlay")
     this.isOverlayOpen = false
     this.events()
     this.isSpinnerVisible = false
     this.previousValue
     this.typingTimer
  }

  // 2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this))
    // this.closeButton.on("click", this.closeOverlay.bind(this))
     $(document).on("keydown", this.keyPressDispatcher.bind(this))
     this.searchField.on("keydown", this.typingLogic.bind(this))
    //  this.searchField.on("keyup", this.typingLogic.bind(this))
  }

  // 3. methods (function, action...)
  typingLogic() {
    // if (this.searchField.val() != this.previousValue) {

    clearTimeout(this.typingTimer)
    if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
        this.resultsDiv.html(`<div class="spinner-border text-secondary" role="status"><span class="sr-only">Loading...</span></div>`)
        this.isSpinnerVisible = true
        }
        this.typingTimer = setTimeout(this.getResults().bind(this), 2000)
      } else {
        this.resultsDiv.html("")
        this.isSpinnerVisible = false
      }
    // }

    this.previousValue = this.searchField.val()
  }


   getResults(pageSize = 4, pageNumber = 1, filters = {}) {
    // https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?include=image&token=9962098a5f6c6ae8d16ad5aba95afee0
    const baseUrl = "https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2";
    const token   = "9962098a5f6c6ae8d16ad5aba95afee0";


    // Build the query parameters
    let queryParams = `?include=image&token=${token}&page[size]=${pageSize}&page[number]=${pageNumber}`;
    
    
    // Add filters to the query parameters
    // for (const [key, value] of Object.entries(filters)) {
    //   queryParams += `&${key}=${encodeURIComponent(value)}`;
    // }
    
    const apiUrl = baseUrl + queryParams;
    
    $.getJSON(apiUrl, function(data) {
      
      // <h2 class="text-danger">${item["dc:classification"][1]["@type"]}</h2>
      const card = data["@graph"].map(item => `
            <div class="card" style="width: 18rem; margin: 10px;">
              <img class="col card-img-top" src="${item.image && item.image[0] && item.image[0].contentUrl
                    ? item.image[0].contentUrl
                    : "img/schedule/schedule-2.jpg"
                }" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">
                  ${item.description ? item.description.substring(0, 100) : ""}
                </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
        `).join("");

        // Display the cards in the resultsDiv
        this.resultsDiv.html(card);
    }.bind(this));
}


  keyPressDispatcher(e) { 

    if (e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(":focus")) {
      this.openOverlay()
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay()
    }
  }

  openOverlay() {    
    this.searchOverlay.addClass("input-overlay--active")
    // $("body").addClass("body-no-scroll")
    // console.log("our open method just ran")
    this.isOverlayOpen = true
    
  }

  closeOverlay() {
    this.searchOverlay.removeClass("input-overlay--active")
    // this.searchOverlay.removeClass("search-overlay--active")
    // $("body").removeClass("body-no-scroll")
     console.log("our close method just ran")
     this.isOverlayOpen = false

  }
}

export default Search