import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import DeleteForever from 'material-ui-icons/DeleteForever';

import styles from './ManageStatus.scss';

class ManageStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      plans: [],
      courseList: []
    };
    this.handleChangeTrack = this.handleChangeTrack.bind(this);
    this.handleChangePlan = this.handleChangePlan.bind(this);
    this.handleAddPlan = this.handleAddPlan.bind(this);
    this.handleDeletePlan = this.handleDeletePlan.bind(this);
  }

  componentWillMount() {
    // sample course list
    let list = [
      'CS 100',
      'CS 101',
      'CS 105',
      'CS 125',
      'CS 173',
      'CS 196',
      'CS 199',
      'CS 210',
      'CS 233',
      'CS 241',
    ];
    let plan = {
      year: 2018,
      term: 0,
      courses: {
        'CS 100': false,
        'CS 101': false,
        'CS 105': false,
        'CS 125': false,
        'CS 173': false,
        'CS 196': false,
        'CS 199': false,
        'CS 210': false,
        'CS 233': false,
        'CS 241': false,
      }
    };
    this.setState({
      courseList: list,
      plans: [plan]
    });
  }

  handleChangeTrack(event, value) {
    this.setState({ value : value });
  }

  handleChangePlan(event, sIndex, name) {
    let plans = this.state.plans;
    plans[sIndex].courses[name] = event.target.checked;
    this.setState({ plans : plans});
  }

  handleAddPlan(event) {
    let plans = this.state.plans;
    let next;
    if (plans.length === 0) {
      next = {
        year: 2018,
        term: 0,
        courses: {},
      };
    } else {
      let semester = plans[plans.length - 1];
      let next_year = semester.term == 1 ? semester.year + 1 : semester.year;
      let next_term = semester.term == 1 ? 0 : 1;
      next = {
        year: next_year,
        term: next_term,
        courses: {},
      };
    }
    let courseList = this.state.courseList;
    for (let i = 0; i < courseList.length; i++) {
      next.courses[courseList[i]] = false;
    }
    plans.push(next);
    this.setState({ plans : plans });
  }

  handleDeletePlan(event) {
    let plans = this.state.plans;
    plans.pop();
    this.setState({ plans : plans });
  }

  render() {
    const { value, plans, courseList } = this.state;

    return (
      <div className='ManageStatus'>
        <Typography type="title" className='plan-title'>
          Your Plans
          <Button
            onClick={this.handleAddPlan}
            raised
            >
            Add Semester
          </Button>
        </Typography>
        <List className='plan-list'>
          {
            plans.map((semester, sIndex) => {
              let term = semester.term === 0 ? "Spring " : "Fall ";
              return (
                <ListItem
                  key={semester.year.toString() + semester.term.toString()}
                  className='plan-semester'
                  >
                  <FormGroup
                    className='plan-semester-courses'
                    row
                    >
                    {
                      Object.keys(semester.courses).map((course) => {
                        return (
                          <FormControlLabel
                            key={course}
                            control={
                              <Checkbox
                                checked={this.state.plans[sIndex].courses[course]}
                                onChange={(event) => this.handleChangePlan(event, sIndex, course)}
                                value={course}
                                />
                            }
                            label={course}
                            />
                        );
                      })
                    }
                  </FormGroup>
                  <Button
                    fab
                    mini
                    color="primary"
                    aria-label="add"
                    className='semester-delete-btn'
                    onClick={this.handleDeletePlan}
                    >
                    <DeleteForever />
                  </Button>
                  <Chip
                    label={term + semester.year}
                    className='plan-semester-chip'
                    />
                </ListItem>
              );
            })
          }
        </List>
      </div>
    );
  }

}

export default withCookies(ManageStatus);
