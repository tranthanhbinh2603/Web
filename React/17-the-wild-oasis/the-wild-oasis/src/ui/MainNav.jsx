import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
	HiOutlineCalendarDays,
	HiOutlineCog6Tooth,
	HiOutlineHome,
	HiOutlineHomeModern,
	HiOutlineUser,
} from "react-icons/hi2";
// import Uploader from "../data/Uploader";

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const StyleNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	/* This works because react-router places the active class on the active NavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		background-color: var(--color-grey-50);
		border-radius: var(--border-radius-sm);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

function MainNav() {
	return (
		<nav>
			<NavList>
				<li>
					<StyleNavLink to="/dashboard">
						<HiOutlineHome />
						<span>Home</span>
					</StyleNavLink>
				</li>
				<li>
					<StyleNavLink to="/bookings">
						<HiOutlineCalendarDays />
						Bookings
					</StyleNavLink>
				</li>
				<li>
					<StyleNavLink to="/cabins">
						<HiOutlineHomeModern />
						Cabin
					</StyleNavLink>
				</li>
				<li>
					<StyleNavLink to="/users">
						<HiOutlineUser />
						User
					</StyleNavLink>
				</li>
				<li>
					<StyleNavLink to="/settings">
						<HiOutlineCog6Tooth />
						Settings
					</StyleNavLink>
				</li>
				{/* <Uploader /> */}
			</NavList>
		</nav>
	);
}

export default MainNav;
