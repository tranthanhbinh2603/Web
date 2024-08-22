/* eslint-disable react/prop-types */
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import { PAGE_SIZE } from "../data/constant";
import { useSearchParams } from "react-router-dom";

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	background-color: ${(props) =>
		props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
	color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function Pagination({ length }) {
	const maxPage = Math.ceil(length / PAGE_SIZE);
	const [searchParams, setSearchParams] = useSearchParams();
	const pageCurrent = parseInt(searchParams.get("pages")) || 1;

	function next() {
		if (pageCurrent >= maxPage) return;
		searchParams.set("pages", pageCurrent + 1);
		setSearchParams(searchParams);
	}
	function previous() {
		if (pageCurrent <= 1) return;
		searchParams.set("pages", pageCurrent - 1);
		setSearchParams(searchParams);
	}
	if (length <= PAGE_SIZE) return <></>;

	return (
		<StyledPagination>
			<P>
				Show <span>{(pageCurrent - 1) * PAGE_SIZE + 1}</span> to{" "}
				<span>
					{pageCurrent === maxPage ? length : pageCurrent * PAGE_SIZE}
				</span>{" "}
				of <span>{length}</span> results
			</P>
			<Buttons>
				<PaginationButton onClick={previous}>
					<HiChevronLeft />
					<span>Previous</span>
				</PaginationButton>
				<PaginationButton onClick={next}>
					<span>Next</span>
					<HiChevronRight />
				</PaginationButton>
			</Buttons>
		</StyledPagination>
	);
}

export default Pagination;
