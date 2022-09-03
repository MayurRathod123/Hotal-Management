import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {StateDataModel, initial, } from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/StateListViewProvider'
// import {ListLoading} from '../components/loading/ListLoading'
import {createState, updateState,} from '../core/_requests'
import {useQueryResponse} from '../core/StateQueryResponseProvider'

type Props = {
  isUserLoading: boolean
  user:StateDataModel
}

const editStateSchema = Yup.object().shape({
    stateName: Yup.string()
    .min(1, 'Minimum 1 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('State Name is required'),

    // price: Yup.number()
    // .integer("This field should contain an integer")
    // .required().typeError("The field must contain a number"),

    // stars: Yup.number()
    // .integer("This field should contain an integer")
    // .required().typeError("The field must contain a number"),
   
    stateDescription: Yup.string()
    .min(1, 'Minimum 1 symbols')
    .max(500, 'Maximum 500 symbols')
    .required('Description is required'),
})

const EditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<StateDataModel>({
    ...user,
    stateName: user.stateName || initial.stateName,
    // price: user.price || initial.price,
    // stars: user.stars || initial.stars,
    stateDescription: user.stateDescription || initial.stateDescription,
    status: user.status || initial.status,
  })

  const [status, setStatus] = useState(user.status ? true : false || initial.status ? true : false)

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editStateSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        values.status = status
        if (isNotEmpty(values.id)) {
          await updateState(values)
        } else {
          await createState(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

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
            <label className='required fw-bold fs-6 mb-2'>State Name</label>
            <input
              placeholder='State Name'
              {...formik.getFieldProps('stateName')}
              type='text'
              name='stateName'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.stateName && formik.errors.stateName},
                {
                  'is-valid': formik.touched.stateName && !formik.errors.stateName,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.stateName && formik.errors.stateName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.stateName}</span>
                </div>
              </div>
            )}
          </div>


          {/* <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Price</label>
            <input
              placeholder='Price'
              {...formik.getFieldProps('price')}
              type='number'
              name='price'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.price && formik.errors.price},
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
          </div> */}

          {/* <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Stars</label>
            <input
              placeholder='Stars'
              {...formik.getFieldProps('stars')}
              type='number'
              name='stars'createHotelData
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.stars && formik.errors.stars},
                {
                  'is-valid': formik.touched.stars && !formik.errors.stars,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.stars && formik.errors.stars && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.stars}</span>
                </div>
              </div>createHotelData
            )}
          </div> */}

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='fw-bold fs-6 mb-2'>Description</label>
            {/* end::Label */}

            {/* begin::Input */}
            <textarea
              placeholder='Description'
              {...formik.getFieldProps('roleDescription')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.stateDescription && formik.errors.stateDescription},
                {
                  'is-valid': formik.touched.stateDescription && !formik.errors.stateDescription,
                }
              )}
              name='stateDescription'
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.stateDescription && formik.errors.stateDescription && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role={'alert'}>{formik.errors.stateDescription}</span>
                </div>
              </div>
            )}
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
      {/* {(formik.isSubmitting || isUserLoading) && <ListLoading />} */}
    </>
  )
}

export {EditModalForm}
