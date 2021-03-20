import React from 'react';
import {Grid} from '@material-ui/core';
import SeqPlatformSelector from './SeqPlatformSelector';
import Calculator from './Calculator';
import SampleManager from './SampleManager';

class App extends React.Component {
  render() {
    return (
      <div style={{flexGrow: 1}}>
        <Grid container spacing={32} style={{justifyContent: 'center'}}>
          <SeqPlatformSelector/>
          <Calculator/>
          <SampleManager/>
        </Grid>
      </div>
    )
  }
}

export default App;
