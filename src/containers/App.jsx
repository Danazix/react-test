import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded } from '../actions';
import Head from '../components/Head';
import Posts from '../components/Posts';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';

/**
 * @class App
 * @desc main component that gets state from the store and wraps the dumb components
 */
class App extends Component {
  static propTypes = {
    requestedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  /**
   * @method componentDidMount
   * @desc requests subreddit posts
   */
  componentDidMount = () => {
    const { dispatch, requestedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(requestedSubreddit));
  };

  /**
   * @method handleChange
   * @desc gets selected subreddit and sends dispatch
   */
  handleChange = nextSubreddit => {
    const { dispatch } = this.props;
    dispatch(selectSubreddit(nextSubreddit));
    dispatch(fetchPostsIfNeeded(nextSubreddit));
  };

  render() {
    const { requestedSubreddit, posts, isFetching, classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Head value={requestedSubreddit} onChange={this.handleChange} />
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty data</h2>}
        {posts.length > 0 && (
          <div>
            <Posts posts={posts} />
          </div>
        )}
        <Alert stack={{ limit: 3 }} />
      </Paper>
    );
  }
}

const styles = {
  root: {
    display: 'flex',
    width: '60%',
    margin: 'auto',
    padding: 20,
    minWidth: 400,
    flexDirection: 'column',
  },
};

/**
 * @function connect
 * @desc connects to App that the component has a state
 */
export default connect(state => {
  const { requestedSubreddit, subredditPosts } = state;
  const { isFetching, items: posts } = subredditPosts[requestedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    requestedSubreddit,
    posts,
    isFetching,
  };
})(withStyles(styles)(App));
