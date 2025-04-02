 const fetchDestinationLocation = async () => {
    try {
      if (!pickup || pickup.length < 2) {
        console.error("Pickup location must be at least 2 characters.");
        return;
      }
  
      console.log("Fetching location for pickup:", pickup);
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found!");
        return;
      }
  
      const response = await axios.get('http://localhost:4000/maps/autocomplete', {
        headers: { Authorization: `Bearer ${token}` },
        params: { query: pickup }, // ✅ Change "pickup" to "query"
      });
  
      console.log( response.data);
      setDestination(response.data.suggestions);
      // console.log("Suggestions array:", suggestion);
      // console.log("Suggestions type:", Array.isArray(suggestion) ? "Array" : typeof suggestion);
      
      
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    }
  };
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (pickup.length > 1) {
        fetchDestinationLocation();
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [destinationsuggestion]);