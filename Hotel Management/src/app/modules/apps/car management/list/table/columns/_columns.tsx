// @ts-nocheck
import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {CustomHeader} from './CustomHeader'
import {User} from '../../core/_models'

const tableColumns: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  // },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'roleName',
    Cell: ({...props}) => <p>{props.data[props.row.index].roleName}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Price' className='min-w-125px' />,
    id: 'roleDescription',
    Cell: ({...props}) => <p>{props.data[props.row.index].roleDescription}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='status' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => {return props.data[props.row.index].status == 0 ? <span className="badge badge-warning">Inactive</span> : <span className="badge badge-success">Active</span>},
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].userRoleId} />,
  },
]

export {tableColumns}
