// ./src/components/texts/Paragraph/typing.ts
export interface IProps {
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
  textAlign?: 'start' | 'end' | 'center' | 'justify';
}
