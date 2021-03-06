import React, { Suspense, lazy } from 'react';
import { Div } from './Elements';

const MapWrapper = lazy(() => import(/* webpackChunkName: 'MapWrapper' */ './MapWrapper'));
const GameType = lazy(() => import(/* webpackChunkName: 'GameType' */ './GameType'));
const YourTeam = lazy(() => import(/* webpackChunkName: 'YourTeam' */ './YourTeam'));
const Payment = lazy(() => import(/* webpackChunkName: 'Payment' */ './Payment'));

export class ResultFragment extends React.Component {
  state = {
    currentTab: '',
    currentGame: {}
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentTab: nextProps.currentTab
    });
  }
  setDist = (distance) => {
    this.props.setLocation(`upto ${distance} near you`);
    this.props.changeTab('Game Type');
  }
  setGame = (game) => {
    this.setState({
      currentGame: game
    }, () => {
      this.props.setGameName(game.gameName);
      this.props.changeTab('Your Team');
    })
  }
  render() {
    let ResultComp = <MapWrapper />;
    switch (this.state.currentTab) {
      case 'location': ResultComp = <MapWrapper getDist={this.setDist} />; break;
      case 'Game Type': ResultComp = <GameType setGame={this.setGame} />; break;
      case 'Your Team': ResultComp = <YourTeam game={this.state.currentGame} setTeam={this.props.setTeam} />; break;
      case 'payment': ResultComp = <Payment />; break;
    }
    if (ResultComp == null) return;
    return (
      <Div className={`container-fluid resultFragment w-100 p-3 ${this.state.currentTab === 'Your Team' || this.state.currentTab === 'payment' ? 'aqua' : 'primary'}`}>
        <Suspense fallback={<Div>Connecting to payment gateway...</Div>}>
          {ResultComp}
        </Suspense>
      </Div>
    );
  }
  componentWillUnmount() {
    console.log(this.state.currentTab);
  }
}