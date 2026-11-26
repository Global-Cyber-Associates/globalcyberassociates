import { Helmet } from 'react-helmet-async';

// Belt-and-suspenders: robots.txt already disallows these routes, but a
// disallowed-but-linked URL can still get indexed with no snippet if a
// crawler ignores robots.txt. This guarantees an in-page noindex too.
const NoIndex = ({ children }) => (
  <>
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    {children}
  </>
);

export default NoIndex;
