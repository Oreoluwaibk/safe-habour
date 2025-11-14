"use client";

import { App, Card, Col, Row } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import JobApplicationCard from "./JobApplicationCard";
import { JobDetails } from "../../../../utils/interface";
import { getClientJobs } from "@/redux/action/jobs";
import { createErrorMessage } from "../../../../utils/errorInstance";
import axios from "axios";

const JobApplication = () => {
  const { modal } = App.useApp();

  const [applications, setApplications] = useState<JobDetails[]>([]);
  // const [total, setTotal] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // ------------------------
  // Fetch Applications
  // ------------------------
  const fetchApplications = useCallback(
    async (loadMore: boolean) => {
      if (loading) return;

      setLoading(true);
      try {
        const res = await getClientJobs(pageNumber, pageSize);

        if (res.status === 200 || res.status === 201) {
          const newList = res.data.data?.list ?? [];
          // const totalItems = res.data.data?.totalItems ?? 0;

          setApplications((prev) =>
            loadMore ? [...prev, ...newList] : newList
          );

          // If returned items < pageSize → no more data
          setHasMore(newList.length === pageSize);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          modal.error({
            title: "Unable to get applications",
            content: err.response
              ? createErrorMessage(err.response.data)
              : err.message,
          });
        } else {
          modal.error({
            title: "Unexpected Error",
            content: err instanceof Error ? err.message : "Something went wrong",
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [pageNumber, pageSize, loading, modal]
  );

  // ------------------------
  // First Load
  // ------------------------
  useEffect(() => {
    fetchApplications(false);
  }, []); // eslint-disable-line

  // ------------------------
  // Load More on Page Change
  // ------------------------
  useEffect(() => {
    if (pageNumber === 1) return;
    if (!hasMore) return;

    fetchApplications(true);
  }, [pageNumber]); // eslint-disable-line

  // ------------------------
  // Intersection Observer
  // ------------------------
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasMore && !loading) {
          setPageNumber((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  // ------------------------
  // UI
  // ------------------------
  return (
    <Card loading={loading && pageNumber === 1} className="h-full overflow-y-auto">
      <Row gutter={[15, 15]} className="h-[85vh] overflow-y-auto">
        {/* Applications List */}
        {applications.map((app) => (
          <Col key={app.id} lg={24} sm={24} xs={24}>
            <JobApplicationCard jobDetails={app} />
          </Col>
        ))}

        {/* Empty State */}
        {applications.length === 0 && !loading && (
          <Col span={24}>
            <p className="text-center text-[#121212]">You have no applications</p>
          </Col>
        )}

        {/* Loader / End Messages */}
        <Col span={24} className="pb-4 text-center text-gray-400">
          {loading && pageNumber > 1 && <p>Loading more...</p>}

          {!hasMore && applications.length > 0 && (
            <p>No more jobs available</p>
          )}

          {/* Trigger element */}
          <div ref={observerRef} style={{ height: "1px" }} />
        </Col>
      </Row>
    </Card>
  );
};

export default JobApplication;
