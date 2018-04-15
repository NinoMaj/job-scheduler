import React from 'react';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Save from '@material-ui/icons/Save';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 355px;
  padding: 20px 20px 0;

  @media (max-width: 500px) {
    width: 296px;
    padding: 20px 2px 0;
  }
`;

const DateContainer = styled.div`
  margin: 20px auto 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 0;
  margin-bottom: 20px;
`;

const SaveText = styled.span`
  margin-right: 5px;
  height: 17px;
`;


class AddJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      date: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDateChange(date) {
    this.setState({ date });
  }

  async handleSubmit(event) {
    event.preventDefault();

    // Send action if there is a meesage and a date that is not in the past
    if (this.state.message !== '' && this.state.date !== null && this.state.date.isAfter(moment())) {
      this.props.addJob({
        message: this.state.message,
        // Convert moment object to JS date object
        date: this.state.date.toDate(),
        status: 'Active',
      });
      this.props.closeAfterSaving();
    }
  }

  render() {
    return (
      <Container>
        <TextField
          id="message"
          label="Message"
          name="message"
          placeholder="Enter a message..."
          autoFocus
          multiline
          rowsMax="5"
          value={this.state.message}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <DateContainer>
          <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
            showTimeSelect
            timeIntervals={5}
            timeCaption="Time"
            dateFormat="LLL"
            minDate={moment()}
            minTime={this.state.date && this.state.date.isBefore(moment()) ? moment() : moment().hours(0).minutes(0)}
            maxTime={moment().hours(23).minutes(59)}
            inline
          />
          <DateContainer />
          <ButtonContainer>
            <Button
              color="primary"
              variant="raised"
              size="large"
              aria-label="add"
              disabled={this.state.message === '' || !this.state.date}
              onClick={this.handleSubmit}
            >
              <SaveText>SAVE</SaveText>
              <Save />
            </Button>
          </ButtonContainer>
        </DateContainer>
      </Container>
    );
  }
}

AddJob.propTypes = {
  closeAfterSaving: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
};

AddJob.defaultProps = {
};

export default AddJob;
