import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as $ from 'jquery';
require('timeago');

//import timeAgo from 'timeago';
//var timeAgo = require('timeago'); //= require('timeago');

interface ComponentModelLifecycleAppProp {
name : string
}
interface ComponentModelLifecycleAppState {
    status: boolean
}
//interface ComponentModelLifecycleApp
export default class OpenLibRecentChanges extends React.Component<ComponentModelLifecycleAppProp, ComponentModelLifecycleAppState> {
    constructor() {
        super();
        this.state = { status: true };
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
        }).done(function (this: any,data: any) {
            console.log(data);
            var changeSets = this.mapOpenLibraryDataToChangeSet(data);
            console.log(changeSets);
            //this.setState({ changeSets: changeSets });
        });
    };
    private mapOpenLibraryDataToChangeSet = (data:any) => {
        return data.map(function (change: any, index: any) {
        return {
            "when": ($ as any).timeago(change.timestamp),
            "who": change.author.key,
            "description": change.comment
        }
    });
    }; 
    public getDefaultProps(){
    return { name: 'John' };
    };
    public shouldComponentUpdate(nextProps: ComponentModelLifecycleAppProp, nextState: ComponentModelLifecycleAppState) {
        console.log('shouldComponentUpdate');
        return true;
    };
    public componentWillReceiveProps(nextProps:any){
    console.log('componentWillReceiveProps');
    }
    public componentWillUpdate(){
    console.log('componentWillUpdate');
};
    public render() {
        console.log('render');
        return <h1 onClick={this.toggleState}>
            {this.state.status.toString()}
        </h1>
    };
    public componentWillUnmount(){
    console.log('componentWillUnmount');
    }
    public toggleState = ()=> {
    this.setState({ status: !this.state.status })
    }
    //componentDidMount?(): void;
    //componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
    //shouldComponentUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean;
    //componentWillUpdate?(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void;
    //componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, prevContext: any): void;
    //componentWillUnmount?(): void;
}