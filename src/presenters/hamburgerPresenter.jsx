// HamburgerPresenter.jsx
import { useState } from 'react';

function useHamburgerPresenter() {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return {
    isActive,
    toggleDropdown,
  };
}

export default useHamburgerPresenter;
