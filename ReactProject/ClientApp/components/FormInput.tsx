import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export default class FormInputApp extends React.Component<any, any> {
    public render() {
        return (
            <div>
                Controlled Input : <FormInputConApp name={this.props.name} /><br/>
                UnControlled Input : <FormInputUnConApp />
                </div>
        );
    };
};

export class FormInputConApp extends React.Component<any,any> {
    constructor() {
        super();
        this.state = {name :'-'};
    }
    private handleChange = (event: any) => {
        console.log("handlingChange");
        this.setState({ name: event.target.value });
    };
       public render() {
            return (
                <input type="text" value={this.state.name}
                    onChange={this.handleChange} />
            );
    };
};
export class FormInputUnConApp extends React.Component {

    public render() {
        return (
            <input type="text" defaultValue="Shawn" />
        );
    };
};