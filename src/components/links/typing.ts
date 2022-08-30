// ./src/components/links/typing.ts
export interface IProps {
  route: string | { pathname: string };
  target?: '_blank' | '_self' | '_parent' | '_top';
  justifyContent?: 'start' | 'end' | 'center' | 'flex-start' | 'flex-end';
  fontSize?: number;
  fontWeight?: number;
  opacity?: number;
  nameColor?:
    | 'white'
    | 'whiteCloud'
    | 'black'
    | 'blue'
    | 'lightBlue'
    | 'red'
    | 'orange'
    | 'orangeCarrot'
    | 'gray'
    | 'purple'
    | 'greenEmerald'
    | 'greenSea'
    | 'yellowSunFlower'
    | 'yellowRisenShine';
}
