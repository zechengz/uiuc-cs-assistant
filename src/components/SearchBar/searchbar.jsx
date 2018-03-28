import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'


const dict = {
  'Basics':
  ['cs100','cs101','cs105','cs125','cs126','cs173','cs196','cs199','cs210','cs225','cs233','cs241','cs242',
  'cs296','cs357','cs361','cs374'],
  'Software Foundations':
  ['cs422','cs426','cs427','cs428','cs429','cs476','cs477','cs492','cs493','cs494','cs498 Software Testing','cs522','cs524','cs526','cs527','cs528','cs576'],
  'Algorithms and Models of Computation':
  ['cs413','cs473','cs475','cs476','cs477','cs481','cs482','cs571','cs572','cs573','cs574','cs575','cs576','cs579','cs583',
  'cs584'],
  'Intelligence and Big Data':
  ['cs410','cs411','cs412','cs414','cs440','cs443','cs445','cs446','cs447','cs466','cs467','cs510','cs511','cs512','cs543',
  'cs544','cs546','cs548','cs566','cs576','cs598 Mach Lrng for Signal Processng'],
  'Human and Social Impact':
  ['cs416','cs460','cs461','cs463','cs465','cs467','cs468','cs498 Art and Science of Web Prog','cs498RK','cs563','cs565'],
  'Media':
  ['cs414','cs418','cs419','cs445','cs465','cs467','cs498 Virtual Reality','cs519','cs565','cs598 Mach Lrng for Signal Processng'],
  'Scientific, Parallel, and High Performance Computing':
  ['cs419','cs450','cs457','cs466','cs482','cs483','cs484','cs519','cs554','cs555','cs556','cs558'],
  'Distributed Systems, Networking, and Security':
  ['cs423','cs424','cs425','cs431','cs436','cs438','cs439','cs460','cs461','cs463','cs483','cs484','cs523','cs524','cs525',
  'cs538','cs563'],
  'Machines':
  ['cs423','cs424','cs426','cs431','cs433','cs484','cs523','cs526','cs533','cs536','cs541','cs584','cs598 Parallel Programming'],
  'Group Project':
  ['cs427','cs428','cs429','cs445','cs465','cs467','cs493','cs494']
};

const suggestions = [];
const courses = [];
const fields = Object.values(Object.keys(dict));
let redirect = false;

function renderInput(inputProps) {
  const { classes, autoFocus, value, ref, ...other } = inputProps;

  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
      />
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
  ? []
  : suggestions.filter(suggestion => {
    const keep =
    count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    height: 200,
    zIndex: 10000,
    overflow: 'visible',
    visibility: 'visible',
    width: '40%',
    left: '35%',
    top: '40%',
    transform:
    'translate(-50%, -50%)',
    position: 'absolute',
    opacity: 1.0,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: '5%',
    right: 0,
    zIndex: 10000,
    overflow: 'visible',
    visibility: 'visible',
    top: '56%',

  },
  suggestion: {
    display: 'block',
    zIndex: 10000,
    overflow: 'visible',
    visibility: 'visible',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    zIndex: 10000,
    overflow: 'visible',
    visibility: 'visible',
    left: '55%',
    top: '55%',
  },
  textField: {
    height: '20%',
    width: '100%',
    zIndex: 10000,
    overflow: 'visible',
    visibility: 'visible',
    left: '55%',
    top: '55%',
    transform:
    'translate(-50%, -50%)',
    position: 'absolute',
    color: 'white',
  },
});

class IntegrationAutosuggest extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      fields: [],
      courses: [],
      users: [],
      redirect: false,
    };

    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderSuggestion= this.renderSuggestion.bind(this);
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);
    let itemName = suggestion.label
    let url = '';

    if (this.state.redirect == false) {

      if (courses.includes(itemName)){
        url = "/profile?name=" + itemName + "&type=class";
      }
      else if (fields.includes(itemName)){
        url = "/profile?name=" + itemName + "&type=class";
      }
      else{
        url = "/profile?name=" + itemName + "&type=user";
      }
    }

    return (
      <Link to = {url}>
        <MenuItem selected={isHighlighted} component="div" onClick={this.handleClick.bind(this)}>
          <div>
            {parts.map((part, index) => {
              return part.highlight ? (
                <span key={String(index)} style={{ fontWeight: 300 }}>
                  {part.text}
                </span>
              ) : (
                <strong key={String(index)} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>

              );
            })}
          </div>
        </MenuItem>
      </Link>
    );
  }

  componentWillMount(){
    let temp;
    let field;
    let course;

    for (let i = 0; i < fields.length; i++) {
      field = fields[i]
      // suggestions.push({label: field})
      temp = dict[field]
      for (let j =0; j < temp.length; j++ ){
        courses.push(temp[j])
        if (!suggestions.includes(temp[j]))
        {
          suggestions.push({label: temp[j]})
        }
      }
    }

    this.setState({
      fields: fields,
      courses: courses}, function () {
    });
  };

  handleClick(){
    window.location.reload(false);
    this.setState({
      redirect: true,
    });
    setTimeout(function() {
      this.setState({
        redirect: false,
      });
    }.bind(this), 1000);

  }

  handleSuggestionsFetchRequested ({ value }) {
    const maxUserAmount = 3;
    const that = this;
    /*
    axios.get ("/api/user/info" ,{
      params: {
        partialName: value
      }
    }).then (function (response){
      let users = response.data.data;
      let usrSuggestions = [];
      for (let i = 0; i < users.length; i ++) {
        usrSuggestions.push ({label: users[i]['name']});
      }
      that.setState ({
        suggestions: getSuggestions(value).concat(usrSuggestions.slice(0,3))
      })
    }).catch (function (error) {
      console.log (error);
    });
    */
    this.setState({
    suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested () {
    this.setState({
      suggestions: [],
    });
  };

  handleChange (event, { newValue }) {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: 'Search',
          value: this.state.value,
          onChange: this.handleChange,
        }}
        />
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
