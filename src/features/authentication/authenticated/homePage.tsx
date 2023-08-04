import axios from 'axios'
import React, { useState, useEffect } from 'react'

type TerritoryType = {
  id: string,
  name: string,
  parent: 1
}

export default function HomePage() {
  const [territories, setTerritories] = useState();
  return (
    <h1>Home Page</h1>
  )
}
