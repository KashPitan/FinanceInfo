import React from "react";

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            desc: 'Updating prices',
        };
    }

    handleClick(){
        this.setState({value: !this.state.value});

        if (this.state.value){
            this.setState({desc: 'No longer updating'});
        } else {
            this.setState({desc: 'Updating prices'});
        }
    }

    render() {
        return (
            <button
            id="updatebutton"
            type="button"
            onClick = {() => this.handleClick()}
            >{this.state.desc}
            </button>
        );
    };
}

export default Button;