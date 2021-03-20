import React from 'react';
import SampleList from './SampleList';
import CreateSampleForm from './CreateSampleForm';

class SampleManager extends React.Component {

  public render() {
    return (
      <React.Fragment>
        <SampleList/>
        <CreateSampleForm/>
      </React.Fragment>
    );
  }
}

export default SampleManager
