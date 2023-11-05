import { useEffect, useRef, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import SettingsIcon from '@mui/icons-material/Settings'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import ReplayIcon from '@mui/icons-material/Replay'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import IPlayerProps from './types/IPlayerProps'
import PlayerState from './enums/PlayerState'
import formatSecondsToTime from '../../utils/dateTime/formatSecondsToTime'

export default function Player({ src, _ref }: IPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timeOutRef = useRef<number | null>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const timeProgressRef = useRef<HTMLDivElement>(null)
  const mouseOverProgressRef = useRef<HTMLDivElement>(null)
  const isMouseDownProgressRef = useRef(false)
  const volumeBarRef = useRef<HTMLDivElement>(null)
  const volumeProgressRef = useRef<HTMLDivElement>(null)
  const isMouseDownVolumeBarRef = useRef(false)
  const totalTimeRef = useRef<HTMLSpanElement>(null)
  const nowRef = useRef<HTMLSpanElement>(null)
  const [ playerState, setPlayerState ] = useState(PlayerState.PAUSING)
  const [ isFullScreenMode, setFullScreenMode ] = useState(false)

  useEffect(() => {
    function handleTimeUpdate() {
      if (videoRef.current && timeProgressRef.current && controlsRef.current && nowRef.current) {
        if (videoRef.current.ended) {
          controlsRef.current.classList.remove('hidden')
          setPlayerState(PlayerState.ENDED)
        }

        const totalTime = videoRef.current.duration
        const currentTime = videoRef.current.currentTime

        timeProgressRef.current.style.width = `${currentTime / totalTime * 100}%`
        nowRef.current.innerHTML = formatSecondsToTime(currentTime)
      }
    }
  
    function handlePickTimeProgress(e: MouseEvent) {
      const progressWidth = progressRef.current!.clientWidth
      const xCoordinate = e.clientX - progressRef.current!.getBoundingClientRect().left - progressRef.current!.clientLeft
  
      timeProgressRef.current!.style.width = `${xCoordinate / progressWidth * 100}%`
      videoRef.current!.currentTime = xCoordinate / progressWidth * videoRef.current!.duration

      if (playerState === PlayerState.PLAYING || playerState === PlayerState.ENDED) {
        videoRef.current!.play()
        setPlayerState(PlayerState.PLAYING)
      } else {
        videoRef.current!.pause()
      }
    }

    function handlePickVolumeBar(e: MouseEvent) {
      const volumeProgressWidth = volumeBarRef.current!.clientWidth
      const xCoordinate = e.clientX - volumeBarRef.current!.getBoundingClientRect().left - volumeBarRef.current!.clientLeft
  
      volumeProgressRef.current!.style.width = `${ xCoordinate / volumeProgressWidth <= 1 && xCoordinate / volumeProgressWidth >= 0 ? xCoordinate / volumeProgressWidth * 100 : xCoordinate / volumeProgressWidth > 1 ? 100 : 0 }%`
      videoRef.current!.volume = xCoordinate / volumeProgressWidth <= 1 && xCoordinate / volumeProgressWidth >= 0 ? xCoordinate / volumeProgressWidth : xCoordinate / volumeProgressWidth > 1 ? 1 : 0
    }

    function handleMouseDownProgress() {
      window.addEventListener('mousemove', handleMouseMoveProgress)
      window.addEventListener('mouseup', handleMouseUpProgress)
      isMouseDownProgressRef.current = true
    }
  
    function handleMouseMoveProgress(e: MouseEvent) {
      if (isMouseDownProgressRef.current) {
        const progressWidth = progressRef.current!.clientWidth
        const xCoordinate = e.clientX - progressRef.current!.getBoundingClientRect().left - progressRef.current!.clientLeft

        videoRef.current!.removeEventListener('timeupdate', handleTimeUpdate)
        timeProgressRef.current!.style.width = `${ xCoordinate / progressWidth >= 0 && xCoordinate / progressWidth <= 1 ? xCoordinate / progressWidth * 100 : xCoordinate / progressWidth > 1 ? 100 : 0 }%`
      }
    }
  
    function handleMouseUpProgress(e: MouseEvent) {
      window.addEventListener('mousemove', handleMouseMoveProgress)
      window.addEventListener('mouseup', handleMouseUpProgress)

      if (isMouseDownProgressRef.current) {
        const progressWidth = progressRef.current!.clientWidth
        const xCoordinate = e.clientX - progressRef.current!.getBoundingClientRect().left - progressRef.current!.clientLeft
    
        timeProgressRef.current!.style.width = `${ xCoordinate / progressWidth >= 0 && xCoordinate / progressWidth <= 1 ? xCoordinate / progressWidth * 100 : xCoordinate / progressWidth > 1 ? 100 : 0 }%`
        videoRef.current!.currentTime = xCoordinate / progressWidth * videoRef.current!.duration
        videoRef.current!.addEventListener('timeupdate', handleTimeUpdate)
      }

      isMouseDownProgressRef.current = false
    }
  
    function handleMouseLeaveProgress() {
      mouseOverProgressRef.current!.style.width = '0px'
    }

    function handleMouseDownVolumeBar() {
      window.addEventListener('mousemove', handleMouseMoveVolumeBar)
      window.addEventListener('mouseup', handleMouseUpVolumeBar)
      isMouseDownVolumeBarRef.current = true
    }
  
    function handleMouseMoveVolumeBar(e: MouseEvent) {
      if (isMouseDownVolumeBarRef.current) {
        const volumeBarWidth = volumeBarRef.current!.clientWidth
        const xCoordinate = e.clientX - volumeBarRef.current!.getBoundingClientRect().left - volumeBarRef.current!.clientLeft

        volumeProgressRef.current!.style.width = `${ xCoordinate / volumeBarWidth <= 1 && xCoordinate / volumeBarWidth >= 0 ? xCoordinate / volumeBarWidth * 100 : xCoordinate / volumeBarWidth > 1 ? 100 : 0 }%`
      }
    }
  
    function handleMouseUpVolumeBar(e: MouseEvent) {
      window.removeEventListener('mousemove', handleMouseMoveVolumeBar)
      window.removeEventListener('mouseup', handleMouseUpVolumeBar)

      if (isMouseDownVolumeBarRef.current) {
        const volumeBarWidth = volumeBarRef.current!.clientWidth
        const xCoordinate = e.clientX - volumeBarRef.current!.getBoundingClientRect().left - volumeBarRef.current!.clientLeft
    
        volumeProgressRef.current!.style.width = `${ xCoordinate / volumeBarWidth <= 1 && xCoordinate / volumeBarWidth >= 0 ? xCoordinate / volumeBarWidth * 100 : xCoordinate / volumeBarWidth > 1 ? 100 : 0 }%`
        videoRef.current!.volume = xCoordinate / volumeBarWidth <= 1 && xCoordinate / volumeBarWidth >= 0 ? xCoordinate / volumeBarWidth : xCoordinate / volumeBarWidth > 1 ? 1 : 0
      }

      isMouseDownVolumeBarRef.current = false
    }

    if (playerState === PlayerState.PLAYING) {
      videoRef.current!.play()
    } else {
      videoRef.current!.pause()
    }

    volumeProgressRef.current!.style.width = `${videoRef.current!.volume * 100}%`
    volumeBarRef.current!.addEventListener('click', handlePickVolumeBar)

    videoRef.current!.addEventListener('timeupdate', handleTimeUpdate)

    progressRef.current!.addEventListener('click', handlePickTimeProgress)
    progressRef.current!.addEventListener('mousemove', (e) => {
      const progressWidth = progressRef.current!.clientWidth
      const xCoordinate = e.clientX - progressRef.current!.getBoundingClientRect().left - progressRef.current!.clientLeft
      mouseOverProgressRef.current!.style.width = `${xCoordinate / progressWidth * 100}%`
    })
    progressRef.current!.addEventListener('mouseleave', handleMouseLeaveProgress)
    progressRef.current!.addEventListener('mousedown', handleMouseDownProgress)
    

    volumeBarRef.current!.addEventListener('mousedown', handleMouseDownVolumeBar)

    if (_ref) {
      _ref.current = playerRef.current
    }

  }, [playerState, _ref])

  function handleMetadataChange() {
    totalTimeRef.current!.innerHTML = formatSecondsToTime(videoRef.current!.duration) 
    videoRef.current!.currentTime = 0
    setPlayerState(PlayerState.PAUSING)
  }

  function handleMouseMoveVideoElement() {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }

    controlsRef.current!.classList.remove('hidden')

    if (playerState === PlayerState.PLAYING) {
      timeOutRef.current = setTimeout(() => {
        controlsRef.current?.classList.add('hidden')
      }, 2000)
    }
  }

  return (
    <div ref={ playerRef } className='relative shadow-sm shadow-stone-600 rounded-[16px] overflow-hidden'>
      <video 
        ref={videoRef} 
        className='w-full aspect-video '
        onLoadedMetadata={ handleMetadataChange }
        onMouseMove={ handleMouseMoveVideoElement }
      >
        <source
          src={src}
          type="video/mp4"
        />
        <source
          src={src}
          type="video/avi"
        />
        <source
          src={src}
          type="video/webm"
        />
        <source
          src={src}
          type="video/ogg"
        />
      </video>

      <div 
        ref={ controlsRef }
        className='hover:block absolute z-[2] bottom-0 px-4 w-full animate-fadeIn'
      >
        <div 
          ref={progressRef} 
          className='relative group/progress w-full h-[4px] bg-[rgba(73,70,67,0.5)] hover:h-[8px] rounded cursor-pointer'
        >
          <div 
            ref={timeProgressRef} 
            className='absolute will-change-auto bg-red-500 h-full rounded w-0 z-[2]'
          >
            <div className='group-hover/progress:block hidden will-change-auto w-[12px] h-[12px] rounded-[50%] absolute top-[50%] right-0 translate-x-[50%] translate-y-[-50%] bg-inherit transition ease-in-out duration-200 hover:scale-150'></div>
          </div>

          <div ref={ mouseOverProgressRef } className='absolute z-[1] will-change-auto w-0 bg-[rgba(73,70,67,0.8)] h-full rounded'></div>
        </div>
        <div className='flex justify-between items-center text-white'>
          <div className='flex'>
            <button 
              className='flex items-center ml-2'
              onClick={() => {
                playerState === PlayerState.PLAYING ? 
                  setPlayerState(PlayerState.PAUSING) : 
                  playerState === PlayerState.PAUSING ?
                    setPlayerState(PlayerState.PLAYING) :
                    playerState === PlayerState.ENDED ?
                      setPlayerState(PlayerState.PLAYING) : 
                      null
              }}
            >
              { playerState === PlayerState.ENDED ? 
                <ReplayIcon className='my-2' sx={{ fontSize: '28px' }} /> : 
                playerState === PlayerState.PLAYING ? 
                  <PauseIcon className='my-2' sx={{ fontSize: '28px' }} /> :
                  <PlayArrowIcon className='my-2' sx={{ fontSize: '28px' }} />
              }
            </button>

            <button className='ml-2'>
              <SkipNextIcon className='my-2' sx={{ fontSize: '28px' }} />
            </button>

            <div className='group/volume flex items-center ml-2'>
              <button>
                <VolumeUpIcon className='cursor-pointer' sx={{ fontSize: '28px' }} />
              </button>
              <div 
                ref={ volumeBarRef }
                className='group-hover/volume:block hidden relative ml-2.5 animate-growWidth h-[4px] bg-[rgba(73,70,67,0.5)] hover:h-[8px] rounded cursor-pointer'
              >
                <div 
                  ref={ volumeProgressRef }
                  className='absolute will-change-auto bg-white h-full rounded w-0 z-[2]'
                >
                  <div className='will-change-auto w-[12px] h-[12px] rounded-[50%] absolute top-[50%] right-0 translate-x-[50%] translate-y-[-50%] bg-inherit transition ease-in-out duration-200 hover:scale-150'></div>
                </div>
              </div>
            </div>

            <div className='ml-4 flex justify-center items-center text-[0.9rem] font-[300] select-none mt-0.5'>
              <span ref={ nowRef } className='mr-1'>00:00</span>
              /
              <span ref={ totalTimeRef } className='ml-1'>00:00</span>
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            <button>
              <SettingsIcon sx={{ fontSize: '28px' }} />
            </button>
            <button 
              onClick={() => {
                if (isFullScreenMode) {
                  document.exitFullscreen()
                } else {
                  playerRef.current!.requestFullscreen()
                }
                setFullScreenMode(!isFullScreenMode)
              }}
            >
              { isFullScreenMode ? <FullscreenExitIcon sx={{ fontSize: '32px' }} /> : <FullscreenIcon sx={{ fontSize: '32px' }} /> } 
              
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
