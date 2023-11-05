import ICircleProgressBarProps from './types/ICircleProgressBarProps'

export default function CircleProgressBar({ size = '64px', strokeWidth = '4px', fontSize = '0.9rem', label = '50%', value = 0.5 }: ICircleProgressBarProps) {
  return (
    <div className={ `w-[${ size }] h-[${ size }] relative` }>
      <div className={ `w-[${ size }] h-[${ size }]` }>
        <div className={ `w-[${ size }] h-[${ size }] rounded-full bg-transparent` }>
          <div className={ `w-[calc(${ size }-${strokeWidth})] h-[calc(${ size }-${strokeWidth})] flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full bg-transparent` }>
            <div className={ `text-black dark:text-white text-[${ fontSize }] bg-transparent` }>{ `${ value*100 <= 100 &&  value*100 >= 0 ?  value*100 : 'NaN' }%` || label }</div>
          </div>
        </div>
      </div>
      
      <svg className={ `z-[5] -rotate-90 w-[${ size }] h-[${ size }] absolute top-0 left-0` } xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <defs>
          <linearGradient id='gradientColor'>
            <stop offset={0} stopColor='#DA22FF' />
            <stop offset={100} stopColor='#9733EE' />
          </linearGradient>
        </defs>
        <circle className='fill-none stroke-[url(#gradientColor)]' strokeWidth={ strokeWidth } cx={ `${ Number.parseFloat(size)/2 }${ size.replace(String(Number.parseFloat(size)), '') }` } cy={ `${ Number.parseFloat(size)/2 }${ size.replace(String(Number.parseFloat(size)), '') }` } r={ `${ Number.parseFloat(size)/2 - Number.parseFloat(strokeWidth)/2 }${ size.replace(String(Number.parseFloat(size)), '') }` } strokeLinecap='round' strokeDasharray={ `${ (Number.parseFloat(size) - Number.parseFloat(strokeWidth))*Math.PI }` } strokeDashoffset={ (1-value)*(Number.parseFloat(size) - Number.parseFloat(strokeWidth))*Math.PI } />
      </svg>

      <svg className={ `z-[1] w-[${ size }] h-[${ size }] absolute top-0 left-0` } xmlns='http://www.w3.org/2000/svg' version='1.1'>
        <defs>
          <linearGradient id='gradientColorBackground'>
            <stop offset={0} stopColor='rgb(0,0,0,0.09)' />
            <stop offset={100} stopColor='rgb(0,0,0,0.09)' />
          </linearGradient>
        </defs>
        <circle className='fill-none stroke-[url(#gradientColorBackground)]' strokeWidth={ strokeWidth } cx={ `${ Number.parseFloat(size)/2 }${ size.replace(String(Number.parseFloat(size)), '') }` } cy={ `${ Number.parseFloat(size)/2 }${ size.replace(String(Number.parseFloat(size)), '') }` } r={ `${ Number.parseFloat(size)/2 - Number.parseFloat(strokeWidth)/2 }${ size.replace(String(Number.parseFloat(size)), '') }` } strokeLinecap='round' strokeDasharray={ `${ (Number.parseFloat(size) - Number.parseFloat(strokeWidth))*Math.PI }` } strokeDashoffset={ 0 } />
      </svg>
    </div>
    
  )
}