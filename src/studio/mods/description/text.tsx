import * as React from 'react';
import { Form, Input, Col, Row, Select, } from 'antd';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import idraw from 'idraw';
import { FieldData } from './base';
import { ColorPicker } from './color';
import { limitNum } from '../../util/value';

const { Option } = Select;
const { TextArea } = Input;

interface DescFormProps {
  elem: TypeElement<'text'>
  onChange?: (desc: TypeElemDesc['text']) => void;
}

export const TextDescForm: React.FC<DescFormProps> = ({ onChange, elem }) => {

  const fields = [
    { name: ['text'], value: elem.desc.text || '' },
    { name: ['color'], value: elem.desc.color || '' },
    { name: ['fontSize'], value: elem.desc.fontSize || 12 },
    { name: ['fontFamily'], value: elem.desc.fontFamily || 'sans-serif' },
    { name: ['textAlign'], value: elem.desc.textAlign || 'left' },
    { name: ['lineHeight'], value: elem.desc.lineHeight || elem.desc.fontSize },
    { name: ['borderWidth'], value: elem.desc.borderWidth || 0 },
    { name: ['borderRadius'], value: elem.desc.borderRadius || 0 },
    { name: ['borderColor'], value: elem.desc.borderColor || '' },
  ];

  return (<Form
      name="rect-desc"
      layout="inline"
      fields={fields}
      onFieldsChange={(_, allFields: FieldData[]) => {
        if (typeof onChange === 'function') {
          const newDesc = parseFiledsData(allFields);

          console.log('newDesc ===', newDesc)
          console.log('idraw.check.textDesc(newDesc) =====', idraw.check.textDesc(newDesc));
         
          if (idraw.check.textDesc(newDesc)) {
            const desc = {...elem.desc, ...newDesc};
            onChange(desc);
          }
        }
      }}
    >
      <Row>
        <Col span="24">
          <Form.Item
            name="text"
            label="Text" >
            <TextArea rows={10} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Form.Item
            name="color"
            label="Color" >
            <ColorPicker />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Form.Item
            name="fontSize"
            label="Font Size" >
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Form.Item name="fontFamily" label="Font Family" >
            <Select style={{ width: 120 }} size="small">
              <Option value="sans-serif">sans-serif</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <Form.Item
            name="lineHeight"
            label="Line Height" >
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Form.Item
            name="borderWidth"
            label="Border Width" >
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Form.Item
            name="borderRadius"
            label="Border Radius" >
            <Input type="number" size="small" />
          </Form.Item>
        </Col>
      </Row>
  
      <Row>
        <Col span="24">
          <Form.Item
            name="borderColor"
            label="Border Color">
            <ColorPicker />
          </Form.Item>
        </Col>
      </Row>
      
    </Form>
  )
};

function parseFiledsData(fields: FieldData[]) {
  const desc = {
    // color: '#ffffff',
    // borderColor: '',
    // borderRadius: 0,
    // borderWidth: 0,
  };
  // TODO
  const attrKeys = [
    'text', 'fontSize', 'lineHeight', 'fontFamily', 'textAlign',
    'color', 'borderColor', 'borderRadius', 'borderWidth'];
  fields.forEach((item: FieldData) => {
    if (attrKeys.includes(item.name[0])) {
      switch (item.name[0]) {
        case 'text': {
          if (idraw.is.text(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'fontSize': {
          if (idraw.is.fontSize(parseFloat(item.value))) {
            desc[item.name[0]] = parseFloat(item.value); 
          }
          break;
        }
        case 'lineHeight': {
          if (idraw.is.lineHeight(parseFloat(item.value))) {
            desc[item.name[0]] = parseFloat(item.value); 
          }
          break;
        }
        case 'fontFamily': {
          if (idraw.is.fontFamily(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'textAlign': {
          if (idraw.is.textAlign(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'color': {
          if (idraw.is.color(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'borderColor': {
          if (idraw.is.color(item.value)) {
            desc[item.name[0]] = item.value; 
          }
          break;
        }
        case 'borderRadius': {
          if (idraw.is.borderRadius(parseFloat(item.value))) {
            desc[item.name[0]] = limitNum(parseFloat(item.value)); 
          }
          break;
        }
        case 'borderWidth': {
          if (idraw.is.borderWidth(parseFloat(item.value))) {
            desc[item.name[0]] = limitNum(parseFloat(item.value)); 
          }
          break;
        }
        default: {
          break;
        }
      }
    }
  });
  return desc;
}