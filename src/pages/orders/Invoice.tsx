import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { Order } from "../../models";
import { isOrderBeforeMar232021 } from "services/compatibility";

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
    width: 200,
    height: 150,
  },
  titleContainer: {
    flexDirection: "row",
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
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    border: "1px solid black",
  },
  shipTo: {
    marginTop: 2,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  billTo: {
    marginTop: 30,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  orderDetails: {
    marginTop: 40,
    fontFamily: "Helvetica-Oblique",
  },
  tableContainer: {
    flexDirection: "row",
    marginTop: 20,
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
    width: "20%",
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
    width: "20%",
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
    width: "20%",
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
  description: {
    marginTop: "40",
  },
});

export const Invoice = (props: Props) => {
  const { order } = props;
  const {
    cards,
    email,
    firstName,
    lastName,
    phoneNumber,
    id,
    submissionLevel,
  } = order;

  // Total declared value
  const totalDeclaredValue = cards
    .map((card) => {
      return card.estimated_value * card.quantity;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // Total cost based on submission level
  /* Parse out cost from old submission level format
     Ex. of old submission format: Standard | 5 Day Subs | $80.00 | Max DV $2499.00 */
  const costPerCardFromSubmissionLevel = isOrderBeforeMar232021(order)
    ? Number(String(order.submissionLevel).split("|")[2].split("$")[1])
    : order.submissionLevel.cost;

  const subTotal = cards
    .map((card) => {
      return (
        card.quantity * card.estimated_value * costPerCardFromSubmissionLevel
      );
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.logo}
            src={
              "https://blackjadedwolf-78f1d.web.app/static/media/logo.84a3bdd2.png"
            }
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Customer Invoice</Text>
        </View>

        <View style={styles.headerContainer}>
          <View style={styles.invoiceDateContainer}>
            <Text style={styles.dateLabel}>Date: </Text>
            <Text>{new Date().toISOString().slice(0, 10)}</Text>
          </View>

          <View>
            <Text style={styles.shipTo}>Ship To:</Text>
            <Text> BlackJadedWolf Inc / Sharon Chiong </Text>
            <Text> 315 Flatbush Ave #527 </Text>
            <Text> Brooklyn NY 11217 </Text>
          </View>
        </View>

        <View>
          <Text style={styles.billTo}>Bill To:</Text>
          <Text>
            {firstName} {lastName}
          </Text>
          <Text>{email}</Text>
          {phoneNumber ? <Text>{phoneNumber}</Text> : null}
        </View>

        <View style={{ marginTop: "35" }}>
          <Text> Order #: {id} </Text>
          <Text>
            {" "}
            Submission Level:{" "}
            {isOrderBeforeMar232021(order)
              ? String(submissionLevel)
              : submissionLevel.name}{" "}
          </Text>
        </View>

        <View>
          <Text> </Text>
        </View>

        <View style={styles.tableContainer}>
          {cards.map((card) => {
            return (
              <View
                style={styles.container}
                key={card.player_name + card.card_number}
              >
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
                  <Text style={styles.cardValue}>Declared Value</Text>
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

        <View style={[styles.row, styles.description]}>
          <Text>Total Declared Value: </Text>
          <Text style={styles.total}> ${totalDeclaredValue.toFixed(2)}</Text>
        </View>
        <View style={[styles.row, styles.description]}>
          <Text>Sub Total: </Text>
          <Text style={styles.total}> ${subTotal}</Text>
        </View>

        <View style={{ marginTop: "40" }}>
          <Text>
            I agree not to submit any items with which bear evidence of
            trimming, recoloring, restoration or any other form of tampering, or
            are of questionable authenticity. I agree that in the event PSA
            rejects any items for grading, PSA shall not refund the amount paid
            by customer because the determination to reject an item requires a
            review by PSA's graders and authenticators. If items are submitted
            for services for which they do not qualify, I authorize PSA to
            correct the order and charge any additional authentication, grading,
            handling, and shipping fees that may apply. Turnaround time does not
            begin until order has been places into grading. Inability to follow
            the above terms and conditions will result in being banned from
            Grading by BlackJadedWolf Inc. *Blackjadedwolf Inc &
            GradingByBlackjadedwolf Inc is not liable for items that are lost or
            damaged in transit. It is your responsibility to pack and secure
            items safely. Please fully Insure and Acquire Adult Signature
            Confirmation to all packages shipped to our Office.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
