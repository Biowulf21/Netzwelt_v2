import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContextProvider';

interface Territory {
  id: string;
  name: string;
  parent: null | number; // Assuming parent is a number type, update it accordingly if needed
};


interface HeirarchyTerritory extends Territory {
  children: HeirarchyTerritory[];
}


export default function HomePage() {
  const [territories, setTerritories] = useState<TerritoryType[]>([]);

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const logout = () => {
    console.log('in logout')
    setIsLoggedIn(false);
    console.log('after logout')
  }

  const fetchTerritories = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/places',
      });

      if (result.status === 200) {
        const territoryHeirarchy = orderData(result.data['data'], null);
        console.log(territoryHeirarchy)
        setTerritories(territoryHeirarchy);
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

  const orderData: HeirarchyTerritory[] = (territories: Territory[], parentId: null | string) => {
    const children = territories.filter((territory) => territory.parent === parentId);

    return children.map((child) => ({
      ...child,
      children: orderData(territories, child.id),
    }));
  };


  const renderTerritory = (territory: HeirarchyTerritory) => {
    return (
      <ul>
        <li key={territory.id}>
          {territory.name}
          {territory.children.length > 0 && (
            <ul>
              {territory.children.map((child) => renderTerritory(child))}
            </ul>
          )}
        </li>
      </ul>
    );
  }


  useEffect(() => {
    fetchTerritories();

    return () => { setTerritories([]) }

  }, []);

  useEffect(() => {
    console.log('in home page: ' + isLoggedIn);

  }, [isLoggedIn]);

  return (
    <>
      <div>
        <button onClick={(e) => logout()}>Log Out</button>
      </div>
      <h1>Home Page</h1>
      <div>
        {territories.map((territory) => renderTerritory(territory))}

      </div>
    </>
  );
}
