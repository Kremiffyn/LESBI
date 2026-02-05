import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Pola from './../json/Pola.json';
import { useState } from 'react';

function Bingo() {
  const [resetCounter, setResetCounter] = useState(0);
  const [rows, setRows] = useState(GenerateFields(0));

  const Reset = () => {
    const next = resetCounter + 1;
    setResetCounter(next);
    setRows(GenerateFields(next));
  };

  return (
    <View style={gridStyle.bingoGrid}>
      <BingoGrid rows={rows} resetCounter={resetCounter} />
      <Pressable onPress={Reset}>
        <Text style={gridStyle.reset}>RESET</Text>
      </Pressable>
    </View>
  );
}

function GenerateFields(resetCounter: number) {
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
          <Field
            key={`${resetCounter}-${r}-${c}`}
            value={arrayOfText.at(r * 5 + c) ?? ''}
          />
        </Pressable>,
      );
    }
    rows.push(
      <View key={r} style={[gridStyle.gridRow, r === 0 && gridStyle.topRow]}>
        {cells}
      </View>,
    );
  }

  return rows;
}

function BingoGrid({ rows }: any) {
  return <View>{rows}</View>;
}

type fieldProps = {
  value: string;
};

function Field({ value }: fieldProps) {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable style={gridStyle.fieldBox} onPress={() => setChecked(!checked)}>
      {checked && (
        <Image
          style={gridStyle.checked}
          source={require('./../assets/icons/close_icon.png')}
        />
      )}
      <Text style={gridStyle.fieldText}>{value}</Text>
    </Pressable>
  );
}

const gridStyle = StyleSheet.create({
  bingoGrid: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  fieldBox: {
    width: 80,
    height: 80,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderColor: '#00529a',
  },
  fieldText: {
    fontFamily: 'FunnelSans-Regular',
    padding: 1,
    textAlign: 'center',
    fontSize: 12,
  },
  topRow: {
    borderTopWidth: 1,
    borderColor: '#00529a',
  },
  gridRow: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderColor: '#00529a',
  },
  reset: {
    backgroundColor: '#80c3ff',
    borderColor: '#6dbbff',
    borderWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
    paddingLeft: 100,
    paddingRight: 100,
    fontSize: 15,
  },
  checked: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
});

export default Bingo;
