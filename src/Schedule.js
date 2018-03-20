import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Train from 'material-ui-icons/Train'
import Warning from 'material-ui-icons/Warning';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '60vw',
    minWidth: '350px',
    margin: '0 auto',
  },
});

const statusIcons = {
  'On Time': <ThumbUp style={{color: 'green'}} />,
  'Bus Substitution': <Warning style={{color: 'yellow'}} />,
  'Cancelled': <ThumbDown style={{color: 'red'}} />,
  'Arriving': <ThumbUp style={{color: 'green'}} />,
  'Now Boarding': <Train style={{color: 'green'}} />,
  'Arrived': <ThumbUp style={{color: 'green'}} />,
  'All Aboard': <Train style={{color: 'green'}} />,
  'Departed': <ThumbUp style={{color: 'green'}} />,
  'Delayed': <Warning style={{color: 'yellow'}} />,
  'Late': <ThumbDown style={{color: 'red'}} />,
}

function FolderList(props) {
  const { classes, schedule, selected } = props;
  const selectedTrains = schedule.filter(item => item.Origin === selected);

  return (
    <List className={classes.root}>
      <Paper>
        {selectedTrains.map((item, index) => (
          <ListItem key={`item-${index}`} divider >
            <Avatar>
              {statusIcons[item.Status] || <ImageIcon /> }
            </Avatar>
            <ListItemText
              primary={item.Destination}
              secondary={item.Status}
            />
            {(parseInt(item.Lateness,10)) ? 
              <ListItemText primary={`${Math.floor(parseInt(item.Lateness, 10) / 60)} Minutes Late`}/>
              : null
            }
            <ListItemSecondaryAction>
              <ListItemText
                primary={moment.unix(item.ScheduledTime).format('h:mm A')}
                secondary={`Trip ${item.Trip} Track: ${item.Track || 'TBD'}`}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </Paper>
    </List>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);