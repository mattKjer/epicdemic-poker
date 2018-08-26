import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JoinGameModal from '../../components/JoinGameModal';
import { getPoints } from '../../actions/itemActions';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPoints: getPoints
    },
    dispatch
  );

const JoinGameModalContainer = connect(null, mapDispatchToProps)(JoinGameModal);

export default JoinGameModalContainer;