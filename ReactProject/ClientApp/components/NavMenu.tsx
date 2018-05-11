import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        var routes = [{ to: '/', title: 'Home' }, { to: '/counter', title: 'Counter' }, { to: '/fetchdata', title: 'Fetch data' }, { to: '/rowdata', title: 'Row Data' }, { to: "/headings", title: "Headings"}];
        var rows = routes.map((route) => {
            return <li>
                <NavLink to={route.to} activeClassName='active'>
                    <span className='glyphicon glyphicon-th-list'></span> {route.title}
                            </NavLink>
            </li>
        });
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>ReactProject</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        {rows}
                    </ul>
                </div>
            </div>
        </div>;
    }
}
