export default function formatSecondsToTime(seconds: number) {
  const _hours = Math.floor(seconds/(60*60))
  let _minutes = Math.floor((seconds-_hours*60*60)/60)
  let _seconds = Math.floor(seconds-_hours*60*60-_minutes*60)

  _minutes = (_minutes === 60) ? 0 : _minutes
  _seconds = (_seconds === 60) ? 0 : _seconds

  if (_hours <= 0) {
    return `${_minutes < 10 ? '0' : ''}${ _minutes }:${_seconds < 10 ? '0' : ''}${ _seconds }`
  } else {
    return `${_hours < 10 ? '0' : ''}${ _hours }:${_minutes < 10 ? '0' : ''}${ _minutes }:${_seconds < 10 ? '0' : ''}${ _seconds }`
  }
}