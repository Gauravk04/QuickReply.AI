import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Dropdown, { DropdownProps } from '../components/Dropdown/Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    label: { control: 'text' },
    labelVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
    status: { control: 'radio', options: ['Unfilled', 'Filled', 'Disabled', 'Error'] },
    labelIconVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
    leftIconVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    text: { control: 'text' },
    type: { control: 'radio', options: ['SingleNoIcon', 'SingleRadio', 'Multi'] },
    activeItemIndex: { control: 'number' },
    items: { control: 'object' },
    onItemSelect: { action: 'selected' },
  },
} as Meta<DropdownProps>;

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Dropdown Label',
  labelVisibility: 'Visible',
  status: 'Unfilled',
  labelIconVisibility: 'Visible',
  leftIconVisibility: 'Visible',
  helperText: 'Helper text',
  required: false,
  text: '',
  type: 'SingleNoIcon',
  activeItemIndex: -1,
  items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
};


