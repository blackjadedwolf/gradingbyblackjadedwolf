import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { Card, User } from "../models";
import logo from "../assets/logo.png";

type Props = {
  cards: Card[];
  userDetails: User;
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
  titleContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  reportTitle: {
    color: "#61dafb",
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  dateLabel: {
    width: 60,
  },
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  player_name: {
    width: "60%",
    textAlign: "left",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  estimatedValue: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const Invoice = (props: Props) => {
  const { cards, userDetails } = props;

  const totalQuantity = cards
    .map((card) => {
      return card.estimated_value * card.quantity;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <PDFViewer>
      <Document>
        <Page size="A4" style={styles.page}>
          <Image style={styles.logo} src={logo} />
          <View style={styles.titleContainer}>
            <Text style={styles.reportTitle}>Invoice</Text>
          </View>
          <View style={styles.invoiceDateContainer}>
            <Text style={styles.dateLabel}>Date: </Text>
            <Text>{new Date().toISOString()}</Text>
          </View>
        </Page>
        <View style={styles.headerContainer}>
          <Text style={styles.billTo}>Bill To:</Text>
          <Text>
            {userDetails.firstName} {userDetails.lastName}
          </Text>
          <Text>{userDetails.email}</Text>
          {userDetails.phoneNumber ? (
            <Text>{userDetails.phoneNumber}</Text>
          ) : null}
        </View>
        <View style={styles.tableContainer}>
          {cards.map((card) => {
            return (
              <View style={styles.row} key={card.player_name}>
                <Text style={styles.qty}>{card.quantity}</Text>
                <Text style={styles.player_name}>{card.player_name}</Text>
                <Text>{card.year}</Text>
                <Text>{card.brand}</Text>
                <Text>{card.card_number}</Text>
                <Text>{card.product}</Text>
                <Text style={styles.estimatedValue}>
                  {card.estimated_value}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>TOTAL</Text>
          <Text style={styles.total}>{totalQuantity.toFixed(2)}</Text>
        </View>
      </Document>
    </PDFViewer>
  );
};

export default Invoice;
