import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { ScheduleType } from "../pages/TimebalePage";

// Create styles

interface DocProps {
  schedules: ScheduleType[];
}

interface Stype {
  day: ScheduleType;
}

// Create Document Component
const MyDocument = ({ schedules }: DocProps) => {
  const [preparedSchedules, setPreparedSchedules] = useState<any[]>([]);

  const prepareSchedules = () => {
    const dates = schedules.map((schedule) => schedule.day);
    dates.forEach((day) => {
      const schedule: any = {};
      schedule[day] = schedules.filter((sc) => sc.day === day);
      const newSchedules = [...preparedSchedules, schedule];
      setPreparedSchedules(newSchedules);
    });
  };

  useEffect(() => {
    prepareSchedules();
  });

  return (
    <Document>
      <Page orientation="landscape" size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>The Federal Polytechnic, Ilaro</Text>
          <Text style={styles.smallHeader}>
            Department of Computer Science Examination Timetable
          </Text>
        </View>
        <View>
          <View style={styles.tablerow}>
            <Text style={styles.tableItmeFirst}>Date</Text>
            <Text style={styles.tableItem}>Class</Text>
            <Text style={styles.courseTitle}>Course Title</Text>
            <Text style={styles.tableItem}>Course Code</Text>
            <Text style={styles.courseTitle}>Course Title</Text>
            <Text style={styles.tableItem}>Course Code</Text>
          </View>
          {preparedSchedules.map((schedule) => (
            <View style={styles.tablerow}>
              <Text style={styles.tableItmeFirst}>Date</Text>
              <Text style={styles.tableItem}>Class</Text>
              <Text style={styles.courseTitle}>Course Title</Text>
              <Text style={styles.tableItem}>Course Code</Text>
              <Text style={styles.courseTitle}>Course Title</Text>
              <Text style={styles.tableItem}>Course Code</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    // backgroundColor: "#E4E4E4",
    padding: "20px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    marginTop: "20px",
  },
  headerText: {
    fontSize: "20px",
  },
  smallHeader: {
    fontSize: "15px",
  },
  tablerow: {
    display: "flex",
    flexDirection: "row",
    border: "2px solid black",
  },
  tableItmeFirst: {
    padding: "5px 10px",
  },
  tableItem: {
    borderLeft: "2px solid black",
    padding: "5px 10px",
  },
  courseTitle: {
    borderLeft: "2px solid black",
    flex: "1",
    padding: "5px 10px",
  },
});
export default MyDocument;
