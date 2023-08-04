import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContextProvider';
import HomePageHooks from './homePageHooks';

export interface Territory {
  id: string;
  name: string;
  parent: null | number; // Assuming parent is a number type, update it accordingly if needed
}


export interface HeirarchyTerritory extends Territory {
  children: HeirarchyTerritory[];
}


export default function HomePage() {
  const [territories, setTerritories] = useState<Territory[]>([]);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const { fetchTerritories, logout, renderTerritory, orderData, isLoading } = HomePageHooks({ territories, setTerritories });

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
        <button className='btn' onClick={(e) => logout()}>Log Out</button>
      </div>
      <h1>Home Page</h1>
      <div>
        {isLoading ? <h1>LOADING</h1> : territories.map((territory) => renderTerritory(territory))}

      </div>
    </>
  );
}
