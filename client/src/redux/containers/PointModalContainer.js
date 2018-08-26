import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PointModal from '../../components/Modals/PointModal/PointModal';
import { createPoint, updatePoint } from '../actions/GameActions';

const mapStateToProps = state => ({
  userPoint: state.games.userPoint,
  teamName: state.games.game.teamName
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createPoint: createPoint,
      updatePoint: updatePoint
    },
    dispatch
  );

const PointModalContainer = connect(mapStateToProps, mapDispatchToProps)(PointModal);

export default PointModalContainer;
