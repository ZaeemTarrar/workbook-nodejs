/**
 * Imports
 */
import { bold, red, cyan } from 'colors'
var EventEmitter: any = require('events')

try {
  /**
   * Exception Handling
   */
  if (!EventEmitter) throw new Error('Event Emitter could not be Loaded')

  /**
   * Initializing Event Emitter
   */
  var events = new EventEmitter()

  /**
   * Setting Up Event Listeners of the Project
   */
  const Listeners: Function = (): void => {
    events.on('test', (data: any) => {
      console.log('Testing ...')
    })
  }

  /**
   * Calling Listener Method
   */
  Listeners()

  /**
   * Exports
   */
  module.exports = { events }

  /**
   * Success Logs
   */
  console.log(bold(cyan('Event Emitter Initialized')))
} catch (err) {
  /**
   * Error Logs
   */
  console.log(bold(red('Event Emitter Initialization Failed')))
}
