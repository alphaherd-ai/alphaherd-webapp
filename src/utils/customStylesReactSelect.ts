const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      maxWidth: '100%',
      border: state.isFocused ? '1px solid #35BEB1' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '1px solid #35BEB1' : '#C4C4C4', 
        },
      boxShadow: state.isFocused ? 'none' : 'none',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      width: '100%',
      maxWidth: '100%',
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      maxWidth: '100%',
      color: state.isSelected ? '#6B7E7D' : '#6B7E7D',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      width: '100%',
      maxWidth: '100%',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#35BEB1' : 'white',
      color: state.isFocused ? 'white' : '#6B7E7D',
      '&:hover': {
        backgroundColor: '#35BEB1',
        color: 'white',
      },
    }),
  };

  export default customStyles;