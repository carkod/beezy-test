import React, { Component } from 'react'
import { Header, Segment, Portal } from 'semantic-ui-react'

export default class PortalExamplePortal extends Component {
    state = {
        log: [],
        logCount: 0,
        open: false,
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <Portal open={this.props.openNotification} onClose={this.handleClose} >
                <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                    <Header>Hello!</Header>
                    <p>{this.props.contentNotification}</p>
                </Segment>
            </Portal>
        )
    }
}