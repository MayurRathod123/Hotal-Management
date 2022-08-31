import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {initial, UserRoleDataModel} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {ListLoading} from '../components/loading/ListLoading'
import {createUserRoleData, updateUserRoleData} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
  user: UserRoleDataModel
}

const editUserSchema = Yup.object().shape({
    hotelName: Yup.string()
    // .min(1, 'Minimum 1 symbols')
    // .max(50, 'Maximum 50 symbols')
    .required('Hotel Name is required'),

    price: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),

    stars: Yup.number()
    .integer("This field should contain an integer")
    .required().typeError("The field must contain a number"),
   
  roleDescription: Yup.string()
    .min(1, 'Minimum 1 symbols')
    .max(500, 'Maximum 500 symbols')
    .required('Description is required'),
})

const EditModalForm: FC<Props> = ({user, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<UserRoleDataModel>({
    ...user,
    hotelName: user.hotelName || initial.hotelName,
    price: user.price || initial.price,
    stars: user.stars || initial.stars,
    roleDescription: user.roleDescription || initial.roleDescription,
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
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        values.status = status
        if (isNotEmpty(values.userRoleId)) {
          await updateUserRoleData(values)
        } else {
          await createUserRoleData(values)
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
            <label className='required fw-bold fs-6 mb-2'>Hotel Name</label>
            <input
              placeholder='Hotel Name'
              {...formik.getFieldProps('hotelName')}
              type='text'
              name='hotelName'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.hotelName && formik.errors.hotelName},
                {
                  'is-valid': formik.touched.hotelName && !formik.errors.hotelName,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.hotelName && formik.errors.hotelName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.hotelName}</span>
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
          </div>

          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Stars</label>
            <input
              placeholder='Stars'
              {...formik.getFieldProps('stars')}
              type='number'
              name='stars'
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
              </div>
            )}
          </div>

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Description</label>
            {/* end::Label */}

            {/* begin::Input */}
            <textarea
              placeholder='Description'
              {...formik.getFieldProps('roleDescription')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.roleDescription && formik.errors.roleDescription},
                {
                  'is-valid': formik.touched.roleDescription && !formik.errors.roleDescription,
                }
              )}
              name='roleDescription'
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.roleDescription && formik.errors.roleDescription && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.roleDescription}</span>
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
      {(formik.isSubmitting || isUserLoading) && <ListLoading />}
    </>
  )
}

export {EditModalForm}
