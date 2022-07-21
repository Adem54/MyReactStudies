import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
//Bu component her turlu durumda gelmesi gerekiyor yani her sayfada bizi karsilamasi gerekiyor ondan dolayi ana component olan
//component icerisine yerlestirmemiz gerekiyor, ki ana componentimiz Layout idi zaten ana director dan erisiliyordu adreste o zaman
//biz de bunu oraya yerlestirecegiz...