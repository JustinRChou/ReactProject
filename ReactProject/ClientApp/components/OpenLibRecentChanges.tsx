import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as $ from 'jquery';
require('timeago');

//import timeAgo from 'timeago';
//var timeAgo = require('timeago'); //= require('timeago');

interface ComponentModelLifecycleAppProp {
    name: string
}
interface ComponentModelLifecycleAppState {
    status: boolean
}
//interface ComponentModelLifecycleApp
export default class OpenLibRecentChanges extends React.Component<any, any> {
    constructor() {
        super();
        this.state = { changeSets: [] };
    }
    public componentWillMount() {
        console.log('componentWillMount');
    };
    public componentDidMount() {
        $.ajax({
            url: 'http://openlibrary.org/recentchanges.json?limit=10',
            context: this,
            dataType: 'json',
            type: 'GET'
        }).done(function (this: any, data: any) {
            console.log(data);
            var changeSets = this.mapOpenLibraryDataToChangeSet(data);
            console.log(changeSets);
            this.setState({ changeSets: changeSets });
        });
    };
    private mapOpenLibraryDataToChangeSet = (data: any) => {
        return data.map(function (change: any, index: any) {
            return {
                "when": ($ as any).timeago(change.timestamp),
                "who": change.author.key,
                "description": change.comment
            }
        });
    };
    public getDefaultProps() {
        return { name: 'John' };
    };
    public shouldComponentUpdate(nextProps: ComponentModelLifecycleAppProp, nextState: ComponentModelLifecycleAppState) {
        console.log('shouldComponentUpdate');
        return true;
    };
    public componentWillReceiveProps(nextProps: any) {
        console.log('componentWillReceiveProps');
    }
    public componentWillUpdate() {
        console.log('componentWillUpdate');
    };
    public render() {
        console.log('render');
        return (<table className='table'>
            <Headings headings={this.props.headings} />
            <Rows changeSets={this.state.changeSets} />
        </table>);
    };
    public componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    public toggleState = () => {
        this.setState({ status: !this.state.status })
    }
}
class Heading extends React.Component<any, any>{
    public render() {
        var headingStyle = {
            backgroundColor: 'FloralWhite',
            fontSize: '19px'
        };
        return (<th style={headingStyle}> {this.props.heading} </th>);
    };
}
class Headings extends React.Component<any, any>{
    public render() {
        var headings = this.props.headings.map(function (name: any, index: any) {
            return (<Heading key={"heading-" + index}
                heading={name} />);
        });
        return (<tr className='table-th'> {headings} </tr>);
    };
};
class Row extends React.Component<any, any>{
    public render() {
        var trStyle = { backgroundColor: 'aliceblue' };
        return (<tr style={trStyle}>
            <td> {this.props.changeSet.when} </td>
            <td> {this.props.changeSet.who} </td>
            <td> {this.props.changeSet.description} </td>
        </tr>);
    }
};
class Rows extends React.Component<any, any>{
    public render() {
        var rows = this.props.changeSets.map(function (changeSet: any,
            index: any) {
            return (<Row key={index} changeSet={changeSet} />);
        });
        return (<tbody>{rows}</tbody>);
    }
};