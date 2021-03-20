import React from 'react';

import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  IconButton,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {Props} from './index';
import ConfirmButton from '../ConfirmButton';
import {Edit} from "@material-ui/icons";

const styles = (theme: Theme) => createStyles({
  panel: {
    padding: theme.spacing.unit,
  },
});

interface StyledProps extends WithStyles<typeof styles>, Props {
}

class SampleListNarrow extends React.Component<StyledProps> {
  public render() {
    const {selectedSeqPlatform} = this.props;

    return this.props.sampleList.map(sample => {
      // @ts-ignore
      return <ExpansionPanel defaultExpanded key={sample.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography variant="subtitle1" style={{color: sample.color}}>
            {sample.getTypeName(this.props.sampleTypeList)}, {sample.num}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{padding: '8px'}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Sample number</TableCell>
                <TableCell>
                  {sample.num}
                  <IconButton onClick={() => this.props.setEditingSample(sample.id,'num', String(sample.num))}>
                    <Edit/>
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Coverage</TableCell>
                <TableCell>
                  {sample.getCoverage()}
                  <IconButton onClick={() => this.props.setEditingSample(sample.id,'coverage', sample.getCoverage())}>
                    <Edit/>
                  </IconButton>
                </TableCell>
              </TableRow>
              {sample.size ?
                <TableRow>
                  <TableCell>Size</TableCell>
                  <TableCell>
                    {sample.size.toOriginalString()}
                    <IconButton onClick={() => this.props.setEditingSample(sample.id,'size', sample.size ? sample.size.toOriginalString() : '')}>
                      <Edit/>
                    </IconButton>
                  </TableCell>
                </TableRow>
                : null
              }
              <TableRow>
                <TableCell>Output</TableCell>
                <TableCell>{selectedSeqPlatform ? sample.getOutput(selectedSeqPlatform) : ''}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ConfirmButton>
            {(button: ConfirmButton) => {
              const {clicked} = button.state;
              return <Button
                variant="contained"
                color={clicked ? 'secondary' : 'primary'}
                onClick={() => clicked ? this.props.deleteSample(sample.id) : null}>
                Delete
              </Button>
            }}
          </ConfirmButton>
        </ExpansionPanelActions>
      </ExpansionPanel>
    });
  }
}

export default withStyles(styles)(SampleListNarrow);
