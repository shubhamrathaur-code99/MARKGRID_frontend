"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    borderBottomStyle: "solid",
    paddingBottom: 8,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 700,
  },
  metaText: {
    fontSize: 9,
    color: "#555555",
  },
  section: {
    width: "100%",
    marginTop: 18,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 10,
  },
  list: {
    width: "100%",
    marginTop: 2,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#777777",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

type SeoRangeKey = "last_7_days" | "last_28_days";

type SeoReportProps = {
  companyName: string;
  dateRange: SeoRangeKey;
  exportedAtIso: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seoData: any;
};

function formatDateRangeLabel(range: SeoRangeKey): string {
  if (range === "last_7_days") return "Last 7 days";
  if (range === "last_28_days") return "Last 28 days";
  return range;
}

export function SeoReport({
  companyName,
  dateRange,
  exportedAtIso,
  seoData,
}: SeoReportProps) {
  const exportedAt = new Date(exportedAtIso);

  const overview = seoData?.seo_overview;
  const insights: string[] = seoData?.seo_insights ?? [];
  const recommendations: string[] = seoData?.seo_recommendations ?? [];
  const siteHealth = seoData?.site_health;
  const keywordGroups = seoData?.keyword_groups ?? [];
  const opportunities = seoData?.keyword_opportunities ?? [];
  const competitors = seoData?.competitor_comparison ?? [];
  const backlinks = seoData?.backlink_profile;
  const topKeywords = seoData?.top_keywords ?? [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.reportTitle}>SEO Intelligence Report</Text>
            <Text style={styles.metaText}>MarkGrid</Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={styles.metaText}>Property: {companyName}</Text>
            <Text style={styles.metaText}>
              Date range: {formatDateRangeLabel(dateRange)}
            </Text>
            <Text style={styles.metaText}>
              Exported at: {exportedAt.toISOString()}
            </Text>
          </View>
        </View>

        {/* SEO Overview */}
        {overview && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SEO Overview</Text>
            <Text style={styles.paragraph}>
              Overall visibility score: {overview.visibility_score}. Total clicks:{" "}
              {overview.total_clicks}. Total impressions: {overview.total_impressions}.
              Average position: {overview.avg_position}. Average CTR:{" "}
              {overview.avg_ctr}%.
            </Text>
          </View>
        )}

        {/* Traffic & Impressions */}
        {seoData?.traffic_trend_by_range && seoData?.impressions_trend_by_range && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Traffic & Impressions</Text>
            <Text style={styles.paragraph}>
              This section summarizes how clicks and impressions evolved over the
              selected period. Refer to the in-app charts for exact values and day by
              day breakdowns.
            </Text>
          </View>
        )}

        {/* Site Health */}
        {siteHealth && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Site Health</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Overall health score: {siteHealth.score}
              </Text>
              <Text style={styles.listItem}>
                • Issues found: {siteHealth.issues_count}
              </Text>
              <Text style={styles.listItem}>
                • High priority issues: {siteHealth.high_priority_issues}
              </Text>
            </View>
          </View>
        )}

        {/* Top Keywords */}
        {topKeywords.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Keywords</Text>
            <View style={styles.list}>
              {topKeywords.slice(0, 10).map(
                (
                  kw: {
                    keyword: string;
                    position: number;
                    search_volume: number;
                  },
                  idx: number,
                ) => (
                  <Text key={idx} style={styles.listItem}>
                    • {kw.keyword} — position {kw.position}, search volume{" "}
                    {kw.search_volume}
                  </Text>
                ),
              )}
            </View>
          </View>
        )}

        {/* Keyword Groups & Opportunities */}
        {keywordGroups.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Keyword Groups</Text>
            <View style={styles.list}>
              {keywordGroups.map(
                (
                  group: { name: string; total_keywords?: number },
                  idx: number,
                ) => (
                  <Text key={idx} style={styles.listItem}>
                    • {group.name}
                    {group.total_keywords != null
                      ? ` (${group.total_keywords} keywords)`
                      : ""}
                  </Text>
                ),
              )}
            </View>
          </View>
        )}

        {opportunities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Keyword Opportunities</Text>
            <View style={styles.list}>
              {opportunities.map(
                (op: { keyword: string; potential_clicks?: number }, idx: number) => (
                  <Text key={idx} style={styles.listItem}>
                    • {op.keyword}
                    {op.potential_clicks != null
                      ? ` — potential clicks: ${op.potential_clicks}`
                      : ""}
                  </Text>
                ),
              )}
            </View>
          </View>
        )}

        {/* Competitor Comparison */}
        {competitors.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Competitor SEO Comparison</Text>
            <View style={styles.list}>
              {competitors.map(
                (c: { name: string; visibility?: number }, idx: number) => (
                  <Text key={idx} style={styles.listItem}>
                    • {c.name}
                    {c.visibility != null ? ` — visibility: ${c.visibility}` : ""}
                  </Text>
                ),
              )}
            </View>
          </View>
        )}

        {/* Backlink Profile */}
        {backlinks && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Backlink Profile</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Domain rating: {backlinks.domain_rating}
              </Text>
              <Text style={styles.listItem}>
                • Total referring domains: {backlinks.referring_domains}
              </Text>
              <Text style={styles.listItem}>
                • Total backlinks: {backlinks.total_backlinks}
              </Text>
            </View>
          </View>
        )}

        {/* Insights & Recommendations */}
        {(insights.length > 0 || recommendations.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Insights & Recommendations</Text>
            {insights.length > 0 && (
              <View style={styles.list}>
                {insights.map((text, idx) => (
                  <Text key={idx} style={styles.listItem}>
                    • {text}
                  </Text>
                ))}
              </View>
            )}
            {recommendations.length > 0 && (
              <View style={styles.list}>
                {recommendations.map((text, idx) => (
                  <Text key={idx} style={styles.listItem}>
                    • {text}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text>Generated by MarkGrid</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

