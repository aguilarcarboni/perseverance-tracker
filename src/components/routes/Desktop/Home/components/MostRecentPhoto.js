import React from "react"

import useFetch from "../../../../../hooks/useFetch"
import { fetchTypes } from "../../../../../utils/types.ts"
import LoadingComponent from "../../misc/LoadingComponent.js"
import ErrorComponent from "../../misc/ErrorComponent.js"

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
      <img className='photo' src={data[0]} alt='Most recent'/>
    )
  }
}

export default MostRecentPhoto