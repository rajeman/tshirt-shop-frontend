import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class FilterCard extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Input type="text" name="search" placeholder="Search" />
        </FormGroup>
        <FormGroup>
          <Label for="Department">
            <span className="color-extra">Department</span>
          </Label>
          <Button className="w-100">
            <span className="color-extra">REGIONAL</span>
          </Button>
        </FormGroup>
        <FormGroup>
          <Button className="w-100">
            <span className="color-extra">NATURE</span>
          </Button>
        </FormGroup>
        <FormGroup>
          <Button className="w-100">
            <span className="color-extra">SEASONAL</span>
          </Button>
        </FormGroup>
        <FormGroup className="mt-5">
          <Label for="Category">
            <span className="color-extra">Category</span>
          </Label>
          <Button className="w-100">
            <span className="color-extra">FRENCH</span>
          </Button>
        </FormGroup>
        <FormGroup>
          <Button className="w-100">
            <span className="color-extra">ITALIAN</span>
          </Button>
        </FormGroup>
        <FormGroup>
          <Button className="w-100">
            <span className="color-extra">IRISH</span>
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
