import { KTCard } from "../../../../../_metronic/helpers"
import { ListHeader } from "./components/header/ListHeader"
import { StateListViewProvider } from "./core/StateListViewProvider"
import { StateQueryRequestProvider } from "./core/StateQueryRequestProvider"
import { StateQueryResponseProvider } from "./core/StateQueryResponseProvider"

const StateList = () => {
    return (
        <>
            <KTCard>
                <ListHeader />
            </KTCard>
        </>
    )

}


const StateListWrapper = () => {
    return (
        <StateQueryRequestProvider>
            <StateQueryResponseProvider>
                <StateListViewProvider>
                    <StateList />   
                </StateListViewProvider>
            </StateQueryResponseProvider>
        </StateQueryRequestProvider>
    )
}

export { StateListWrapper }