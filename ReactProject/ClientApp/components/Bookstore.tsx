import * as React from 'react';
import * as ReactDom from 'react-dom'
import { array } from 'prop-types';
import * as $ from 'jquery';

export default class BookstoreApp extends React.Component<any, any> {
    loadInterval: any;
    oriTimeout : number = 60 * 15;
    constructor(props:any) {
        super(props);
        this.loadInterval = null;
        this.state = {
            currentStep: 1, formValues: {}, cartTimeout: this.oriTimeout 
        };
    }
    componentWillMount() {
        this.loadInterval = setInterval(this.decrementCartTimer, 1000);
}
    public decrementCartTimer = () => {
        if (this.state.cartTimeout == 0) {
            this.alertCartTimeout();
            return;
        }
        this.setState({ cartTimeout: this.state.cartTimeout - 1 });
    }
    componentWillUnmount() {
        clearInterval(this.loadInterval);
}
    public alertCartTimeout = () => {
        console.log("fire");
        ReactDom.render(<ModalAlertTimeout />, document.getElementById('modalAlertTimeout'));
        this.setState({ currentStep: 1, formValues: {}, cartTimeout: this.oriTimeout});
    }
    public updateCartTimeout = (timeout: number) => {
        console.log("updateCartTimeout", timeout);
        this.setState({ cartTimeout: timeout });
    }
    private updateFormData = (formData: any) => {
        var formValues2 = (Object as any).assign({}, this.state.formValues,
            formData);
        var nextStep = this.state.currentStep + 1;
        this.setState({ currentStep: nextStep, formValues: formValues2 }, () => { console.log(this.state) });
    }
    public render() {
        switch (this.state.currentStep) {
            case 1:
                return <BookList updateFormData={this.updateFormData} />;
            case 2:
                return <ShippingDetails updateFormData={this.updateFormData} cartTimeout={this.state.cartTimeout}
                    updateCartTimeout={this.updateCartTimeout}
                    alertCartTimeout={this.alertCartTimeout} />;
            case 3:
                return <DeliveryDetails updateFormData={this.updateFormData} cartTimeout={this.state.cartTimeout}
                    updateCartTimeout={this.updateCartTimeout}
                    alertCartTimeout={this.alertCartTimeout} />;
            case 4:
                return <Confirmation data={this.state.formValues}
                    updateFormData={this.updateFormData} cartTimeout={this.state.cartTimeout} />;
            case 5:
                return <Success data={this.state.formValues} cartTimeout={this.state.cartTimeout} />;
            case 10:
                /* Handle the case of Cart timeout */
                return <div><h2>Your cart timed out, Please try again!</h2></div>;
            default:
                return <BookList updateFormData={this.updateFormData} />;
        }
    };
}
export class BookList extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            books: [{ id: 1, name: 'Zero to One', author: 'Peter Thiel' },
            { id: 2, name: 'Monk who sold his Ferrari', author: 'Robin Sharma' },
            { id: 3, name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' }],
            selectedBooks: [],
            error: false
        };
    }
    private _renderBook = (book: any) => {
        return (
            <div className="checkbox" key={book.id}>
                <label>
                    <input type="checkbox" value={book.name} onChange={this.handleSelectedBooks} /> {book.name} -- {book.author}
                </label>
            </div>
        );
    }
    private handleSelectedBooks = (event: any) => {
        var selectedBooks = this.state.selectedBooks;
        var index = selectedBooks.indexOf(event.target.value);
        if (event.target.checked) {
            if (index === -1)
                selectedBooks.push(event.target.value);
        } else {
            selectedBooks.splice(index, 1);
        }
        this.setState({ selectedBooks: selectedBooks });
    }
    private _renderError = () => {
        if (this.state.error) {
            return (
                <div className="alert alert-danger">
                    {this.state.error}
                </div>
            );
        }
    };
    private handleSubmit = (event: any) => {
        event.preventDefault();
        if (this.state.selectedBooks.length === 0) {
            this.setState({
                error: 'Please choose at least one book to continue'
            });
        } else {
            this.setState({ error: false });
            this.props.updateFormData({
                selectedBooks:
                    this.state.selectedBooks
            })
        }
    };
    public render() {
        var errorMessage = this._renderError();
        return (
            <div>
                <h3> Choose from wide variety of books available in our store
                </h3>
                {errorMessage}
                <form onSubmit={this.handleSubmit}>
                    {this.state.books.map((book: any) => {
                        return this._renderBook(book);
                    })
                    }
                    <input type="submit" className="btn btn-success" />
                </form>
            </div>
        );
    }
};
export class ShippingDetails extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            fullName: '', contactNumber: '', shippingAddress: '', error:
                false, cartTimeout: this.props.cartTimeout
        };
    }
    public componentWillReceiveProps(newProps: any) {
        this.setState({ cartTimeout: newProps.cartTimeout });
    }
    private _renderError = () => {
        if (this.state.error) {
            return (
                <div className="alert alert-danger">
                    {this.state.error}
                </div>
            );
        }
    }
    private _validateInput = () => {
        if (this.state.fullName === '') {
            this.setState({ error: "Please enter full name" });
        } else if (this.state.contactNumber === '') {
            this.setState({ error: "Please enter contact number" });
        } else if (this.state.shippingAddress === '') {
            this.setState({ error: "Please enter shipping address" });
        } else {
            this.setState({ error: false });
            return true;
        }
    }
    private handleSubmit = (event: any) => {
        event.preventDefault();
        var formData = {
            fullName: this.state.fullName,
            contactNumber: this.state.contactNumber,
            shippingAddress: this.state.shippingAddress
        };
        if (this._validateInput()) {
            this.props.updateFormData(formData);
        }
    };

    private handleChange = (event: any, attribute: any) => {
        var newState: any = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
    }
    public render() {
        var errorMessage = this._renderError();
        var minutes = Math.floor(this.state.cartTimeout / 60);
        var seconds = this.state.cartTimeout - minutes * 60;
        return (
            <div>
                <h1>Enter your shipping information.</h1>
                {errorMessage}
                <div style={{ width: 200 }}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input className="form-control"
                                type="text"
                                placeholder="Full Name"
                                value={this.state.fullName}
                                onChange={(event) => this.handleChange(event,
                                    'fullName')} />
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                type="text"
                                placeholder="Contact number"
                                value={this.state.contactNumber}
                                onChange={(event) => this.handleChange(event,
                                    'contactNumber')} />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text"
                                placeholder="Shipping Address"
                                value={this.state.shippingAddress}
                                onChange={(event) => this.handleChange(event,
                                    'shippingAddress')} />
                        </div>
                        <div className="form-group">
                            <button type="submit"
                                ref="submit"
                                className="btn btn-success">
                                Submit
</button>
                        </div>
                    </form>
                </div>
                <div className='well'>
                    <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds,
                    before confirming order
</div>
            </div>
        );
    }
}
export class DeliveryDetails extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            deliveryOption: 'Primary', cartTimeout: this.props.cartTimeout
        };
    }
    public componentWillReceiveProps(newProps: any) {
        this.setState({ cartTimeout: newProps.cartTimeout });
    }
    //mixins: [SetIntervalMixin]
    private handleChange = (event: any) => {
        this.setState({ deliveryOption: event.target.value });
    };
    private handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.updateFormData(this.state);
    }
    public render() {
        var minutes = Math.floor(this.state.cartTimeout / 60);
        var seconds = this.state.cartTimeout - minutes * 60;
        return (
            <div>
                <h1>Choose your delivery options here.</h1>
                <div style={{ width: 200 }}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.deliveryOption ===
                                        "Primary"}
                                    value="Primary"
                                    onChange={this.handleChange} />
                                Primary -- Next day delivery
</label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.deliveryOption ===
                                        "Normal"}
                                    value="Normal"
                                    onChange={this.handleChange} />
                                Normal -- 3-4 days
</label>
                        </div>
                        <button className="btn btn-success">
                            Submit
</button>
                    </form>
                </div>
                <div className="well">
                    <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds,
                    before confirming order
</div>
            </div>
        );
    }
}
export class Confirmation extends React.Component<any, any>{
    private handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.updateFormData(this.props.data);
    }
    public render() {
        return (
            <div>
                <h1>Are you sure you want to submit the data?</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <strong>Full Name</strong> : {this.props.data.fullName}
                    </div><br />
                    <div>
                        <strong>Contact Number</strong> : {this.props.data.
                            contactNumber}
                    </div><br />
                    <div>
                        <strong>Shipping Address</strong> : {this.props.data.
                            shippingAddress}
                    </div><br />
                    <div>
                        <strong>Selected books</strong> : {this.props.data.
                            selectedBooks.join(", ")}
                    </div><br />
                    <button className="btn btn-success">
                        Place order
</button>
                </form>
            </div>
        );
    }
}
export class Success extends React.Component<any, any>{
    public render() {
        var numberOfDays = "1 to 2 ";
        if (this.props.data.deliveryOption === 'Normal') {
            numberOfDays = "3 to 4 ";
        }
        return (
            <div>
                <h2>
                    Thank you for shopping with us {this.props.data.fullName}.
</h2>
                <h4>
                    You will soon get {this.props.data.selectedBooks.join(", ")}
                    at {this.props.data.shippingAddress} in approrximately {numberOfDays}
                    days.
</h4>
            </div>
        );
    }
};
export class ModalAlertTimeout extends React.Component<any, any>{
    constructor(props:any) {
        super(props);
    }
    public componentDidMount() {
        console.log(this.refs);
        setTimeout(() => {
            let timeoutModal: any = ReactDom.findDOMNode(this.refs.timeoutModal);
            ($(timeoutModal) as any).modal('show');
            $(timeoutModal).on('hidden.bs.modal', this.unMountComponent);
        }, 100);
    }
    private unMountComponent = () => {
        var node = ReactDom.findDOMNode(this);
        var container : any = node.parentNode;
        ReactDom.unmountComponentAtNode(container);
    }
    public render() {
        return (
            <div className="modal fade" ref='timeoutModal'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></
                            button>
                            <h4 className="modal-title">Timeout</h4>
                        </div>
                        <div className="modal-body">
                            <p>The cart has timed-out. Please try again!</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
