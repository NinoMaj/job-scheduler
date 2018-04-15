import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';

import JobItem from '../components/JobItem';

const Main = styled.section`
  width: 1000px;
  max-width: 85%;
  margin: 20px auto 50px;

  @media (max-width: 768px) {
    max-width: 98%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

const TableColumnStatus = TableColumn.extend`
  flex-basis: 150px;

  @media (max-width: 768px) {
    flex-basis: auto;
    min-width: 20px;
    width: 30px;
    text-align: center;
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

const Table = ({ jobs, deleteJob, handleClickOpen }) => (
  <Main>
    <ButtonContainer>
      <Button variant="fab" color="secondary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Button>
    </ButtonContainer>
    <TabelContainer>
      <TableHead >
        <TableColumn>Message</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn>Channel</TableColumn>
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
};

Table.defaultProps = {
  jobs: [],
};

export default Table;
