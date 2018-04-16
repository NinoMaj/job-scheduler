import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';

import JobItem from '../components/JobItem';
import DateIcon from '../components/DateIcon';
import ArrowIcon from '../components/ArrowIcon';

const Main = styled.section`
  width: 1000px;
  max-width: 85%;
  margin: 20px auto 50px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TabelContainer = styled.div`
  color: #FFFFFF;
  background-color: #FFFFFF;
  border-radius: 4px;
  margin-top: 20px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

const TableHead = styled.div`
  display: flex;
  height: 60px;
  background-color: #35314B;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const TableColumn = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 300px;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 500;
  padding: 8px;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px;
  }
`;

const TableColumnChannel = TableColumn.extend`
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const TableColumnStatus = TableColumn.extend`
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
        color: #FFFFFF;
      }
  }
`;

const TableColumnAction = styled.div`
  display: flex;
  align-items: center;
  min-width: 40px;
  width: 50px;
  padding: 8px;

  @media (max-width: 768px) {;
    padding: 6px;
  }
`;

const IconButton = styled.div`
  margin-right: 20px;
`;

const ArrowIconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-top: 1px;
  margin-left: 4px;
  transform: ${props => (props.asc) ? 'rotate(0)' : 'rotate(180deg)'};
`;


const Table = ({ jobs, deleteJob, handleClickOpen, handleSortByDate, sortByDateAsc }) => (
  <Main>
    <ButtonsContainer>
      <IconButton>
        <Button onClick={handleSortByDate}>
          <DateIcon />
        </Button>
      </IconButton>
      <Button variant="fab" color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
    </ButtonsContainer>
    <TabelContainer>
      <TableHead >
        <TableColumn>Message</TableColumn>
        <TableColumn>
          Date
          {sortByDateAsc !== 'unsorted' ? (
            <ArrowIconContainer asc={sortByDateAsc}>
              <ArrowIcon />
            </ArrowIconContainer>
          ) : (
            null
          )}
        </TableColumn>
        <TableColumnChannel>Channel</TableColumnChannel>
        <TableColumnStatus><StatusText>Status</StatusText></TableColumnStatus>
        <TableColumnAction />
      </TableHead>
      {jobs.length > 0 &&
          jobs.map(job => (
            <JobItem
              key={job._id}
              id={job._id}
              message={job.message}
              date={job.date}
              channel={job.channel}
              status={job.status}
              deleteJob={deleteJob}
            />))
        }
    </TabelContainer>
  </Main>
);

Table.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object),
  deleteJob: PropTypes.func.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  sortByDateAsc: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  handleSortByDate: PropTypes.func.isRequired,
};

Table.defaultProps = {
  jobs: [],
};

export default Table;
