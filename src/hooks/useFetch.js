import { useEffect, useState } from 'react'

import { fetchTypes } from '../utils/types.ts'

const useFetch = (type) => {

    const url = process.env.REACT_APP_FETCH_URL

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
     
    useEffect(() => {
        async function GET() {
            try {
                setLoading(true)
                const response = await fetch(`${url}`,
                    {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            'Access-Control-Allow-Origin': `http://localhost:3000`
                        },
                    }
                );
                const data = await response.json();
                setData(type === fetchTypes.COORDS ? data.coords:data.images)
            } catch(e) {
                setError(true)
                console.error(e)
            } finally {
                setLoading(false)  
            }
        }
        GET()
    }, [url, type])

    return {data, loading, error}
}

export default useFetch

export const dynamic = "force-dynamic"