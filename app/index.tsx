import { ScrollView } from "react-native";
import Home from '../components/Home/Home';

export default function Index() {
  return (
      <ScrollView>
        <Home/>
      </ScrollView>
  )
}



// change escape.json before build:

// {
//   "cli": {
//     "version": ">= 16.17.4",
//     "appVersionSource": "remote"
//   },
//   "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "distribution": "internal"
//     },
//     "production": {
//       "autoIncrement": true
//     }
//   },
//   "submit": {
//     "production": {}
//   }
// }




// default
// {
//   "cli": {
//     "version": ">= 16.17.4",
//     "appVersionSource": "remote"
//   },
//   "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "distribution": "internal"
//     },
//     "production": {
//       "autoIncrement": true
//     }
//   },
//   "submit": {
//     "production": {}
//   }
// }


// npx eas-cli build --clear-cache
