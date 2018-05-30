import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { RecentTableChanges } from './components/Headings';
import { StateAppV1 } from './components/StateApp';
import Container, { DoubleContainer } from './components/DragList/Container';
import ComponentModelLifecycleApp from './components/ComponentLifeCycle'
import OpenLibRecentChangesApp from './components/OpenLibRecentChanges';
var data = [{
    "when": "2 minutes ago",
    "who": "Jill Dupre",
    "description": "Created new account"
},
{
    "when": "1 hour ago",
    "who": "Lose White",
    "description": "Added fist chapter"
},
{
    "when": "2 hours ago",
    "who": "Jordan Whash",
    "description": "Created new account"
    }];
var props2 = {headings : ["Last updated at", "By Author", "Summary"], title : "Recent Changes", data: data}
var headings = ["Last updated at", "By Author", "Summary"]
var title = "Recent Changes";
export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/rowdata' component={FetchData} />
    {/*<Route
        path='/headings'
        render={(props) => <RecentTableChanges.Headings headings={headings} data={data} title={title} />}
    />*/}
    <Route
        path='/headings'
        render={() => <RecentTableChanges.Headings {...props2} />}
    />
    <Route
        path='/headingsV2'
        render={() => <RecentTableChanges.AppRecentTable {...props2} />}
    />
    <Route path='/stateapp' render={() => <StateAppV1.StateApp />} />
    <Route path='/Home/NewPage' />
    <Route path='/container' render={() => <Container />} />
    <Route path='/comlifecycle' render={() => <ComponentModelLifecycleApp name="Jane" />} />
    <Route path='/openlibrecent' render={() => <OpenLibRecentChangesApp name="Jane" />} />
</Layout>;
