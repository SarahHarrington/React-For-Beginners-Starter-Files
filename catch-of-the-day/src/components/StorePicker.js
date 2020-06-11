import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

  myInput = React.createRef();
  
  goToStore = (event) => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Get the text from the input
    const storeName = this.myInput.current.value
    // 3. Change the page to /store/whatever-they-entered
    // Since this component is a child of the React Router, we can access the methods
    this.props.history.push(`/store/${storeName}`)

  }

  //every class in react needs a mtethod inside, called render
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store:</h2>
        <input 
          type="text"
          ref={this.myInput}
          required 
          placeholder="Store Name" 
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store ►</button>
      </form>
    )
  }
}

export default StorePicker;