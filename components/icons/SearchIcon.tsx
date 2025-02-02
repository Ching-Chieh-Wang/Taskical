import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg";

const SearchIcon =({size=24, color="#000000"}) => (
  <Svg  viewBox="0 0 24 24" width={size} height={size} color={color} fill="none" >
    <Path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </Svg>
);

export default SearchIcon;
