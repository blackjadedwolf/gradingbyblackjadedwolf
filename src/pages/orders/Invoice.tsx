import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Order } from "../../models";
let logo = require("../../assets/img/logo.png");

type Props = {
  order: Order;
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  container: {
    display: "flex",
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
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  dateLabel: {
    width: 60,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 10,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  tableContainer: {
    flexDirection: "row",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
    width: "110%",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  qty: {
    width: "5%",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    textAlign: "center",
  },
  player_name: {
    width: "30%",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    textAlign: "left",
    paddingLeft: "5px",
  },
  cardYear: {
    width: "8%",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    textAlign: "center",
  },
  brand: {
    width: "15%",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    textAlign: "left",
    paddingLeft: "5px",
  },
  product: {
    width: "15%",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    textAlign: "left",
    paddingLeft: "5px",
  },
  cardValue: {
    width: "10%",
    textAlign: "center",
  },
  cardNumber: {
    width: "15%",
    borderRightColor: "#90e5fc",
    borderRightWidth: 1,
    textAlign: "left",
    paddingLeft: "5px",
  },
  total: {
    width: "10%",
    textAlign: "right",
    paddingRight: 8,
  },
});

export const Invoice = (props: Props) => {
  const { order } = props;

  const { cards, email, firstName, lastName, phoneNumber } = order;
  // extract ID later

  const totalValue = cards
    .map((card) => {
      return card.estimated_value * card.quantity;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Invoice</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.dateLabel}>Date: </Text>
          <Text>{new Date().toISOString().slice(0, 10)}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.billTo}>Bill To:</Text>
          <Text>
            {firstName} {lastName}
          </Text>
          <Text>{email}</Text>
          {phoneNumber ? <Text>{phoneNumber}</Text> : null}
        </View>
        <View style={styles.tableContainer}>
          {cards.map((card) => {
            return (
              <View style={styles.container} key={card.player_name + card.card_number}>
                <View
                  style={[
                    styles.row,
                    { borderBottomColor: "#90e5fc", borderBottomWidth: 1 },
                  ]}
                >
                  <Text style={styles.qty}>Qty</Text>
                  <Text style={styles.player_name}>Name</Text>
                  <Text style={styles.cardYear}>Year</Text>
                  <Text style={styles.brand}>Brand</Text>
                  <Text style={styles.product}>Product</Text>
                  {/* <Text>{card.product}</Text> */}
                  <Text style={styles.cardNumber}>Number</Text>
                  <Text style={styles.cardValue}>Value</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.qty}>{card.quantity}</Text>
                  <Text style={styles.player_name}>{card.player_name}</Text>
                  <Text style={styles.cardYear}>{card.year}</Text>
                  <Text style={styles.brand}>{card.brand}</Text>
                  <Text style={styles.product}>{card.product}</Text>
                  {/* <Text>{card.product}</Text> */}
                  <Text style={styles.cardNumber}>{card.card_number}</Text>
                  <Text style={styles.cardValue}>
                    ${card.estimated_value.toFixed(2)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>Total Value</Text>
          <Text style={styles.total}> ${totalValue.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};
