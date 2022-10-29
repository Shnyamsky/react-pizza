import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={467}
    viewBox="0 0 280 467"
    // viewBox="0 0 315 531"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="130" r="120" />
    <rect x="0" y="267" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="314" rx="10" ry="10" width="280" height="88" />
    <rect x="128" y="421" rx="23" ry="23" width="152" height="46" />
    <rect x="0" y="431" rx="10" ry="10" width="91" height="27" />
  </ContentLoader>
);

export default Skeleton;
