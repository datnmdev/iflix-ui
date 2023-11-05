import { Formik } from 'formik'

import validationSchema from './validationSchema'
import IEvaluationProps from './types/IEvaluationProps'

export default function EvaluationBox({ setDisplayEvaluationBox }: IEvaluationProps) {
  return (
    <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.1)] z-[3] flex justify-center items-center ${className}'>
      <div className='animate-scaleIn relative w-[400px] h-[480px] bg-white rounded-md shadow-md shadow-gray-400 px-4 py-6'>
        <h3 className='text-[1.2rem] font-bold text-center mb-4'>ĐÁNH GIÁ MỨC ĐỘ PHÙ HỢP CỦA PHIM</h3>
        <Formik
          initialValues={{
            violenceLevel: 0,
            discomfort: [],
            suitableAge: 18
          }}

          validationSchema={validationSchema}

          onSubmit={async (values: { violenceLevel: number, discomfort: number[], suitableAge: number }) => {
            values.discomfort = values.discomfort.map(value => Number(value))
            alert(JSON.stringify(values))
          }}
        >
          { formik => (
            <form id='evaluation-form' onSubmit={formik.handleSubmit} className='space-y-4 overflow-auto h-[332px]'>
              <label htmlFor="violenceLevel">
                <div className='text-red-500 font-bold text-[1.1rem]'>Mức độ bạo lực, vũ trang</div>
                <input className='block w-full mt-1' type='range' id='violenceLevel' min={0} max={10} step={1} { ...formik.getFieldProps('violenceLevel') } />
                {formik.errors.violenceLevel ? <div className='text-red-500'>{formik.errors.violenceLevel}</div> : null}
              </label>
              
              <div role='group' aria-labelledby='checkbox'>
                <div id='checkbox-group' className='text-red-500 font-bold text-[1.1rem]'>Yếu tố có gây ảnh hưởng đến người xem</div>
                <label className='block mt-1'>
                  <input className='mr-2' type='checkbox' { ...formik.getFieldProps('discomfort') } value={0} />
                  Âm thanh phù hợp tai người nghe
                </label>

                <label className='block'>
                  <input className='mr-2' type='checkbox' { ...formik.getFieldProps('discomfort') } value={1} />
                  Có chứa âm thanh (lời lẽ) thiếu chuẩn mực, tục tĩu
                </label>

                <label className='block'>
                  <input className='mr-2' type='checkbox' { ...formik.getFieldProps('discomfort') } value={2} />
                  Có chứa âm thanh (lời lẽ) mỉa mai, mạt sát, chửi mắng, sỉ nhục
                </label>

                <label className='block'>
                  <input className='mr-2' type='checkbox' { ...formik.getFieldProps('discomfort') } value={3} />
                  Có chứa âm thanh kinh dị, gây cảm giác sợ hãi cho người xem
                </label>
                {formik.errors.discomfort ? <div className='text-red-500'>{formik.errors.discomfort}</div> : null}
              </div>

              <div>
                <p className='text-red-500 font-bold text-[1.1rem] mb-2'>Theo bạn, độ tuổi phù hợp cho bộ phim này là bao nhiêu?</p>
                <input className='block border-solid border-2 border-stone-900 rounded w-1/2 px-2 py-1' type='number' min={1} max={100} { ...formik.getFieldProps('suitableAge') } ></input>
                {formik.errors.suitableAge ? <div className='text-red-500'>{formik.errors.suitableAge}</div> : null}
              </div>
            </form>
          )}
        </Formik>

        <div className='absolute bottom-0 left-0 w-full pr-4 pb-6 flex justify-end space-x-2'>
          <button 
            type='button'
            className='min-w-[72px] py-2 px-4 bg-sky-700 rounded-md text-white text-[0.9rem]'
            onClick={ () => setDisplayEvaluationBox(false) }
          >
            THOÁT
          </button>
          <button type='submit' form='evaluation-form' className='min-w-[72px] py-2 px-4 bg-sky-700 rounded-md text-white text-[0.9rem]'>GỬI</button>
        </div>
      </div>
    </div>
  )
}