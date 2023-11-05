import ISpinnerProps from './types/ISpinnerProps'

export default function Spinner({ className }: ISpinnerProps) {
  return (
    <div 
      className={
        `fixed top-0 left-0 w-[100%] h-[100%] z-[9999999] bg-[rgba(5,5,5,0.7)] overflow-hidden flex justify-center items-center ${className} `
      }
    >
      <div 
        className='first:block relative w-[64px] h-[64px] rounded-[50%] shadow-[0_3px_3px_0_rgba(255,56,106,1)] translate-x-0 translate-y-0 animate-[spin_2s_linear_infinite] 
          first:before:content-[""] first:before:absolute first:before:rounded-[50%] first:before:top-[5px] first:before:right-[5px] first:before:bottom-[5px] first:before:left-[5px] first:before:shadow-[0px_3px_3px_0px_rgb(255,228,32)] first:before:animate-[spin_3s_linear_infinite] 
          first:after:content-[""] first:after:absolute first:after:rounded-[50%] first:after:top-[15px] first:after:right-[15px] first:after:bottom-[15px] first:after:left-[15px] first:after:shadow-[0px_3px_3px_0px_rgba(61,175,255,1)] first:after:animate-[spin_1.5s_linear_infinite]'
      ></div>
    </div>
  )
}