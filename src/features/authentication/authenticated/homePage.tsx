import axios from 'axios'
import React, { useState, useEffect } from 'react'

type TerritoryType = {
  id: string,
  name: string,
  parent: 1
}

export default function HomePage() {
  const [territories, setTerritories] = useState();


  const fetchTerritories = async () => {
    try {

      const result = await axios({
        method: 'GET',
        url: 'http://localhost:3000/api/places',
      });

      if (result.status == 200) return result.data;
    } catch (error) {

    }

  }

  useEffect(() => {
    fetchTerritories()

  }, [])

  return (
    <h1>Home Page</h1>
  )
}
