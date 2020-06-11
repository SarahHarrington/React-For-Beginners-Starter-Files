import React from 'react';
import Proptypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static propTypes = {
    fishes: Proptypes.object,
    loadSampleFishes: Proptypes.func,
    updateFish: Proptypes.func
  }

  state = {
    uid: null,
    owner: null
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({user})
      }
    })
  }

  authHandler = async (authData) => {
    //1. Look up the current store in firebase database
    const store = await base.fetch(this.props.storeId, {context: this})
    //2. Claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    //3. Set the state of the inventory comp to refelct current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebase.auth().signInWithPopup(authProvider).then(this.authHandler).catch(function(error) {
      console.log('there was an error', error)
    });
  }

  logout = async () => {
    console.log('logging out')
    await firebase.auth().signOut();
    this.setState({
      uid: null
    })
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>
    //1. Check if the user is logged in
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
    }
    //2. check if they're not the owner
    if (this.state.uid !== this.state.owner ) {
      return (
        <div>
          <p>You are not the owner of this store</p>
          {logout}
        </div>
      )
    }

    //3. they must be the owner, just render inventory

    return (
      <div className="inventory">
        <h2>Inventory</h2>
          {logout}
          {Object.keys(this.props.fishes).map(key => (
            <EditFishForm 
              key={key} 
              index={key} 
              fish={this.props.fishes[key]} 
              updateFish={this.props.updateFish} 
              deleteFish={this.props.deleteFish}/> 
            )
          )}
        
        <AddFishForm 
          addFish={this.props.addFish}
        />

        <button 
          onClick={this.props.loadSampleFishes}
        >
          Load Sample Fishes
        </button>
      </div>
    )
  }
}

export default Inventory;