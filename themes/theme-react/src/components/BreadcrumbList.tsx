import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BreadcrumbList as BreadcrumbListProps } from '@blog/common/interfaces/routes/breadcrumb';
import { CARD_MAX_WIDTH } from '@theme-react/constants';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: '100%',
      maxWidth: CARD_MAX_WIDTH
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1, 2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1)
      }
    },
    breadcrumbs: {
      '& > ol': {
        flexWrap: 'nowrap'
      },
      '& > ol > li:last-child': {
        overflowY: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }
  })
);

export const BreadcrumbList: React.FC<BreadcrumbListProps> = (props) => {
  const classes = useStyles();
  const breadcrumbItems = props.itemListElement || [];

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          className={classes.breadcrumbs}
        >
          {breadcrumbItems.map((item, index) => (
            <Link
              key={item.item}
              color={index === breadcrumbItems.length - 1 ? 'textPrimary' : 'inherit'}
              component={RouterLink}
              to={new URL(item.item).pathname}
            >
              {item.name}
            </Link>
          ))}
        </Breadcrumbs>
      </Paper>
    </div>
  );
};
