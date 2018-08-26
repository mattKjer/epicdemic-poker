import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemModal from '../../components/ItemModal';
import { createPoint, updatePoint } from '../../actions/itemActions';

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

const PointModalContainer = connect(mapStateToProps, mapDispatchToProps)(ItemModal);

export default PointModalContainer;
