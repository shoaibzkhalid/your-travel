import Profile from '../screens/ProfileScreen/Profile'
import { ICONS } from '../theme/icons'
import { HomeStackScreen } from '../navigation/stacks'

// URLS used in the app
export const placeHolderPhoto = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
export const GC_VISION_URL = `https://vision.googleapis.com/v1/images:annotate?key=`
export const GEO_CODE_URL = `https://maps.googleapis.com/maps/api/geocode/json`
export const GEO_NAMES_USERNAME = `shoaibzkhalid`
export const COVID_API_URL = `https://disease.sh/v3/covid-19/countries`

export const placeholderLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

// Constants lists in the app
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
]

export const bottomTabs = [
  {
    name: 'Explore',
    component: HomeStackScreen,
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
]

export const dummyData = [
  {
    name: 'PC Hotel',
    image: 'https://www.pchotels.com/asset/images/pc-hotel-karachi.jpg',
    price: '$100',
    rating: 4,
    location: 'New York',
  },
  {
    name: 'Movenpick',
    image: `https://www.ahstatic.com/photos/b8w7_ho_00_p_1024x768.jpg`,
    price: '$140',
    rating: 4,
    location: 'New York',
  },
  {
    name: 'Marriot Hotel',
    image: 'https://www.tohfay.com/images/products/598c0d1a059bb.jpg',
    price: '$100',
    rating: 4,
    location: 'New York',
  },

  {
    name: 'Sarena Hotel',
    image:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/183065428.jpg?k=23123f8db7249214d0796fdd0b446afa52e6ba89b5e9a5de1bb6899b00b876ff&o=&hp=1',
    price: '$100',
    rating: 4,
    location: 'New York',
  },
]
