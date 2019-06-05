
import NewFileModal from 'app/components/NewDocModal'
import EditingContainer from 'app/containers/EditingContainer'
import ExcerptDialogContainer from 'app/containers/ExcerptDialogContainer';
import NavigationContainer from 'app/containers/NavigationContainer'
import SaveAsModalContainer from 'app/containers/SaveAsModalContainer'
import * as React from 'react'
import { Container, Grid, GridColumn } from 'semantic-ui-react'




export default class Layout extends React.Component {
    public render() {
        return (
            <Container>
                <Grid>
                    <GridColumn width={4}>
                        <NavigationContainer />
                    </GridColumn>
                    <GridColumn width={12}>
                        <EditingContainer />
                    </GridColumn>
                </Grid>
                <NewFileModal open={false} />
                <SaveAsModalContainer/>
                <ExcerptDialogContainer/>
            </Container>
        )
    }
}
