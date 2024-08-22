import styled from "styled-components";
import { getCurrentUser } from "../../services/apiLogin";
import { useQuery } from "@tanstack/react-query";

const StyledUserAvatar = styled.div`
	display: flex;
	gap: 1.2rem;
	align-items: center;
	font-weight: 500;
	font-size: 1.4rem;
	color: var(--color-grey-600);
`;

const Avatar = styled.img`
	display: block;
	width: 4rem;
	width: 3.6rem;
	aspect-ratio: 1;
	object-fit: cover;
	object-position: center;
	border-radius: 50%;
	outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
		refetchOnWindowFocus: true, // Refetch when the window gains focus
	});

	const { fullName, avatar } = user.user.user_metadata;
	const avatarUrl =
		avatar !== ""
			? `${avatar}?t=${new Date().getTime()}`
			: "../../../public/default-user.jpg";

	return (
		<StyledUserAvatar>
			<Avatar src={avatarUrl} />
			<span>{fullName}</span>
		</StyledUserAvatar>
	);
}

export default UserAvatar;
