import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function useFetch(url, query = '') {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, url]);

  return { isLoading, data };
}

// Import necessary libraries
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';

// // Custom hook for fetching data
// export default function useFetch(url, query = '') {
//   // State for holding data and loading status
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // useEffect to fetch data when the component mounts or when query or url changes
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Set loading to true before making the request
//         setIsLoading(true);

//         // Make the GET request using axios with the provided URL and query
//         const { data } = await axios.get(`${url}?${query}`);

//         // Assuming the response data is an array of hotels, update the data state
//         setData(data);

//         // Now you can filter the data to get only hotels in the Netherlands
//         const netherlandsHotels = data.filter((hotel) => hotel.country === 'Netherlands');
//         console.log('Netherlands Hotels:', netherlandsHotels);
//       } catch (err) {
//         // If there's an error, set data to an empty array and display an error toast
//         setData([]);
//         toast.error(err?.message);
//       } finally {
//         // Set loading back to false after the request is complete
//         setIsLoading(false);
//       }
//     }

//     // Call the fetchData function
//     fetchData();
//   }, [query, url]);

//   // Return loading status and data
//   return { isLoading, data };
// }
