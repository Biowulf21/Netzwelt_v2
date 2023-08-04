import React, { useState } from "react";
import { Territory, HeirarchyTerritory } from "./homePage";
import axios from "axios";
import { useAuth } from "../../contexts/authContextProvider";

interface IHomePageHooksProps {
  setTerritories: React.Dispatch<React.SetStateAction<Territory[]>>
  terrutores: Territory[]
}

export default function HomePageHooks(props: IHomePageHooksProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const logout = () => {
    console.log('in logout')
    setIsLoggedIn(false);
    console.log('after logout')
  }

  const fetchTerritories = async () => {
    try {
      setIsLoading(true)
      const result = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/places',
      });

      if (result.status === 200) {
        const territoryHeirarchy = orderData(result.data['data'], null);
        console.log(territoryHeirarchy)
        setIsLoading(false)
        props.setTerritories(territoryHeirarchy);
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

  return { fetchTerritories, logout, renderTerritory, orderData, isLoading }

}
