import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyleSidebar = styled.aside`
	background-color: var(--color-grey-0);
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-gray-100);
	grid-row: 1 / 3;
	display: flex;
	gap: 3.2rem;
	flex-direction: column;
`;

function Sidebar() {
	return (
		<StyleSidebar>
			<Logo />
			<MainNav />
		</StyleSidebar>
	);
}

export default Sidebar;
