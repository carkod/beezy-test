import React, { Component } from 'react'
import { Header, Segment, Portal } from 'semantic-ui-react'


class Notification extends Component {
    constructor() {
        super();
        this.state = {}
    }
    componentDidUpdate(prevProps) {
        if (prevProps.open !== this.props.open) {
            
            this.setState({ open: this.props.open })
            setTimeout(() => this.setState({ open: false }), 3000)
        }
    }

    render() {
        return (
            <Portal open={this.state.open} >
                <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                    <Header>Hello!</Header>
                    <p>{this.props.text}</p>
                </Segment>
            </Portal>
        )
    }
}

export default Notification;