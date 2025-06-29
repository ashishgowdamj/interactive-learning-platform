import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNameMap = {
    'topics': 'Topics',
    'html': 'HTML',
    'css': 'CSS',
    'js': 'JavaScript',
    'python': 'Python',
    'react': 'React.js',
    'profile': 'Profile',
    'search': 'Search Results'
  };

  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-item">
        🏠 Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[name] || name;

        return (
          <React.Fragment key={name}>
            <span className="breadcrumb-separator">›</span>
            {isLast ? (
              <span className="breadcrumb-item current">{displayName}</span>
            ) : (
              <Link to={routeTo} className="breadcrumb-item">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;