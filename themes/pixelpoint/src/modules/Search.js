import $ from "jquery";

class Search {
  constructor() {
    this.resultsDiv = $("#input-overlay__results");
    this.openButton = $(".input-search-trigger");
    this.searchOverlay = $(".input-overlay");
    this.searchField = $("#form1");
    this.startDateField = $("#start-date");
    this.endDateField = $("#end-date");
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue = "";
    this.typingTimer = null;

    // Load all data initially
    this.getResults(); 

    this.events();
  }

  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keydown", this.typingLogic.bind(this));
    this.startDateField.on("change", this.typingLogic.bind(this));
    this.endDateField.on("change", this.typingLogic.bind(this));
  }

  typingLogic() {
    clearTimeout(this.typingTimer);
    const searchValue = this.searchField.val().trim().toLowerCase();
    const startDate = this.startDateField.val();
    const endDate = this.endDateField.val();

    if (searchValue || startDate || endDate) {
      if (!this.isSpinnerVisible) {
        this.resultsDiv.html(`<div class="spinner-border text-secondary" role="status" style="max-width:2rem"><span class="sr-only">Loading...</span></div>`);
        this.isSpinnerVisible = true;
      }
      this.typingTimer = setTimeout(() => this.getResults(searchValue, startDate, endDate), 2000);
    } else {
      // If search field is cleared, display all data again
      this.getResults();  
    }

    this.previousValue = searchValue;
  }

  getResults(searchQuery = "", startDate = "", endDate = "", pageSize = 8, pageNumber = 1) {
    const baseUrl = "https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2";
    const token = "9962098a5f6c6ae8d16ad5aba95afee0";

    let queryParams = `?include=image&token=${token}&page[size]=${pageSize}&page[number]=${pageNumber}`;

    if (searchQuery) {
      queryParams += `&search=${encodeURIComponent(searchQuery)}`; 
    }

    const apiUrl = baseUrl + decodeURI(queryParams);

    $.getJSON(apiUrl, function(data) {
      const filteredData = data["@graph"].filter(item => {
        let matchesSearch = searchQuery ? item.name && item.name.toLowerCase().includes(searchQuery) : true;
        let matchesDateRange = true;

        if (startDate || endDate) {
          const itemStartDate = new Date(item.startDate);
          const itemEndDate = item.endDate ? new Date(item.endDate) : itemStartDate;

          if (startDate) {
            matchesDateRange = matchesDateRange && itemEndDate >= new Date(startDate);
          }
          if (endDate) {
            matchesDateRange = matchesDateRange && itemStartDate <= new Date(endDate);
          }
        }

        return matchesSearch && matchesDateRange;
      });

      const card = filteredData.map(item => `
        <div class="col">
        <div class="card" style="width: 18rem; margin: 3px;">
          <img class="card-img-top" src="${item.image && item.image[0] && item.image[0].contentUrl
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
        </div>
      `).join("");

      this.resultsDiv.html(card);
      this.isSpinnerVisible = false;
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
