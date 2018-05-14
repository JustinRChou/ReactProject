import * as React from 'react';
export namespace StateAppV1{
    export interface StateAppState {
        changeSets: Array<any>;
        headings: Array<string>;
    }
    export class StateApp extends React.Component<any, StateAppState>{
        constructor() {
            super();
            this.state = {
                changeSets: [],
                headings: ['Updated At', 'Author', 'Change']
            }
        }
        handleEvent(data: StateAppState) {
        this.setState({ changeSets: data.changeSets });
    }
        public render() {
            console.log(this.state.changeSets); // prints [] 
            return (<div><span>HI</span></div>);
        }
    }
}