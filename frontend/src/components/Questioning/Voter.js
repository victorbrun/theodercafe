import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { withStyles } from '@material-ui/styles';
import style from './style';

const Voter = ({ classes, questionId, isUpVote, vote }) => {
  let downVoteClass = classes.neutralVote;
  let upVoteClass = classes.neutralVote;
  if (isUpVote === true) {
    upVoteClass = classes.upVote;
  } else if (isUpVote === false) {
    downVoteClass = classes.downVote;
  }

  return (
    <div className={classes.upVote}>
      <Tooltip title="Je n'aime pas cette question">
        <IconButton className={downVoteClass} onClick={() => vote(questionId, false)}>
          <ThumbDown />
        </IconButton>
      </Tooltip>
      <Tooltip title="J'aime cette question">
        <IconButton className={upVoteClass} onClick={() => vote(questionId, true)}>
          <ThumbUp />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default withStyles(style)(Voter);
