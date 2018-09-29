import * as React from 'react'
import { /*Switch,*/ Route } from 'react-router'
import Layout from './components/Layout'
import App from './containers/App'

export default () => (
    <App>
        {/* <Switch> */}
        {/* <Route path="/" component={HomePage} /> */}
        <Route path="/" component={Layout} />

        {/* </Switch> */}
    </App>
)
