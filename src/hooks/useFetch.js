import React, { useEffect, useState } from 'react'

const useFetch = (url, type) => {

    const [data, setData] = useState(null)
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
                            'Access-Control-Allow-Origin': '*'
                        },
                    }
                );
                console.log(response)
            } catch(e) {
                setError(true)
                console.error(e)
            } finally {
                setLoading(false)  
            }
        }
        GET()
    }, [url, type])

    return {data}
}

export default useFetch