import axios from 'axios';
import React, { useState, useEffect } from 'react';

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

  const fetchTerritories = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/places',
      });

      if (result.status === 200) {
        const territoryHeirarchy = createTerritoryHeirarchy(result.data['data']);
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

  const createTerritoryHeirarchy = (dirtyTerritories: TerritoryType[]) => {
    const finalTerritoryList: CleanedTerritories[] = [];

    dirtyTerritories.forEach((territory: TerritoryType) => {
      if (territory.parent == null) {
        const temp = {
          territory: territory,
          children: [] as TerritoryType[],
        }
        const currentTerritoryChildren: TerritoryType[] = dirtyTerritories.filter((e) => e.parent == parseInt(territory.id))
        temp.children.push(...currentTerritoryChildren);
        finalTerritoryList.push(temp)

      }

    });

    console.log(finalTerritoryList)

    return finalTerritoryList;

  }

  useEffect(() => {
    fetchTerritories();
  }, []); // The dependency array should be []

  return (
    <>
      <h1>Home Page</h1>
      <div>
        {JSON.stringify(territories)}
      </div>
    </>
  );
}
