import * as React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'
import { RouteComponentProps } from 'react-router';
export default class Container extends React.Component<any, any> {
    render() {
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
                    <div style={{ overflow: 'hidden', clear: 'both' }}>
                        <Dustbin />
                    </div>
                    <div style={{ overflow: 'hidden', clear: 'both' }}>
                        <Box name="Glass" />
                        <Box name="Banana" />
                        <Box name="Paper" />
                    </div>
                </div>
            </DragDropContextProvider>
        )
    }
}