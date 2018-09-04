import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

/**
 * @class Posts
 * @desc dumb component that gets props and displays posts
 */
class Posts extends PureComponent {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { posts, classes } = this.props;
    const noImageLink =
      'https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png';

    return posts.map((post, i) => {
      return (
        <div className={classes.wrapper} key={i}>
          <a href={post.url} className={classes.link}>
            <Card className={classes.card}>
              <Typography variant="title" className={classes.title}>
                {post.title}
              </Typography>
              <CardMedia
                className={classes.media}
                image={
                  // image checkout (jpg or gif)
                  (post.preview &&
                    post.preview.images &&
                    post.preview.images[0] &&
                    ((post.preview.images[0].variants.gif &&
                      post.preview.images[0].variants.gif.source.url) ||
                      post.preview.images[0].source.url)) ||
                  noImageLink
                }
              />
            </Card>
          </a>
        </div>
      );
    });
  }
}

const styles = {
  wrapper: {
    width: '50%',
    display: 'inline-block',
  },
  link: {
    textDecoration: 'none',
  },
  card: {
    margin: 10,
  },
  title: {
    fontSize: 18,
    padding: 15,
  },
  media: {
    height: 500,
    width: '100%',
  },
};

export default withStyles(styles)(Posts);
