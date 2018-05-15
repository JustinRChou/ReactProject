import * as React from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router';
export interface DustbinProp {
    isOver: boolean,
    canDrop: boolean
}
export interface DustbinProp2 {
    connectDropTarget?: any;
}
const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

const boxTarget = {
    drop() {
        return { name: 'Dustbin' }
    },
}

@DropTarget(ItemTypes.BOX, boxTarget, (connect: any, monitor: any) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
export default class Dustbin extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    public render() {
        const { canDrop, isOver, connectDropTarget } = this.props
        const isActive = canDrop && isOver

        let backgroundColor = '#222'
        if (isActive) {
            backgroundColor = 'darkgreen'
        } else if (canDrop) {
            backgroundColor = 'darkkhaki'
        }

        return connectDropTarget(
            <div style={{ ...style, backgroundColor }}>
                {isActive ? 'Release to drop' : 'Drag a box here'}
            </div>,
        )
    }
}