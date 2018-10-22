import React from 'react'
import { Header, Segment, Portal } from 'semantic-ui-react'

function Notification ({ openNotification, contentNotification}) {
        return (
            <Portal open={openNotification} onClose={() => this.setState({ openNotification: false })} >
                <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                    <Header>Hello!</Header>
                    <p>{contentNotification}</p>
                </Segment>
            </Portal>
        )
}

export default Notification;