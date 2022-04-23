import Profile from '../screens/ProfileScreen/Profile';
import HomeScreen from '../screens/HomeScreen';
import { ICONS } from '../theme/icons';

const placeHolderPhoto = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`;

export const constants = {
  placeHolderPhoto,
};

export const profileFields = [
  {
    label: 'Name',
    name: 'displayName',
    placeholder: 'Name',
    rules: {
      required: true,
    },
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Email',
    rules: {
      required: false,
    },
  },

  {
    label: 'Country',
    name: 'country',
    placeholder: 'Country',
    rules: {
      required: false,
    },
  },
  {
    label: 'Phone Number',
    name: 'phoneNumber',
    placeholder: 'Phone Number',
    rules: {
      required: false,
    },
  },
];

export const bottomTabs = [
  {
    name: 'Explore',
    component: HomeScreen,
    icon: ICONS.explore,
  },
  {
    name: 'Profile',
    component: Profile,
    icon: ICONS.profile,
  },

  {
    name: 'Logout',
    component: Profile,
    icon: ICONS.logout,
  },
];
