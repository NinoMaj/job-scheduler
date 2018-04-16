import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RemoveIcon from '@material-ui/icons/Delete';
import moment from 'moment';

const JobItemRow = styled.div`
  display: flex;
  height: 50px;
  position: relative;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const JobItemCell = styled.div`
  display: flex;
  flex-basis: 300px;
  color: #444444;
  padding: 8px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden; 
  position: relative;

  &:after {
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    width: 7px;
    height: 50px;
    background: linear-gradient(90deg, transparent, colors.TABLE_BACKGROUND);;
  }

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const JobItemCellChannel = JobItemCell.extend`
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const JobItemCellStatus = JobItemCell.extend`
  flex-basis: 100px;

  @media (max-width: 768px) {
    flex-basis: auto;
    min-width: 20px;
    width: 30px;
  }
`;

const StatusText = styled.p`
    @media (max-width: 768px) {
      color: transparent;

      &:first-letter {
        color: #444444;
      }
  }
`;

const ActionCell = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  min-width: 40px;
  width: 50px;
  color: #444444;
  padding: 8px;

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

const StyledRemoveIcon = styled(RemoveIcon)`
  color: #E0E0E0;

  &:hover {
    cursor: pointer;
    color: #F44336;
  }
`;

const JobItem = ({
  id,
  message,
  date,
  channel,
  status,
  deleteJob,
}) => {
  const handleDeleteJob = () => {
    deleteJob(id);
  };

  return (
    <JobItemRow>
      <JobItemCell>{message}</JobItemCell>
      <JobItemCell>{moment(date).format('DD MMM YY, HH:mm')}</JobItemCell>
      <JobItemCellChannel>{channel}</JobItemCellChannel>
      <JobItemCellStatus><StatusText>{status}</StatusText></JobItemCellStatus>
      <ActionCell onClick={handleDeleteJob}><StyledRemoveIcon /></ActionCell>
    </JobItemRow>
  );
};

JobItem.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  channel: PropTypes.string,
  status: PropTypes.string.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

JobItem.defaultProps = {
  channel: '#general',
};


export default JobItem;
