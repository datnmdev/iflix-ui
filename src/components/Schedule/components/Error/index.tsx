import RefreshIcon from '@mui/icons-material/Refresh'

import IErrorProps from './types/IErrorProps'

export default function Error({ handleRefreshClick, message = 'Đã có lỗi xảy ra...' }: IErrorProps) {
  return (
    <div className='transition ease-linear duration-500 w-full h-full flex justify-center items-center text-stone-950 dark:text-white text-center'>
      <div>
        <p className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-bold'>{ message }</p>
        <button 
          className='group/refresh transition opacity-60 hover:opacity-100 hover:text-red-500 hover:[text-shadow:2px_2px_4px_rgb(239,68,68)] duration-200 -translate-x-1.5'
          onClick={handleRefreshClick}
        >
          <RefreshIcon className='mr-0.5 rotate-0' />
          Thử lại
        </button>
      </div>
    </div>
  )
}