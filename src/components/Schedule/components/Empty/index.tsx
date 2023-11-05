import IEmptyProps from './types/IEmptyProps'

export default function Empty({ message }: IEmptyProps) {
  return (
    <div className='w-full h-full bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 flex justify-center items-center font-bold'>
      { message }
    </div>
  )
}