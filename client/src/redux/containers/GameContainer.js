import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Game from '../../components/Modals/Game/Game';
import { getGame } from '../actions/GameActions';

const mapStateToProps = state => ({
  teamName: state.games.game.teamName,
  totalPoints: state.games.game.totalPoints,
  points: state.games.game.points
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGame: getGame
    },
    dispatch
  );

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);

export default GameContainer;
