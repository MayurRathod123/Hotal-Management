// @ts-nocheck
import {Column} from 'react-table'
import {InfoCell} from './InfoCell'
import {ActionsCell} from './ActionsCell'
import {CustomHeader} from './CustomHeader'
import {User} from '../../core/_models'
import { truncateSync } from 'fs'

const tableColumns: ReadonlyArray<Column<User>> = [
   {
    Header: (props) => <CustomHeader tableProps={props} title='State Name' className='min-w-125px' />,
    id: 'state_id',
    Cell: ({...props}) => <p>{props.data[props.row.index].state_name}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Hotel Name' className='min-w-125px' />,
    id: 'hotel_name',
    Cell: ({...props}) => <p>{props.data[props.row.index].hotel_name}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Price' className='min-w-125px' />,
    id: 'price',
    Cell: ({...props}) => <p>{props.data[props.row.index].price}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Stars' className='min-w-125px' />,
    id: 'star',
    Cell: ({...props}) => <p>{props.data[props.row.index].star}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='status' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => {return props.data[props.row.index].status == 0 ? <span className="badge badge-warning">InActive</span> : <span className="badge badge-success">Active</span>},
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index]} />,
  },
]

export {tableColumns}
