import React from "react"

import useFetch from "../../../../../hooks/useFetch"
import { fetchTypes } from "../../../../../utils/types.ts"
import LoadingComponent from "../../components/LoadingComponent.js"
import ErrorComponent from "../../components/ErrorComponent.js"

const MostRecentPhoto = () => {
  const {data, loading, error} = useFetch(fetchTypes.IMAGES)

  if (loading) {
    return (
      <LoadingComponent/>
    )
  } else if (error) {
    return (
      <ErrorComponent />
    )
  }
  else {
    return (
      <div className="photoContainer">
        <img className='photo' src={data[0]} alt='Most recent'/>
      </div>
    )
  }
}

export default MostRecentPhoto