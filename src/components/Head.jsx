import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const options = ['sports', 'worldnews', 'soccer', 'funny', 'aww'];

/**
 * @class Head
 * @desc dumb component that gets props and displays the title and the select
 */
class Head extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  handleChange = e => {
    const { onChange } = this.props;
    const { value } = e.target;
    return onChange(value);
  };

  render() {
    const { value, classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="display1" className={classes.text}>
          {value.toUpperCase()}
        </Typography>
        <FormControl className={classes.form}>
          <InputLabel htmlFor="Subreddit">Subreddit</InputLabel>
          <Select
            onChange={this.handleChange}
            value={value}
            input={<Input name="Subreddit" id="Subreddit" />}
          >
            {options.map(option => (
              <MenuItem value={option} key={option}>
                <Typography>{option.toUpperCase()}</Typography>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select Subreddit</FormHelperText>
        </FormControl>
      </React.Fragment>
    );
  }
}

const styles = {
  text: {
    padding: 15,
  },
  form: {
    display: 'flex',
    width: '50%',
    alignSelf: 'flex-end',
  },
};

export default withStyles(styles)(Head);
