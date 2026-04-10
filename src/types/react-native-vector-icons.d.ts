declare module "react-native-vector-icons/FontAwesome5" {
  import { IconProps } from "react-native-vector-icons/Icon";
  import { Component } from "react";

  export default class Icon extends Component<IconProps> {}

  export function getImageSource(
    name: string,
    size?: number,
    color?: string,
  ): Promise<ImageSource>;

  export function getImageSourceSync(
    name: string,
    size?: number,
    color?: string,
  ): ImageSource;

  export function getRawGlyphMap(): { [name: string]: number };
  export function hasIcon(name: string): boolean;
}

declare module "react-native-vector-icons/MaterialIcons" {
  import { IconProps } from "react-native-vector-icons/Icon";
  import { Component } from "react";

  export default class Icon extends Component<IconProps> {}
}

declare module "react-native-vector-icons/Feather" {
  import { IconProps } from "react-native-vector-icons/Icon";
  import { Component } from "react";

  export default class Icon extends Component<IconProps> {}
}

declare module "react-native-vector-icons/Ionicons" {
  import { IconProps } from "react-native-vector-icons/Icon";
  import { Component } from "react";

  export default class Icon extends Component<IconProps> {}
}
