import imgs from '../../assets/index';
import './header.css';

function Header() {
    return (
        <div className="header-container">
            <h1 className="header-title">
            <img className="header-icon" src={imgs.logo} alt="logo"/>
                <span className="title-font">Space</span>stagram
            </h1>
            <p className="header-underline">Brought to you by NASA's Astronomy Photo of the Day API</p>
        </div>
    )
}

export default Header;