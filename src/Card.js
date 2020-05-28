import React from 'react';

import {Avatar} from './Avatar';

import './App.css';

export class Card extends React.Component {
  handleDelete = (event) => {
    this.props.onDeleteCard({...this.props});

    event.stopPropagation();
  }

  handleModalInfo = (event) => {
    this.props.onModalInfo(this.props);
  }

  render() {
    const {imageSrc, description, avatars = []} = this.props;

    return (
      <div onClick={this.handleModalInfo} class="section-card flex-column">
          <div onClick={this.handleDelete} class="button-x-small">&#xd7;</div>
          {imageSrc ? <img class="section-card-image" src={imageSrc} alt=""></img> : null}
          <div class="section-card-info flex-row">
              <div class="section-card-info-text">{description}</div>
              <div class="section-card-info-graph flex-row">                
                  {
                    avatars.map(avatar => ( <Avatar {...avatar}/> ))
                  }                                                    
              </div>  
          </div>
      </div>
    )
  }    
}