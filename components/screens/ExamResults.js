import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default class ExampleTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', 'Head1', 'Head2', 'Head3'],
      tableTitle: ['English', 'Telugu', 'Social', 'Science'],
      tableData: [
        ['50', '60', '80'],
        ['60', '80', '90'],
        ['60', '80', '99'],
        ['89', '76', '66']
      ]
    }
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={styles.tableBorder}>
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={Array(state.tableTitle.length).fill(28)} textStyle={styles.text} />
            <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
          </TableWrapper>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff', borderWidth: 1, borderColor: '#000' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa', borderWidth: 1, borderColor: '#000' },
  row: { height: 28, borderWidth: 1, borderColor: '#000' },
  text: { textAlign: 'center' },
  tableBorder: { borderWidth: 1, borderColor: '#000' }
});
