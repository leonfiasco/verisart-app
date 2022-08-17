import Header from './components/SiteHeader/Header';

import Wrapper from './components/Wrapper/Wrapper';
import CertificateList from './components/CertificateList/CertificateList';

const App = () => {
	return (
		<>
			<Header />
			<Wrapper>
				<CertificateList />
			</Wrapper>
		</>
	);
};

export default App;
