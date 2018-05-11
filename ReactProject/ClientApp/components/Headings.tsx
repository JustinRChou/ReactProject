import * as React from 'react';
export interface HeadingProps {
    headings: Array<string>;
    data: Array<ChangeState>;
    title: string;
};
interface ChangeState {
    when: string | undefined;
    who: string | undefined;
    description: string | undefined;
};
export class Headings extends React.Component<HeadingProps, ChangeState>{
    constructor() {
        super();
        this.state = { when: undefined, who: undefined, description: undefined };
    }
    public render() {
    var headings = this.props.headings.map(function (heading:string) {
        return (<th>
            {heading}
        </th>);
    });
    var rows = this.props.data.map(function (change: ChangeState) {
        return (<tr>
            <td> {change.when} </td>
            <td> {change.who} </td>
            <td> {change.description} </td>
        </tr>);
    });
        return (<div><h1>{this.props.title}</h1><table>
        {headings}
        {rows}
        </table></div>);
}
}