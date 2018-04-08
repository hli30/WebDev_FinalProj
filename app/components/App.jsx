import React, {Component} from 'react';
import TopNavBar from './TopNavBar.jsx'
import AssetTypeContainer from './assetTypes/AssetTypeContainer.jsx'

export default class App extends Component {
  render () {
    return (
      <div>
        <TopNavBar/>
        <AssetTypeContainer/>
      </div>   
    )
  }
}


