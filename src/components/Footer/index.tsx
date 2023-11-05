
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

export default function Footer() {
  return (
    <>
      <div
        className='transition ease-linear duration-500 bg-slate-50 dark:bg-stone-950 dark:text-white py-8'
      >
        <div 
          className='lg:container lg:mx-auto'
        >
          <div
            className='flex justify-between'
          >
            <div
              className='flex flex-col justify-center basis-5/8 pr-8'
            >
              <img 
                width={220}
                src='/src/assets/brands/logo.png' 
                alt="Logo"
              />
              <p
                className='text-justify mt-4'
              >
                IFLIX - Trang xem phim Online với giao diện mới được bố trí và thiết kế thân thiện với người dùng. Nguồn phim được tổng hợp từ các website lớn với đa dạng các đầu phim và thể loại vô cùng phong phú.
              </p>
            </div>
            <div
              className='basis-1/3'
            >
              <h3
                className='font-bold'
              >
                Thông tin
              </h3>
              <ul
                className='mt-2 text-sky-500'
              >
                <li
                  className='hover:text-red-500'
                >
                  <a href="">Giới thiệu</a>
                </li>
                <li
                  className='hover:text-red-500'
                >
                  <a href="">Liên hệ chúng tôi</a>
                </li>
                <li
                  className='hover:text-red-500'
                >
                  <a href="">Điều khoản dịch vụ</a>
                </li>
                <li
                  className='hover:text-red-500'
                >
                  <a href="">Chính sách quyền riêng tư</a>
                </li>
                <li
                  className='hover:text-red-500'
                >
                  <a href="">Khiếu nại bản quyền</a>
                </li>
              </ul>
            </div>
            <div
              className='basis-1/3'
            >
              <h3
                className='font-bold'
              >
                Thảo luận và chia sẻ
              </h3>
              <ul
                className='mt-2'
              >
                <li
                  className='hover:text-red-500'
                >
                  <a href="http://">
                    <FacebookIcon
                      className='text-sky-900 mr-2'
                    />
                    Facebook
                  </a>
                </li>
                <li
                  className='hover:text-red-500'
                >
                  <a href="http://">
                    <YouTubeIcon 
                      className='text-rose-600 mr-2'
                    />
                    Youtube
                  </a>
                </li>
                <li
                  className='hover:text-red-500'
                >
                  <a href="http://">
                    <InstagramIcon 
                      className='text-orange-600 mr-2'
                    />
                    Instagram
                  </a>
                </li>
                <li
                  className='hover:text-red-500'
                >
                  <a href="http://">
                    <TwitterIcon 
                      className='text-sky-500 mr-2'
                    />
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className='transition ease-linear duration-500 bg-slate-50 dark:bg-stone-950 dark:text-white text-center font-medium py-4 text-[0.9rem]'
      >
        ©2023 - Copyright by Nguyen Minh Dat
      </div>
    </>
  )
}