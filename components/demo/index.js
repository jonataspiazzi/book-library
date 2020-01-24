import React, { Component } from 'react'
import SelectInput from '../common/selectInput';
import FormGroup from '../common/formGroup';
import ChecklistInput from '../common/checklistInput';

const modelDefault = {
  field1: {},
  field2: '',
  field3: {},
  field4: [],
  field5: [],
  field6: [],
};

export default class DemoIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: { ...modelDefault }
    };
  }

  onChange(fieldName, newValue) {
    const newModel = { ...this.state.model };

    newModel[fieldName] = newValue;

    this.setState({ model: newModel });
  }

  toggle() {
    this.setState({
      readonly: !this.state.readonly
    });
  }

  render() {
    return (
      <section className="content">
        <div className="row">
          <div className="col-xs-6">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Demo Page</h3>
              </div>
              <div className="box-body">
                <FormGroup label="Field1">
                  <SelectInput
                    value={this.state.model.field1}
                    onChange={nv => this.onChange('field1', nv)}
                    options={[
                      { id: 1, name: 'aaa'},
                      { id: 2, name: 'bbb'},
                      { id: 3, name: 'ccc'}]}
                    optionKey="id"
                    optionValue="name"
                    readonly={this.state.readonly} />
                </FormGroup>
                <FormGroup label="Field2">
                  <SelectInput
                    value={this.state.model.field2}
                    onChange={nv => this.onChange('field2', nv)}
                    options={['xxx', 'yyy', 'zzz']}
                    readonly={this.state.readonly} />
                </FormGroup>
                <FormGroup label="Field3">
                  <SelectInput
                    value={this.state.model.field3}
                    onChange={nv => this.onChange('field3', nv)}
                    options="http://127.0.0.1:9001/api/categories"
                    optionKey="id"
                    optionValue="name"
                    readonly={this.state.readonly} />
                </FormGroup>
                <FormGroup label="Field4">
                  <ChecklistInput
                    value={this.state.model.field4}
                    onChange={nv => this.onChange('field4', nv)}
                    options={[
                      { id: 1, name: 'aaa'},
                      { id: 2, name: 'bbb'},
                      { id: 3, name: 'ccc'}]}
                    optionKey="id"
                    optionValue="name"
                    readonly={this.state.readonly} />
                </FormGroup>
                <FormGroup label="Field5">
                  <ChecklistInput
                    value={this.state.model.field5}
                    onChange={nv => this.onChange('field5', nv)}
                    options={['xxx', 'yyy', 'zzz']}
                    readonly={this.state.readonly} />
                </FormGroup>

                <FormGroup label="Field6">
                  <ChecklistInput
                    value={this.state.model.field6}
                    onChange={nv => this.onChange('field6', nv)}
                    options="http://127.0.0.1:9001/api/categories"
                    optionKey="id"
                    optionValue="name"
                    readonly={this.state.readonly} />
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Model</h3>
              </div>
              <div className="box-body">
                <div className="form-control" style={{ fontFamily: 'Courier New'}}
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(this.state.model, null, 2)
                      .replace(/\n/g, '<br/>')
                      .replace(/ /g, '&nbsp;')
                  }}>
                </div>
              </div>
            </div>
          </div>        
        </div>
      </section>
    );
  }
}
