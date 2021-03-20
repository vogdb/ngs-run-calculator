import React from 'react';
import {connect} from 'react-redux';
import {withStyles, Button, MenuItem, WithStyles, Grid, Typography, Theme, createStyles} from '@material-ui/core';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-material-ui';

import commonStyles from '../styles';
import {AppState} from '../../redux';
import {addSample} from '../../redux/sampleList/actions';
import {getSampleTypeList} from '../../redux/selectors';
import {SampleTypeList} from '../../redux/sampleTypeList/types';
import * as validation from './validationRules';
import * as SampleTypeFields from './SampleTypeFields';


const styles = (theme: Theme) => createStyles({
  ...commonStyles(theme),
  root: {
    justifyContent: 'center',
  },
  form: {
    textAlign: 'center'
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    width: '40%',
    minWidth: 200,
  }
});

interface Props extends WithStyles<typeof styles> {
  addSample: typeof addSample,
  sampleTypeList: SampleTypeList
}

class CreateSampleForm extends React.Component<Props> {

  render() {
    const {sampleTypeList, classes} = this.props;
    const initialValues = {
      type: '',
      num: '',
      size: '',
      coverageX: '',
      coverageNumReads: ''
    };

    return (
      <Grid item xs={12} container spacing={16} className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Add a new sample
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, {resetForm}) => {
              this.props.addSample(values);
              resetForm(initialValues);
            }}
          >
            {(formik) => {
              const state = formik.values || {};
              let SampleFields;
              if (state.type) {
                SampleFields = SampleTypeFields[state.type] as React.ComponentClass<SampleTypeFields.Props>;
              }
              return <Form className={classes.form}>
                <Field
                  type="text"
                  name="type"
                  label="Sample Type"
                  select
                  component={TextField}
                  className={classes.formControl}
                  validate={validation.validateType}
                >
                  {
                    sampleTypeList.map(sampleType => (
                      <MenuItem key={sampleType.id} value={sampleType.id}>
                        {sampleType.name}
                      </MenuItem>
                    ))
                  }
                </Field>
                <Field
                  name="num"
                  label="Number of samples"
                  component={TextField}
                  className={classes.formControl}
                  validate={validation.validateNumber}
                />

                {SampleFields ?
                  <SampleFields className={classes.formControl}/>
                  : ''
                }

                <Button type="submit" color="primary" variant="contained" className={classes.button}>
                  Add Sample
                </Button>
              </Form>
            }}
          </Formik>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {sampleTypeList: getSampleTypeList(state)};
};

export default withStyles(styles)(connect(mapStateToProps, {addSample})(CreateSampleForm));
