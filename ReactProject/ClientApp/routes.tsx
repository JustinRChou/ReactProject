import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Headings } from './components/Headings';
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
var headings = ["Last updated at", "By Author", "Summary"]
var title = "Recent Changes";
export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/rowdata' component={FetchData} />
    <Route
        path='/headings'
        render={(props) => <Headings headings={headings} data={data} title={title} />}
    />
</Layout>;
