import React from 'react';
import {Droppable, Draggable} from 'react-beautiful-dnd';

import './App.css';

import {Card} from './Card';
import {Header} from './Header';
import {CreatePanel} from './CreatePanel'
import { Panel } from './Panel';

export class Section extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            createPanel: false,
            title: '',
            description: ''
        }
    }    

    onCreateCard = () => {
        let {onCreateCard} = this.props;
        const {title, description} = this.state;

        onCreateCard(title, description);

        this.setState({
            createPanel: false
        })
    }

    onChangeTitleOrDescription = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }

    onCloseCreatePanel = () => {
        this.setState({
            createPanel: false
        })
    }

    onClickNewCard = () => {
        this.setState({
            createPanel: true
        })
    }

    render() {
        let {status, cards, onModalInfo, onDeleteCard} = this.props;
        const {createPanel} = this.state;

        return (
            <div class="section flex-column">
                <Header 
                    text={status}
                    amount={cards.length}
                    onClickNewCard={this.onClickNewCard} 
                />  
                {createPanel && 
                <Panel 
                    onClickOutside={this.onCloseCreatePanel}
                    position="relative"
                    top="-2px"
                    left="8px"
                >
                    <CreatePanel 
                        onCreate={this.onCreateCard}
                        onChange={this.onChangeTitleOrDescription}
                    />
                </Panel>}
                <Droppable droppableId={status}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}>
                            {cards && cards.map((card, index) => (
                                <Draggable 
                                    key={card._id}
                                    draggableId={card._id} 
                                    index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>                                            
                                            <Card 
                                                onDeleteCard={onDeleteCard} 
                                                onModalInfo={onModalInfo}
                                                {...card} 
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}    
                </Droppable>                      
            </div>
        )
    }
}