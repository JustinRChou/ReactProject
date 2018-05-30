import * as React from 'react';
import { RouteComponentProps } from 'react-router';
console.log("Start");
interface ComponentModelLifecycleAppProp {
name : string
}
interface ComponentModelLifecycleAppState {
    status: boolean
}
//interface ComponentModelLifecycleApp
export default class ComponentModelLifecycleApp extends React.Component<ComponentModelLifecycleAppProp, ComponentModelLifecycleAppState > {
    constructor() {
        super();
        this.state = { status: true };
    }
    public componentWillMount() {
        console.log('componentWillMount');
    };
    public componentDidMount() {
    console.log('componentDidMount');
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