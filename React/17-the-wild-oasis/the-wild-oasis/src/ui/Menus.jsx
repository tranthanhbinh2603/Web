/* eslint-disable react/prop-types */
import styled from "styled-components";

import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../features/cabins/useOutsideClick";

// const StyledMenu = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: flex-end;
// `;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledList = styled.ul`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.position.x}px;
	top: ${(props) => props.position.y}px;

	z-index: 1000;
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

const MenusContext = createContext();

function Menus({ children }) {
	const [idOpen, setIdOpen] = useState("");
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const close = () => setIdOpen("");
	const open = setIdOpen;

	return (
		<MenusContext.Provider
			value={{ idOpen, close, open, position, setPosition }}
		>
			{children}
		</MenusContext.Provider>
	);
}

function Toggle({ id }) {
	const { idOpen, close, open, setPosition } = useContext(MenusContext);
	function handleOnClick(e) {
		const rect = e.target.closest("button").getBoundingClientRect();
		setPosition({
			x: window.innerWidth - rect.width - rect.x - 10,
			y: rect.y + rect.height + 8,
		});
		idOpen === "" || idOpen !== id ? open(id) : close();
	}
	return (
		<StyledToggle onClick={handleOnClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}

function List({ children }) {
	const { close, position } = useContext(MenusContext);
	console.log(position);
	const ref = useOutsideClick(close);
	return (
		<ul>
			<StyledList ref={ref} position={position}>
				{children}
			</StyledList>
		</ul>
	);
}

function Button({ children, id, icon, onClick }) {
	const { idOpen } = useContext(MenusContext);
	if (idOpen !== id) return null;
	return (
		<li>
			<StyledButton onClick={onClick}>
				<span>{icon}</span>
				{children}
			</StyledButton>
		</li>
	);
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
