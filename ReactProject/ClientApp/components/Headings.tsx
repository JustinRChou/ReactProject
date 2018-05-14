import * as React from 'react';
export namespace RecentTableChanges {
    export interface HeadingProps {
        headings: Array<string>;
        data: Array<ChangeState>;
        title: string;
    };
    interface HeadingsProps {
        heading: string;
    };
    interface Headings2Props {
        headings: Array<string>;
    };
    interface ChangeState {
        when: string | undefined;
        who: string | undefined;
        description: string | undefined;
    };
    class Heading extends React.Component<HeadingsProps>{
        public render() {
            return (<th style={{ color: "red" }}>{this.props.heading}</th>);
        }
    };

    class Headings2 extends React.Component<Headings2Props> {
        public render() {
            var headings2 = this.props.headings.map(function (heading,index) {
                return (<Heading key={index} heading={heading} />);
            });
            return <thead><tr>{headings2}</tr></thead>;
        }
    };
    class Row extends React.Component<{ changes: ChangeState }>{
        public render() {
            return (<tr>
                <td> {this.props.changes.when} </td>
                <td style={{ color: "green" }}> {this.props.changes.who} </td>
                <td> {this.props.changes.description} </td>
            </tr>);
        }
    };

    class Row2 extends React.Component<{ changeSet: Array<ChangeState> }> {
        public render() {
            var rows = this.props.changeSet.map(function (change,index) {
                return (<Row key={index} changes={change} />);
            });
            return <tbody>{rows}</tbody>;
        }
    };

    export class Headings extends React.Component<HeadingProps, ChangeState>{
        constructor() {
            super();
            this.state = { when: undefined, who: undefined, description: undefined };
        }
        public render() {
            return (<div><h1>{this.props.title}</h1><table>
                <Headings2 headings={this.props.headings} />
                <Row2 changeSet={this.props.data} />
            </table></div>);
        }
    }

    export class RecentChanges extends React.Component<{}, {}>{
        public render() {
            return (
                <div>
                    <h1> Recent Changes </h1>
                    <table className='table'>
                        {this.props.children}
                    </table>
                </div>
            );
        }
    }
    export class AppRecentTable extends React.Component<HeadingProps, {} >{
        public render(){
            return (<RecentChanges>
                <Headings2 headings={this.props.headings} />
                <Row2 changeSet={this.props.data} />
            </RecentChanges>);
        }
    }

//Headings.propTypes = {
//    headings: PropTypes.array,
//    data: PropTypes.array,
//    title: PropTypes.string.isRequired
//};

}