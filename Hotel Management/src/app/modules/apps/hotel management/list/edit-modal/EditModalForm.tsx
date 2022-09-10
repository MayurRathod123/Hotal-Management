import { FC, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isNotEmpty } from '../../../../../../_metronic/helpers'
import { HotelDataModel, initial, } from '../core/_models'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { ListLoading } from '../components/loading/ListLoading'
import { createHotelData, getAllState, updateHotelData, } from '../core/_requests'
import { useQueryResponse } from '../core/QueryResponseProvider'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'

const saveHotelToast = ()=>{ 
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Hotel save successfully',
  })
}

type Props = {
  isUserLoading: boolean
  user: HotelDataModel
}

const editHotelSchema = Yup.object().shape({
  state_id: Yup.string()
    .min(1, 'Minimum 1 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('State Name is required'),

  hotel_name: Yup.string()
    .min(1, 'Minimum 1 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Hotel Name is required'),

  price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  cp_price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  map_price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  ap_price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  pickup_price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  drop_price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  adult_with_mattress: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  child_with_mattress: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

  star: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),
})

const EditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const { setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()

  const [userForEdit] = useState<HotelDataModel>({
    ...user,
    state_id: user.state_id || initial.state_id,
    hotel_name: user.hotel_name || initial.hotel_name,
    price: user.price || initial.price,
    cp_price: user.cp_price || initial.cp_price,
    map_price: user.map_price || initial.map_price,
    ap_price: user.ap_price || initial.ap_price,
    pickup_price: user.pickup_price || initial.pickup_price,
    drop_price: user.drop_price || initial.drop_price,
    adult_with_mattress: user.adult_with_mattress || initial.adult_with_mattress,
    child_with_mattress: user.child_with_mattress || initial.child_with_mattress,
    star: user.star || initial.star,
    status: user.status || initial.status,
  })

  const [status, setStatus] = useState(user.status ? true : false || initial.status ? false : true)

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editHotelSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        values.status = status ? 1 : 0
        if (isNotEmpty(values.id)) {
          await updateHotelData(values)
        } else {
          await createHotelData(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  const {
    data: stateList,
  } = useQuery(
    'getAllState',
    () => {
      return getAllState()
    },
    { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
  )
  // console.log(stateList)


  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >


          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>State</label>
            <select
              defaultValue={''}
              data-control='select2'
              data-hide-search='true'
              {...formik.getFieldProps('state_id')}
              className={clsx(
                'form-select form-select-white form-select-sm',
                { 'is-invalid': formik.touched.state_id && formik.errors.state_id },
                {
                  'is-valid': formik.touched.state_id && !formik.errors.state_id,
                }
              )}
            >
              {stateList && stateList.map((value:any, i:number) => <option key={i} value={value.id}>{value.state}</option>)}
            </select>
          </div>


          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Hotel Name</label>
            <input
              placeholder='Hotel Name'
              {...formik.getFieldProps('hotel_name')}
              type='text'
              name='hotel_name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.hotel_name && formik.errors.hotel_name },
                {
                  'is-valid': formik.touched.hotel_name && !formik.errors.hotel_name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.hotel_name && formik.errors.hotel_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.hotel_name}</span>
                </div>
              </div>
            )}
          </div>


          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Price</label>
            <input
              placeholder='Price'
              {...formik.getFieldProps('price')}
              type='number'
              name='price'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.price && formik.errors.price },
                {
                  'is-valid': formik.touched.price && !formik.errors.price,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.price && formik.errors.price && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.price}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'> CP Price</label>
            <input
              placeholder='CP Price'
              {...formik.getFieldProps('cp_price')}
              type='number'
              name='cp_price'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.cp_price && formik.errors.cp_price },
                {
                  'is-valid': formik.touched.cp_price && !formik.errors.cp_price,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.cp_price && formik.errors.cp_price && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.cp_price}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>MAP Price</label>
            <input
              placeholder='MAP Price'
              {...formik.getFieldProps('map_price')}
              type='number'
              name='map_price'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.map_price && formik.errors.map_price },
                {
                  'is-valid': formik.touched.map_price && !formik.errors.map_price,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.map_price && formik.errors.map_price && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.map_price}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>AP Price</label>
            <input
              placeholder='AP Price'
              {...formik.getFieldProps('ap_price')}
              type='number'
              name='ap_price'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.ap_price && formik.errors.ap_price },
                {
                  'is-valid': formik.touched.ap_price && !formik.errors.ap_price,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.ap_price && formik.errors.ap_price && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.ap_price}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Pickup Price</label>
            <input
              placeholder='Pickup Price'
              {...formik.getFieldProps('pickup_price')}
              type='number'
              name='pickup_price'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.pickup_price && formik.errors.pickup_price },
                {
                  'is-valid': formik.touched.pickup_price && !formik.errors.pickup_price,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.pickup_price && formik.errors.pickup_price && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.pickup_price}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Drop Price</label>
            <input
              placeholder='Drop Price'
              {...formik.getFieldProps('drop_price')}
              type='number'
              name='drop_price'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.drop_price && formik.errors.drop_price },
                {
                  'is-valid': formik.touched.drop_price && !formik.errors.drop_price,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.drop_price && formik.errors.drop_price && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.drop_price}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Extra Adult With Mattress</label>
            <input
              placeholder='Extra Adult With Mattress'
              {...formik.getFieldProps('adult_with_mattress')}
              type='number'
              name='adult_with_mattress'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.adult_with_mattress && formik.errors.adult_with_mattress },
                {
                  'is-valid': formik.touched.adult_with_mattress && !formik.errors.adult_with_mattress,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.adult_with_mattress && formik.errors.adult_with_mattress && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.adult_with_mattress}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Extra Child Without Mattress</label>
            <input
              placeholder='Extra Child Without Mattress'
              {...formik.getFieldProps('child_with_mattress')}
              type='number'
              name='child_with_mattress'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.child_with_mattress && formik.errors.child_with_mattress },
                {
                  'is-valid': formik.touched.child_with_mattress && !formik.errors.child_with_mattress,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.child_with_mattress && formik.errors.child_with_mattress && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.child_with_mattress}</span>
                </div>
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Star</label>
            <select
              defaultValue=''
              data-control='select2'
              data-hide-search='true'
              {...formik.getFieldProps('star')}
              className={clsx(
                'form-select form-select-white form-select-sm',
                { 'is-invalid': formik.touched.star && formik.errors.star },
                {
                  'is-valid': formik.touched.star && !formik.errors.star,
                }
              )}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3 </option>
              <option value="4">4 </option>
              <option value="5">5 </option>
              <option value="6">6 </option>
              <option value="7">7 </option>
            </select>
          </div>
          
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Status</label>
            {/* end::Label */}

            {/* begin::Input */}
            <div className='form-check form-switch form-check-custom form-check-solid'>
              <input
                className='form-check-input'
                type='checkbox'
                onChange={() => {
                  setStatus(!status)
                }}
                checked={status}
                id='flexSwitchDefault'
              />
            </div>

            {/* end::Input */}
          </div>
          {/* end::Input group */}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
            onClick={saveHotelToast}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <ListLoading />}
    </>
  )
}

export { EditModalForm }
