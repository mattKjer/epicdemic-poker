import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JoinGameModal from '../../components/JoinGameModal';
import { getGame } from '../../actions/itemActions';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGame: getGame
    },
    dispatch
  );

const JoinGameModalContainer = connect(null, mapDispatchToProps)(JoinGameModal);

export default JoinGameModalContainer;