import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import CartIcon from '../assets/images/icons/cart-icon.png';
import './Header.css';

type HeaderProps = {
  cart: {
    productId: string;
    quantity: number;
    deliveryOptionId: string;
  }[];
};

export function Header({ cart }: HeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // I need to use a different variable name since "search"
  // is already being used below.
  const searchText = searchParams.get('search');

  // || '' is a shortcut. It means if searchText does not exist
  // it will use a default value of ''.
  const [search, setSearch] = useState(searchText || '');

  const updatingSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const searchProducts = (event?: React.MouseEvent<HTMLButtonElement>): void => {
    if (event) event.preventDefault();
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={LogoWhite} />
          <img className="mobile-logo" src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search"
          value={search} onChange={updatingSearchInput} />

        <button className="search-button" onClick={searchProducts}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
