import config from './config'
import io from 'socket.io-client'

//style css PropagateLoader spinners
export const overrideStyle = {
  display: 'flex',
  margin: '0 auto',
  height: '16px',
  justifyContent: 'center',
  alignItems: 'center'
}

export const overrideStyleClipLoader = {
  display: 'flex',
  margin: '0 auto',
  width: '16px',
  justifyContent: 'center',
  alignItems: 'center'
}

// connect socket backend expressjs
export const socket = io(`${config.API_URL}`)
