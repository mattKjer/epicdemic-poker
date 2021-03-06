import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateGameModal from '../../components/Modals/CreateGameModal/CreateGameModal';
import { createGame, getGame } from '../actions/GameActions';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createGame: createGame,
      getGame: getGame
    },
    dispatch
  );

const CreateGameModelContainer = connect(null, mapDispatchToProps)(CreateGameModal);

export default CreateGameModelContainer;