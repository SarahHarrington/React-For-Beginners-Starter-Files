import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {

    // this ref is different, it's a reference to the data in firebase
    const { params } = this.props.match;
    //first reinstate our localStorage
    const localStoreRef = localStorage.getItem(params.storeId);

    if (localStoreRef) {
      this.setState({
        order: JSON.parse(localStoreRef)
      })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }


  addFish = fish => {
    console.log('adding a fish')
    // 1. take a copy of the existing state (to avoid reaching in to the state object)
    const fishes = { ...this.state.fishes };
    // 2. Add the new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes // same thing as fishes: fishes
    })
  }

  updateFish = (key, updatedFish) => {
    //1. take a copy of the current state
    const fishes = {...this.state.fishes};
    //2. update the state
    fishes[key] = updatedFish;
    //3. set state
    this.setState({fishes: fishes})
  }

  deleteFish = (key) => {
    //1. take a copy of state
    const fishes = { ...this.state.fishes }
    //2. update the state
    fishes[key] = null;
    //3. update state
    this.setState({fishes: fishes})
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes})
  }

  addToOrder = (key) => {
    //1. take a copy of state
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    //2. Either add to the order, or update the number in quantity
    this.setState({order: order})
  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({order})
  }

  render() {
    return (
      
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => 
              <Fish 
                key={key}
                index={key}
                details={this.state.fishes[key]} 
                addToOrder={this.addToOrder}/>)}
          </ul>
        </div>

        <Order 
          fishes={this.state.fishes}
          order={this.state.order}
          removeBinding={this.removeFromOrder}
        />

        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    )
  }
}

export default App;