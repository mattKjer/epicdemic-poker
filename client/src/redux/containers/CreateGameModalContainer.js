import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreateGameModal from '../../components/CreateGameModal';
import { createGame, getGame } from '../../actions/itemActions';

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