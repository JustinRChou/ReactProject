import * as React from 'react'
import PropTypes from 'prop-types'
import { DragSource, DragSourceCollector } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { DustbinProp } from './Dustbin';
export interface BoxProp {
    isDragging?: boolean,
    name: string,
}
interface connectBoxProp {
    connectDragSource?: any
}
interface monitorBoxProp {
    isDragging?: any;
    getItem?: any;
    getDropResult?: any;
}
const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

const boxSource = {
    beginDrag(props: any) {
        return {
            name: props.name,
        }
    },

    endDrag(props: any, monitor: any) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
            alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
        }
    },
}

@DragSource(ItemTypes.BOX, boxSource, (connect: any, monitor: any) => ({
    connectDragSource: connect.dragSource() ,
    isDragging: monitor.isDragging(),
}))
export default class Box extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        const { isDragging, connectDragSource } = this.props
        const { name } = this.props
        const opacity = isDragging ? 0.4 : 1

        return connectDragSource(<div style={{ ...style, opacity }}>{name}</div>)
    }
}