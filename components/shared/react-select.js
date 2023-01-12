import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { styled } from '@nextui-org/react';

import { FlexDiv, Label } from './shared-components';

export function ReactSelect({
  label,
  options,
  placeholder,
  helperText,
  name = '',
  hookFormMethods = {},
  value = undefined,
  onChange = () => {},
}) {
  const props = {
    options,
    placeholder,
    name,
    hookFormMethods,
    value,
    onChange,
  };
  return (
    <FlexDiv css={{ flexDirection: 'column', w: '100%' }}>
      {label && <Label>{label}</Label>}
      <ControlReactSelect {...props} />
      {helperText && <HelperText>{helperText}</HelperText>}
    </FlexDiv>
  );
}

const ControlReactSelect = (props) => {
  const { hookFormMethods, options, name, placeholder, value, onChange } =
    props;
  const isServer = typeof window === 'undefined';

  return Object.keys(hookFormMethods).length === 0 ? (
    <_ReactSelect
      classNamePrefix='react-select'
      menuPlacement='auto'
      menuPortalTarget={!isServer && document.body}
      menuPosition='absolute'
      options={options}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      menuShouldScrollIntoView={false}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  ) : (
    <Controller
      control={hookFormMethods.control}
      name={name}
      defaultValue={value}
      {...hookFormMethods.register(name, { ...hookFormMethods.options })}
      render={({ field }) => (
        <_ReactSelect
          {...field}
          classNamePrefix='react-select'
          menuPlacement='auto'
          menuPortalTarget={!isServer && document.body}
          menuPosition='absolute'
          options={options}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuShouldScrollIntoView={false}
          placeholder={placeholder}
        />
      )}
    />
  );
};

const _ReactSelect = styled(Select, {
  w: '100%',
  '&  .react-select__control': {
    border: 0,
    py: '$1',
    pl: '$5',
    outline: 0,
    boxShadow: 'none',
    color: '$text',
    background: '$accents0',
    br: '$lg',
  },
  '& .react-select__value-container': { pl: 0, py: 0 },
  '& .react-select__indicator-separator': { mt: '8px' },
  '& .react-select__menu': {
    zIndex: '1000',
    br: '$sm',
  },
});

const HelperText = styled('span', {
  color: '$text',
  pl: '$4',
  fs: '$sm',
});
