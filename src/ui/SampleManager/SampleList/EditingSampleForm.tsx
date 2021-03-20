import React from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@material-ui/core';

import {Props} from './index';
import {validateCoverage, validateNumber, validateSize} from "../validationRules";
import {Sample} from "../../../redux/sampleList/types";

class EditingSampleForm extends React.Component<Props> {
  state = {
    error: undefined,
    fieldName: '',
    fieldValue: '',
  };

  updateNum = (e: any) => {
    const fieldValue = e.target.value;
    const error = validateNumber(fieldValue);
    this.setState({error, fieldValue});
  };

  updateSize = (e: any) => {
    const fieldValue = e.target.value;
    const error = validateSize(fieldValue);
    this.setState({error, fieldValue});
  };

  updateCoverage = (e: any) => {
    const fieldValue = e.target.value;
    const error = validateCoverage(fieldValue);
    this.setState({error, fieldValue});
  };

  cancelEditSample = () => {
    this.props.setEditingSample(-1, '', '');
    this.reset();
  };

  saveEditSample = () => {
    const {error, fieldValue} = this.state;
    const {sampleId, fieldName} = this.props.editingSample;
    if (!error && !!fieldValue) {
      this.props.editSample({sampleId, fieldName, fieldValue});
      this.cancelEditSample();
    }
  };

  reset = () => {
    this.setState({
      error: undefined,
      fieldName: '',
      fieldValue: '',
    });
  };


  render() {
    const editingSample = this.props.editingSample;
    const state = this.state;
    const sample = this.props.sampleList.find(s => s.id === editingSample.sampleId) || new Sample();
    return <Dialog key="editSample" open={editingSample.sampleId >= 0} onClose={this.cancelEditSample}>
      <DialogTitle id="form-dialog-title">
        Edit {sample.getTypeName(this.props.sampleTypeList)}
      </DialogTitle>
      <DialogContent>
        {editingSample.fieldName === 'num' ?
          <TextField value={state.fieldValue} placeholder={String(sample.num)} helperText={state.error} fullWidth
                     error={!!state.error} label="Number of samples" autoFocus margin="dense" onChange={this.updateNum}/>
          : null
        }
        {editingSample.fieldName === 'coverage' ?
          <TextField value={state.fieldValue} placeholder={sample.getCoverage()} helperText={state.error} fullWidth
                     error={!!state.error} label="Coverage" autoFocus margin="dense" onChange={this.updateCoverage}/>
          : null
        }
        {editingSample.fieldName === 'size' ?
          <TextField value={state.fieldValue} placeholder={sample.size ? sample.size.toOriginalString() : ''}
                     helperText={state.error} fullWidth error={!!state.error} label="Size"
                     autoFocus margin="dense" onChange={this.updateSize}/>
          : null
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={this.cancelEditSample} color="primary">
          Cancel
        </Button>
        <Button onClick={this.saveEditSample} disabled={!!state.error} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>;
  }
}

export default EditingSampleForm;
