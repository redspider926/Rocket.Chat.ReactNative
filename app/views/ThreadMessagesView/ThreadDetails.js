import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { CustomIcon } from '../../lib/Icons';
import { themes } from '../../constants/colors';
import { formatDateThreads } from '../../utils/room';
import sharedStyles from '../Styles';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center'
	},
	detailsContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	detailContainer: {
		marginRight: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	detailText: {
		fontSize: 10,
		marginLeft: 2,
		...sharedStyles.textSemibold
	},
	badgeContainer: {
		right: 0,
		position: 'absolute',
		flexDirection: 'row',
		alignItems: 'center'
	},
	badge: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginRight: 8
	}
});

const ThreadDetails = ({
	item,
	user,
	badgeColor,
	toggleFollowThread,
	style,
	theme
}) => {
	let tlm;
	if (item?.tlm) {
		tlm = formatDateThreads(item.tlm);
	}

	let { tcount } = item;
	if (tcount >= 1000) {
		tcount = '+999';
	} else if (tcount >= 100) {
		tcount = '+99';
	}

	let replies = item?.replies?.length ?? 0;
	if (replies >= 1000) {
		replies = '+999';
	} else if (replies >= 100) {
		replies = '+99';
	}

	const isFollowing = item.replies?.find(u => u === user?.id);

	return (
		<View style={[styles.container, style]}>
			<View style={styles.detailsContainer}>
				<View style={styles.detailContainer}>
					<CustomIcon name='threads' size={20} color={themes[theme].auxiliaryText} />
					<Text style={[styles.detailText, { color: themes[theme].auxiliaryText }]} numberOfLines={1}>{tcount}</Text>
				</View>

				<View style={styles.detailContainer}>
					<CustomIcon name='user' size={20} color={themes[theme].auxiliaryText} />
					<Text style={[styles.detailText, { color: themes[theme].auxiliaryText }]} numberOfLines={1}>{replies}</Text>
				</View>

				<View style={styles.detailContainer}>
					<CustomIcon name='clock' size={20} color={themes[theme].auxiliaryText} />
					<Text style={[styles.detailText, { color: themes[theme].auxiliaryText }]} numberOfLines={1}>{tlm}</Text>
				</View>
			</View>

			<Touchable style={styles.badgeContainer} onPress={() => toggleFollowThread?.(isFollowing, item.id)}>
				<>
					{badgeColor ? <View style={[styles.badge, { backgroundColor: badgeColor }]} /> : null }
					<CustomIcon
						size={24}
						name={isFollowing ? 'notification' : 'notification-disabled'}
						color={themes[theme].auxiliaryTintColor}
					/>
				</>
			</Touchable>
		</View>
	);
};
ThreadDetails.propTypes = {
	item: PropTypes.object,
	user: PropTypes.object,
	badgeColor: PropTypes.string,
	toggleFollowThread: PropTypes.func,
	style: PropTypes.object,
	theme: PropTypes.string
};

export default ThreadDetails;
