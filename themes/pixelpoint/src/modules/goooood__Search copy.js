import $ from "jquery";

class Search {
  constructor() {
    this.resultsDiv = $("#input-overlay__results");
    this.openButton = $(".input-search-trigger");
    this.searchOverlay = $(".input-overlay");
    this.searchField = $("#form1");
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue = "";
    this.typingTimer = null;

    this.events();
  }

  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keydown", this.typingLogic.bind(this));
  }

  typingLogic() {
    clearTimeout(this.typingTimer);
    const searchValue = this.searchField.val().trim().toLowerCase();  
    if (searchValue) {
      if (!this.isSpinnerVisible) {
        this.resultsDiv.html(`<div class="spinner-border text-secondary" role="status" style="max-width:2rem"><span class="sr-only">Loading...</span></div>`);
        this.isSpinnerVisible = true;
      }
      this.typingTimer = setTimeout(() => this.getResults(searchValue), 2000);  // Pass the normalized value to getResults
    } else {
      this.resultsDiv.html("");
      this.isSpinnerVisible = false;
    }

    this.previousValue = searchValue;
  }

  getResults(searchQuery, pageSize = 30, pageNumber = 1) {
    const baseUrl = "https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2";
    const token = "9962098a5f6c6ae8d16ad5aba95afee0";

    let queryParams = `?include=image&token=${token}&page[size]=${pageSize}&page[number]=${pageNumber}`;

    if (searchQuery) {
      queryParams += `&[name]=${encodeURIComponent(searchQuery)}`;
      // queryParams += `&[name]=${encodeURIComponent(searchQuery)}`;
    }


    const apiUrl = baseUrl + decodeURI(queryParams);

    $.getJSON(apiUrl, function(data) {
      const filteredData = data["@graph"].filter(item => {
        return item.name && item.name.toLowerCase().includes(searchQuery);
      });

      const card = filteredData.map(item => `
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

      this.resultsDiv.html(card);
    }.bind(this));
  }

  keyPressDispatcher(e) {
    if (e.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(":focus")) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass("input-overlay--active");
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass("input-overlay--active");
    this.isOverlayOpen = false;
  }
}

export default Search;
