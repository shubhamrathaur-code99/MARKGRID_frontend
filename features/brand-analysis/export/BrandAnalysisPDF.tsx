"use client";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { PDFLayoutDocument, pdfStyles } from "@/components/export/PDFLayout";

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
  },
  summaryCard: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderStyle: "solid",
    borderRadius: 4,
  },
  summaryLabel: {
    fontSize: 9,
    color: "#666666",
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export interface BrandAnalysisSectionData {
  title: string;
  body: string;
}

export interface BrandAnalysisPDFProps {
  companyName: string;
  exportDate: string;
  dateRangeLabel: string;
  summary: {
    brandScore: string;
    sentimentScore: string;
    mentionsCount: string;
    overallInsights: string;
  };
  sections: BrandAnalysisSectionData[];
}

export function createBrandAnalysisDocument({
  companyName,
  exportDate,
  dateRangeLabel,
  summary,
  sections,
}: BrandAnalysisPDFProps) {
  return (
    <PDFLayoutDocument
      title="Brand Analysis Report"
      companyName={companyName}
      exportDate={exportDate}
      dateRangeLabel={dateRangeLabel}
    >
      {/* Summary section */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Summary</Text>
        <View style={pdfStyles.sectionDivider} />
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Brand score</Text>
            <Text style={styles.summaryValue}>{summary.brandScore}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Sentiment score</Text>
            <Text style={styles.summaryValue}>{summary.sentimentScore}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Mentions</Text>
            <Text style={styles.summaryValue}>{summary.mentionsCount}</Text>
          </View>
        </View>
        <Text style={pdfStyles.paragraph}>{summary.overallInsights}</Text>
      </View>

      {/* Detailed sections */}
      {sections.map((section) => (
        <View key={section.title} style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>{section.title}</Text>
          <View style={pdfStyles.sectionDivider} />
          <Text style={pdfStyles.paragraph}>{section.body}</Text>
        </View>
      ))}
    </PDFLayoutDocument>
  );
}

