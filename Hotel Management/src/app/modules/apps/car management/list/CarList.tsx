import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ListHeader} from './components/header/ListHeader'
import {Table} from './table/Table'
import {EditModal} from './edit-modal/EditModal'
import {KTCard} from '../../../../../_metronic/helpers'
// import { AddUserModal } from './add-user-model/AddUserModal'
// import { AddPermissionModel } from './add-permission-model/AddPermissionModal'

const List = () => {
  const {itemIdForUpdate, addUserView, addPermissionView} = useListView()
  return (
    <>
      <KTCard>
        <ListHeader />
        <Table />
      </KTCard>
      {itemIdForUpdate !== undefined && <EditModal />}
      {/* {addUserView && <AddUserModal />} */}
      {/* {addPermissionView && <AddPermissionModel />} */}

    </>
  )
}

const CarListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <List />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {CarListWrapper}
