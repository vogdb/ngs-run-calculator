import React from 'react';
import {Field, FieldAttributes} from 'formik';
import {TextField} from 'formik-material-ui';
import * as validation from './validationRules';

export interface Props {
  className: string
}

export class AmpliconMetagenome extends React.Component<Props> {

  render() {
    const props = this.props;
    return (
      <CoverageNumReads {...props}/>
    )
  }
}

export class ProEukaryoticGenome extends React.Component<Props> {

  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <BpSizeField label="Genome Size" {...props}/>
        <CoverageXField {...props}/>
      </React.Fragment>
    )
  }
}

export class HumanExome extends React.Component<Props> {
  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <BpSizeField label="Region Size" {...props}/>
        <CoverageXField {...props}/>
      </React.Fragment>
    )
  }
}

export class TargetedPanel extends React.Component<Props> {
  render() {
    const props = this.props;
    return (
      <React.Fragment>
        <BpSizeField label="Target Size" {...props}/>
        <CoverageXField {...props}/>
      </React.Fragment>
    )
  }
}

export class ProEukaryoticTranscriptome extends React.Component<Props> {

  render() {
    const props = this.props;
    return (
      <CoverageNumReads {...props}/>
    )
  }
}


export class ShotgunMetagenome extends React.Component<Props> {

  render() {
    const props = this.props;
    return (
      <CoverageNumReads {...props}/>
    )
  }
}

export class BpSizeField extends React.Component<FieldAttributes<any>> {


  render() {
    const props = this.props;

    return (
      <Field
        name="size"
        label={props.label}
        component={TextField}
        className={props.className}
        placeholder="100Kbp"
        validate={validation.validateSize}
      />
    )
  }
}

class CoverageXField extends React.Component<FieldAttributes<any>> {

  render() {
    const props = this.props;

    return (
      <Field
        name="coverageX"
        label="Coverage x"
        component={TextField}
        className={props.className}
        validate={validation.validateCoverage}
      />
    )
  }
}

class CoverageNumReads extends React.Component<FieldAttributes<any>> {

  render() {
    const props = this.props;

    return (
      <Field
        name="coverageNumReads"
        label="Coverage num reads"
        component={TextField}
        className={props.className}
        validate={validation.validateCoverage}
      />
    )
  }
}