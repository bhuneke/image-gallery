import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EditSelector from './edit-selector'

const GALLERY_TYPE = 'gallery';
const LIST_TYPE = 'list';
const THUMBNAIL_TYPE = 'thumbnail';

/////////   APP CLASS   /////////
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedView: '',
      resources: props.resources
    };
    this.onViewSelect = this.onViewSelect.bind(this);

  }

  onViewSelect(e, selected) {
    e.preventDefault();
    
    this.setState({
      selectedView: selected
    })
  }

  render() {
    return (
      <div>
        < ViewSelector onViewSelect={this.onViewSelect}/>
        < ViewDisplay selectedView={this.state.selectedView} resources={this.state.resources}/>
        < EditSelector />
      </div>
    )
  }
}
/////////   END APP CLASS   /////////


function ViewSelector(props) {
  return (
    <div className='view-selector'>
      <button onClick={(e, selected) => props.onViewSelect(e, LIST_TYPE)}>List View</button>
      <button onClick={(e, selected) => props.onViewSelect(e, THUMBNAIL_TYPE)}>Thumbnail View</button>
      <button onClick={(e, selected) =>props.onViewSelect(e, GALLERY_TYPE)}>Gallery View</button>
    </div>)
}

function ViewDisplay(props) {
    let selectedView = props.selectedView;
    if (selectedView === LIST_TYPE) {
        return <DetailList resources={props.resources} />
    }
    else if (selectedView === THUMBNAIL_TYPE) {
        return <ThumbnailList resources={props.resources} />
    }
    else if (selectedView === GALLERY_TYPE) {
        return <GalleryList resources={props.resources} />
    }
    else {
        return <p>Choose View!</p>
    }
}

/////////   LIST COMPONENTS   /////////
function DetailList(props) {
    const detailList = props.resources.map(resource => {
        return <DetailDisplay resource={resource}/>
    })
    return (
        <div>{detailList}</div>
    );
}

function ThumbnailList(props) {
    const thumbnailList = props.resources.map(resource => {
        return <ThumbnailDisplay resource={resource}/>
    })
    return (
        <div>{thumbnailList}</div>
    );
}

function GalleryList(props) {
    const galleryList = props.resources.map(resource => {
        return <GalleryDisplay resource={resource}/>
    })
    return (
        <div>{galleryList}</div>
    );
}
/////////   END LIST COMPONENTS   /////////

/////////   DISPLAY COMPONENTS   /////////
function DetailDisplay(props) {
console.log('here')
  return (
    <ul>
      <li>Title: {props.resource.title}</li>
      <li>Url: {props.resource.url}</li>
      <li>Description: {props.resource.description}</li>
    </ul>
  )  
}

function ThumbnailDisplay(props) {
  return (
    <div>
      <p>Title: {props.resource.title}</p>
      <img className='thumbnail' src={props.resource.url} alt='Cute Bunny'/>
    </div>
  )    
}

function GalleryDisplay(props) {
  return (
    <div>
      <p>Title: {props.resource.title}</p>
      <img className='gallery' src={props.resource.url} alt='Cute Bunny'/>
      <p>Description: {props.resource.description}</p>
    </div>
  ) 
}
/////////   END DISPLAY COMPONENTS   /////////


/////////   EXPORT   /////////
export {
    DetailDisplay,
    ThumbnailDisplay,
    GalleryDisplay
}