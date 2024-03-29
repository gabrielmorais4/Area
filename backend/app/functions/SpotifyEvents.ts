import axios from 'axios'
import Database from '@ioc:Adonis/Lucid/Database'
import { APIEventField } from 'types/events'

export const pauseSong = async (responseApiUuid: string) => {
  try {
    const spotifyOAuth = await Database.query()
      .from('oauths')
      .where('uuid', responseApiUuid)
      .first()
    const bearer = `Bearer ${spotifyOAuth.token}`
    const options = {
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/pause',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/8.4.5',
        'Authorization': bearer,
      },
    }
    await axios.request(options)
  } catch (error) {
    console.log('Error on sending msg : ' + error)
  }
}

export const playSong = async (responseApiUuid: string) => {
  try {
    const spotifyOAuth = await Database.query()
      .from('oauths')
      .where('uuid', responseApiUuid)
      .first()
    const bearer = `Bearer ${spotifyOAuth.token}`
    const options = {
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/8.4.5',
        'Authorization': bearer,
      },
    }
    await axios.request(options)
  } catch (error) {
    console.log('Error on sending msg : ' + error)
  }
}

export const skipToNextSong = async (responseApiUuid: string) => {
  try {
    const spotifyOAuth = await Database.query()
      .from('oauths')
      .where('uuid', responseApiUuid)
      .first()
    const bearer = `Bearer ${spotifyOAuth.token}`
    const options = {
      method: 'POST',
      url: 'https://api.spotify.com/v1/me/player/next',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/8.4.5',
        'Authorization': bearer,
      },
    }
    await axios.request(options)
  } catch (error) {
    console.log('Error on sending msg : ' + error)
  }
}

export const skipToPreviousSong = async (responseApiUuid: string) => {
  try {
    const spotifyOAuth = await Database.query()
      .from('oauths')
      .where('uuid', responseApiUuid)
      .first()
    const bearer = `Bearer ${spotifyOAuth.token}`
    const options = {
      method: 'POST',
      url: 'https://api.spotify.com/v1/me/player/previous',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/8.4.5',
        'Authorization': bearer,
      },
    }
    await axios.request(options)
  } catch (error) {
    console.log('Error on sending msg : ' + error)
  }
}

export const repeatSong = async (responseApiUuid: string) => {
  try {
    const spotifyOAuth = await Database.query()
      .from('oauths')
      .where('uuid', responseApiUuid)
      .first()
    const bearer = `Bearer ${spotifyOAuth.token}`
    const options = {
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/repeat?state=track',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/8.4.5',
        'Authorization': bearer,
      },
    }
    await axios.request(options)
  } catch (error) {
    console.log('Error on sending msg : ' + error)
  }
}

export const setPlaybackVolume = async (data: APIEventField<any>[], responseApiUuid: string) => {
  try {
    const spotifyOAuth = await Database.query()
      .from('oauths')
      .where('uuid', responseApiUuid)
      .first()
    const bearer = `Bearer ${spotifyOAuth.token}`
    const options = {
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/volume?volume_percent=' + data.at(0)?.value,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/8.4.5',
        'Authorization': bearer,
      },
    }
    await axios.request(options)
  } catch (error) {
    console.log('Error on sending msg : ' + error)
  }
}

export const toggleShuffle = async (data: APIEventField<any>[], responseApiUuid: string) => {
  try {
    const spotifyOAuth = await Database.query()
      .from('oauths')
      .where('uuid', responseApiUuid)
      .first()
    const bearer = `Bearer ${spotifyOAuth.token}`
    const value = data.at(0)?.value === 'on' ? 'true' : 'false'
    const options = {
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/shuffle?state=' + value,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'insomnia/8.4.5',
        'Authorization': bearer,
      },
    }
    await axios.request(options)
  } catch (error) {
    console.log('Error on sending msg : ' + error)
  }
}
