import React, { Component } from 'react';
import './GroovyMovieApp.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { withRouter, Switch, Route } from 'react-router-dom';

import * as Actions from '../actions/actions';
import { NavBar, Browse, Collections } from '../components';

//TODO: fix actions using method

class GroovyMovieApp extends Component {
  renderBrowse = (movies, actions) => <Browse movies={movies} {...actions} />;

  render () {
    const actions = bindActionCreators(Actions, this.props.dispatch);
    const { isAuth, errorMessage, isFetching, username } = this.props.state.auth;
    const { movies } = this.props.state;

    return (
      <div className="app">
        <Grid centered>
          <Grid.Row columns={1}>
            <Grid.Column>
              <NavBar isAuth={isAuth} isFetching={isFetching} username={username} errorMessage={errorMessage} {...actions} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Switch>  
                <Route exact path='/' render={this.renderBrowse.bind({}, movies, actions)} />
                <Route exact path='/browse' render={this.renderBrowse.bind({}, movies, actions)} />
                <Route path='/collections' component={Collections} />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => ({ state }),
  (dispatch) => ({ dispatch })
)(GroovyMovieApp));