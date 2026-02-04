import { StyleSheet, Text, View, Pressable } from 'react-native';
import Pola from './../json/Pola.json';

function Bingo() {
  return (
    <View style={gridStyle.bingoGrid}>
      <Losuj />
      <Pressable>
        <Text style={gridStyle.reset}>RESET</Text>
      </Pressable>
    </View>
  );
}

function Losuj() {
  let lastid = Pola.pola.length;
  let setOfTexts = new Set<string>();

  for (let i: number = 0; i < 25; i++) {
    if (i === 12) {
      setOfTexts.add('Darmowe!');
      continue;
    }

    let text: string | undefined;

    do {
      text = Pola.pola.at(Math.floor(Math.random() * lastid))?.text;
    } while (text && setOfTexts.has(text));

    if (text) setOfTexts.add(text);
  }
  const arrayOfText = Array.from(setOfTexts);

  const rows = [];
  for (let r = 0; r < 5; r++) {
    const cells = [];
    for (let c = 0; c < 5; c++) {
      cells.push(
        <Pressable key={c}>
          <Field value={arrayOfText.at(r * 5 + c) ?? ''} />
        </Pressable>,
      );
    }
    rows.push(
      <View key={r} style={[gridStyle.gridRow, r === 0 && gridStyle.topRow]}>
        {cells}
      </View>,
    );
  }

  return <View>{rows}</View>;
}

type fieldProps = {
  value: string;
};

function Field({ value }: fieldProps) {
  return (
    <Pressable style={gridStyle.fieldBox}>
      <Text style={gridStyle.fieldText}>{value}</Text>
    </Pressable>
  );
}

const gridStyle = StyleSheet.create({
  bingoGrid: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  fieldBox: {
    width: 80,
    height: 80,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldText: {
    fontFamily: 'FunnelSans-Regular',
    padding: 5,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 12,
  },
  topRow: {
    borderTopWidth: 1,
  },
  gridRow: {
    flexDirection: 'row',
    borderLeftWidth: 1,
  },
  reset: {
    backgroundColor: '#80c3ff',
    borderColor: '#6dbbff',
    borderWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    paddingLeft: 100,
    paddingRight: 100,
    fontSize: 15,
    color: '#363636',
  },
});

export default Bingo;
