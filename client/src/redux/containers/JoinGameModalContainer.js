import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JoinGameModal from '../../components/Modals/JoinGameModal/JoinGameModal';
import { joinGame } from '../actions/GameActions';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        joinGame: joinGame
    },
    dispatch
  );

const JoinGameModalContainer = connect(null, mapDispatchToProps)(JoinGameModal);

export default JoinGameModalContainer;