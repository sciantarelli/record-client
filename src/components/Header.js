import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOpenNotes } from '../selectors/notes';


class AppLink extends Component {
  render() {
    const { location } = this.props;
    const toPath = this.props.to;
    const currentPath = location && location.pathname;
    const isCurrentPath = (currentPath == toPath);

    return(
      <li>
        { isCurrentPath ?
            <div>{this.props.children}</div> :
            <Link to={toPath}>{this.props.children}</Link>
        }
      </li>
    );
  }
}

const NavLink = withRouter(AppLink);

class Header extends Component {
  render() {
    const openNotesState = this.props.openNotesState;
    const { pathname } = this.props.location;

    return (
      <div className="header">
        <ul>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/notes">All Notes</NavLink>
        </ul>

        <ul>
          {/*TODO: Refactor this with Notes.js. Don't show ... when unnecessary */}
          {
            pathname != '/notes' &&
              Object.keys(openNotesState || {}).map(id =>
                <NavLink to={`/notes/${id}`}>
                  {openNotesState[id].name.substring(0,15)}...
                </NavLink>
              )
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  openNotesState: getOpenNotes(state.openNotesState)
});


// export default connect(mapStateToProps)(withRouter(Header));
export default withRouter(connect(mapStateToProps)(Header));
