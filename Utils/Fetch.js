const axios = require('axios')
const { client } = require('../Model/Redis')

const CustomFetch = async (url, key) => {
    try {
        const cache = await client.get(key)

        if(cache) {
            return {
                response: JSON.parse(cache),
                stat: 201
            }
        } else {
            const {data} = await axios.get(url)
            await client.set(key, JSON.stringify(data))
            await client.expire(key, 172800)
            return {
                response: data,
                stat: 200
            }
        }

    } catch (error) {
        return {
            response: error,
            stat: 500
        }
    }
}

module.exports = {CustomFetch}