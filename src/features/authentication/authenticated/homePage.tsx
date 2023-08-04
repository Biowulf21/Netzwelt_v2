import axios from 'axios';
import React, { useState, useEffect } from 'react';

type TerritoryType = {
  id: string;
  name: string;
  parent: number; // Assuming parent is a number type, update it accordingly if needed
};

export default function HomePage() {
  const [territories, setTerritories] = useState<TerritoryType[]>([]);

  const fetchTerritories = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/places',
      });

      if (result.status === 200) {
        setTerritories(result.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error (user not found)
        alert('Error 404: User not found');
      } else if (error instanceof Error) {
        // Handle other errors
        alert('Error: ' + error.message + ' - ' + error.name);
      } else {
        // Handle other unknown errors
        alert('An unknown error occurred.');
      }
    }
  };

  useEffect(() => {
    fetchTerritories();
  }, []); // The dependency array should be []

  return (
    <div>
      <h1>Home Page</h1>
      {/* Render territories data here */}
    </div>
  );
}
