import { useRouteError } from 'react-router-dom'

interface RouteError {
  statusText: string,
  message: string
}

export default function Error() {
  const error: RouteError = useRouteError() as RouteError
  return (
    <h1>{ error.statusText} { error.message }</h1>
  )
}