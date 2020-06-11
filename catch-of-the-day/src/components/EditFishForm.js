import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      // price: PropTypes.number,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  }

  handleChange = (event) => {
    console.log(event.currentTarget.value)
    //update that fish
    // 1. take a copy of the current fish
    const updatedFish = { 
      ...this.props.fish, 
      //computed variable name
      [event.currentTarget.name]: event.currentTarget.value
    }
    this.props.updateFish(this.props.index, updatedFish);
  }

  render() {
    return (
      <div className="fish-edit">
        <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name}/> 
        <input type="text" name="price" onChange={this.handleChange} value={formatPrice(this.props.fish.price)}/> 
        <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select> 
        <textarea type="text" name="desc" onChange={this.handleChange} value={this.props.fish.desc}></textarea> 
        <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image}/> 
        <button onClick={()=> this.props.deleteFish(this.props.index)}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm;