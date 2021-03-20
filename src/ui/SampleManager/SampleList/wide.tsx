import React from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, IconButton} from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons';

import {Props} from './index';
import ConfirmButton from '../ConfirmButton';

class SampleListWide extends React.Component<Props> {
  public render() {
    const {selectedSeqPlatform} = this.props;

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Coverage</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Output</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.sampleList.map(sample => {
            return <TableRow key={sample.id}>
              <TableCell style={{color: sample.color}}>
                {sample.getTypeName(this.props.sampleTypeList)}
              </TableCell>
              <TableCell>
                {sample.num}
                <IconButton onClick={() => this.props.setEditingSample(sample.id, 'num', String(sample.num))}>
                  <Edit/>
                </IconButton>
              </TableCell>
              <TableCell>
                {sample.getCoverage()}
                <IconButton onClick={() => this.props.setEditingSample(sample.id, 'coverage', sample.getCoverage())}>
                  <Edit/>
                </IconButton>
              </TableCell>
              <TableCell>
                {sample.size ? sample.size.toOriginalString() : ''}
                {sample.size ?
                  <IconButton
                    onClick={() => this.props.setEditingSample(sample.id, 'size', sample.size ? sample.size.toOriginalString() : '')}>
                    <Edit/>
                  </IconButton>
                  : ''}
              </TableCell>
              <TableCell>{selectedSeqPlatform ? sample.getOutput(selectedSeqPlatform) : ''}</TableCell>
              <TableCell>
                <ConfirmButton>
                  {(button: ConfirmButton) => {
                    const {clicked} = button.state;
                    return <IconButton
                      color={clicked ? 'secondary' : 'primary'}
                      onClick={() => clicked ? this.props.deleteSample(sample.id) : null}>
                      <Delete/>
                    </IconButton>
                  }}
                </ConfirmButton>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    );
  }
}

export default SampleListWide;
