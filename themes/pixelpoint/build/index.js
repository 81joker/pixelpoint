/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Search.js":
/*!*******************************!*\
  !*** ./src/modules/Search.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

class Search {
  constructor() {
    this.resultsDiv = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#input-overlay__results");
    this.openButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".input-search-trigger");
    this.searchOverlay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".input-overlay");
    this.searchField = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#form1");
    this.startDateField = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#start-date");
    this.endDateField = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#end-date");
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
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("keydown", this.keyPressDispatcher.bind(this));
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
    jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(apiUrl, function (data) {
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
          <img class="card-img-top" src="${item.image && item.image[0] && item.image[0].contentUrl ? item.image[0].contentUrl : "img/schedule/schedule-2.jpg"}" alt="Card image cap">
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
    if (e.keyCode == 83 && !this.isOverlayOpen && !jquery__WEBPACK_IMPORTED_MODULE_0___default()("input, textarea").is(":focus")) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Search */ "./src/modules/Search.js");
// import "../css/style.scss"

// Our modules / classes


// Instantiate a new object using our modules/classes
const search = new _modules_Search__WEBPACK_IMPORTED_MODULE_0__["default"]();
/******/ })()
;
//# sourceMappingURL=index.js.map