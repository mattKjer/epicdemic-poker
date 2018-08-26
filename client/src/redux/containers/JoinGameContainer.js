import { connect } from 'react-redux';
import JoinGameModal from '../../components/JoinGameModal';

const mapStateToProps = state => ({
  gameNames: state
});

const JoinGameModalContainer = connect(mapStateToProps)(JoinGameModal);

export default JoinGameModalContainer;