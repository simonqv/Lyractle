import palette from "./palette"

const loginContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const buttonStyle = {
    margin: '4px',
    padding: '5px',
    minWidth: '100px',
    color: palette.secondary,
    backgroundColor: palette.accent,
    borderRadius: '20px',
    border: 'none',
  };

export {loginContentStyle, buttonStyle}