class Search {
  // ... (rest of the code)

  async getResults() {
    // Create a filter object
    const filter = {
      searchText: this.searchField.value,
      // Add other filter properties as needed (e.g., classifications, attributes, linked)
    };

    // Construct the API query using the filter object
    const queryParams = new URLSearchParams(filter);
    const apiUrl = `https://data.carinthia.com/api/v4/endpoints/557ea81f-6d65-6476-9e01-d196112514d2?${queryParams.toString()}&include=image&token=9962098a5f6c6ae8d16ad5aba95afee0`;
    console.log(apiUrl);return false;

    try {
      const response = await axios.get(apiUrl);
      const results = response.data;
      console.log(results);
      alert("hallo")
      
      // ... (rest of the code to display results)
    } catch (error) {
      console.error(error + "here errorsss");
    }
  }
}